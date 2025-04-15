import TasksPage from './TasksPage';
import Button from '@/components/UI/Buttons/button/Button';
import useTagSnapshot from '@/hooks/data/useTagSnapshot';
import useShowError from '@/hooks/ui/useShowError';
import EditTagModal from '@/components/Modals/editTagModal/EditTagModal';
import useRedirectNotFound from '@/hooks/ui/useRedirectNotFound';

import { checkNotFoundErrorOrThrow, isNotFoundError, requiredParamOrThrow } from '@/utils/error';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { BASE_URL } from '@/consts/routes';

const TagPage = () => {
	const params = useParams<{ id?: string }>();
	const id = requiredParamOrThrow(params.id);
	const [isDeleting, setIsDeleting] = useState(false);
	const [tag, isLoading, error] = useTagSnapshot(id);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const isRedirect = isDeleting && isNotFoundError(error);
	const errorWithoutDeleting = isDeleting ? undefined : error;

	useRedirectNotFound(isRedirect, BASE_URL);
	checkNotFoundErrorOrThrow(errorWithoutDeleting);
	useShowError(ERRORS_MESSAGES.tagNameLoading, errorWithoutDeleting);

	useTitle(tag?.name);

	return (
		<>
			<TasksPage
				title={tag?.name ?? null}
				isLoadingTitle={isLoading}
				errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
				notFoundMessage={NOT_FOUND_MESSAGES.tasks}
				tagId={id}
				headButtons={
					<Button size="small" styleType="border" onClick={() => setIsOpenModal(true)}>
						Редактировать тег
					</Button>
				}
			/>
			<EditTagModal
				initialData={tag}
				isLoadingData={isLoading}
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				onBeforeDelete={() => setIsDeleting(true)}
				onAfterDelete={() => setIsDeleting(false)}
			/>
		</>
	);
};

export default TagPage;
