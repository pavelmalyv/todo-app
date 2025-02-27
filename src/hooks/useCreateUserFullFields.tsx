import type { Auth } from 'firebase/auth';

import { setIsProfileComplete } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

interface createUserFullFieldsParams {
	email: string;
	password: string;
	name: string;
}

const useCreateUserFullFields = (auth: Auth) => {
	const dispatch = useAppDispatch();
	const [createUser, , isLoadingCreate, errorCreate] = useCreateUserWithEmailAndPassword(auth);
	const [updateProfile, isLoadingUpdate] = useUpdateProfile(auth);

	const isLoading = isLoadingCreate || isLoadingUpdate;

	const createUserFullFields = async ({ email, password, name }: createUserFullFieldsParams) => {
		dispatch(setIsProfileComplete(false));

		try {
			await createUser(email, password);
			await updateProfile({
				displayName: name,
			});
		} finally {
			dispatch(setIsProfileComplete(true));
		}
	};

	return [createUserFullFields, isLoading, errorCreate] as const;
};

export default useCreateUserFullFields;
