import type { QueryDocumentSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import type { NormalizedObj } from '@/utils/normalize';
import type { Task } from '@/types/tasks';

import { taskSchema } from '@/schemas/tasks';
import { useCallback, useState } from 'react';
import {
	applyAddNormalized,
	applyDeleteNormalizedById,
	applyUpdateNormalized,
	createNormalizedEmpty,
} from '@/utils/normalize';

type TaskData = { task: Task; doc: QueryDocumentSnapshot };
type SubscribeScopeType = 'init' | 'fetch';
type SubscribeScope = {
	data: NormalizedObj<TaskData>;
	type: SubscribeScopeType;
	unsubscribe: Unsubscribe | null;
};

const useSubscribesScopesTasks = () => {
	const [subscribesScopes, setSubscribesScopes] = useState(createNormalizedEmpty<SubscribeScope>());

	const unsubscribeFetchMore = useCallback(() => {
		setSubscribesScopes((prev) => {
			let updatedPrev = { ...prev };

			prev.ids.forEach((idSubscribeScope) => {
				const subscribeScope = prev.entities[idSubscribeScope];

				if (subscribeScope.type == 'init') {
					return;
				}

				const unsubscribe = prev.entities[idSubscribeScope].unsubscribe;
				if (unsubscribe) {
					unsubscribe();
				} else {
					console.warn('The subscription has not been cleared');
				}

				updatedPrev = applyDeleteNormalizedById(prev, idSubscribeScope);
			});

			return updatedPrev;
		});
	}, []);

	const setTasksFromSnapshot = useCallback(
		async (querySnapshot: QuerySnapshot, subscribeId: string) => {
			const changes = querySnapshot.docChanges();
			for (const key in changes) {
				const change = changes[key];

				let task: Task;

				try {
					task = await taskSchema.validate({
						id: change.doc.id,
						...change.doc.data(),
					});
				} catch (error) {
					console.error(error);
					continue;
				}

				const valueTaskData = { task, doc: change.doc };

				switch (change.type) {
					case 'added': {
						setSubscribesScopes((prev) => {
							const currentSubscribeScope = prev.entities[subscribeId];
							if (!currentSubscribeScope) {
								return prev;
							}

							const updatedSubscribeScopeData = applyAddNormalized(currentSubscribeScope.data, {
								id: task.id,
								value: valueTaskData,
								newIdexOrder: change.newIndex,
							});

							return applyUpdateNormalized(prev, {
								id: subscribeId,
								value: {
									...currentSubscribeScope,
									data: updatedSubscribeScopeData,
								},
							});
						});

						break;
					}
					case 'modified': {
						setSubscribesScopes((prev) => {
							const currentSubscribeScope = prev.entities[subscribeId];
							if (!currentSubscribeScope) {
								return prev;
							}

							const updatedSubscribeScopeData = applyUpdateNormalized(currentSubscribeScope.data, {
								id: task.id,
								value: valueTaskData,
								oldIndexOrder: change.oldIndex,
								newIdexOrder: change.newIndex,
							});

							return applyUpdateNormalized(prev, {
								id: subscribeId,
								value: {
									...currentSubscribeScope,
									data: updatedSubscribeScopeData,
								},
							});
						});

						break;
					}
					case 'removed': {
						unsubscribeFetchMore();

						setSubscribesScopes((prev) => {
							const currentSubscribeScope = prev.entities[subscribeId];
							if (!currentSubscribeScope) {
								return prev;
							}

							const updatedSubscribeScopeData = applyDeleteNormalizedById(
								currentSubscribeScope.data,
								task.id,
							);

							return applyUpdateNormalized(prev, {
								id: subscribeId,
								value: {
									...prev.entities[subscribeId],
									data: updatedSubscribeScopeData,
								},
							});
						});
						break;
					}
				}
			}
		},
		[unsubscribeFetchMore],
	);

	const setEmptySubscribeScope = useCallback((id: string, type: SubscribeScopeType) => {
		setSubscribesScopes((prev) => {
			return applyAddNormalized(prev, {
				id,
				value: {
					type,
					data: createNormalizedEmpty<TaskData>(),
					unsubscribe: null,
				},
			});
		});
	}, []);

	const setUnsubscribeScope = useCallback((id: string, unsubscribe: Unsubscribe) => {
		setSubscribesScopes((prev) => {
			const updatesSubscribeScope = {
				...prev.entities[id],
				unsubscribe: unsubscribe,
			};

			return applyUpdateNormalized(prev, {
				id,
				value: updatesSubscribeScope,
			});
		});
	}, []);

	const deleteSubscribeScope = useCallback((id: string) => {
		setSubscribesScopes((prev) => applyDeleteNormalizedById(prev, id));
	}, []);

	return {
		subscribesScopes,
		unsubscribeFetchMore,
		setTasksFromSnapshot,
		setEmptySubscribeScope,
		setUnsubscribeScope,
		deleteSubscribeScope,
	} as const;
};

export default useSubscribesScopesTasks;
