import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { confirmPasswordReset } from 'firebase/auth';
import { useCallback, useState } from 'react';

const useConfirmPasswordReset = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const confirmPassword = useCallback(async (code: string, newPassword: string) => {
		try {
			setIsLoading(true);

			await confirmPasswordReset(auth, code, newPassword);
		} catch (error) {
			console.log(error);

			const normalizedError = normalizeError(error);
			setError(normalizedError);
			throw normalizedError;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return [confirmPassword, isLoading, error] as const;
};

export default useConfirmPasswordReset;
