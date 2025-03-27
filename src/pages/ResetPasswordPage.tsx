import Book from '@/components/book/Book';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import Field from '@/components/UI/field/Field';

import { auth } from '@/firebase';
import { emailSchema } from '@/schemas/fields';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { showSuccess } from '@/utils/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { SUCCESS_MESSAGES } from '@/consts/messages';

const resetPasswordFormSchema = object({
	email: emailSchema,
});

type ResetPasswordFormData = InferType<typeof resetPasswordFormSchema>;

const ResetPasswordPage = () => {
	const titleId = useId();
	const [sendPasswordResetEmail, isLoading, error] = useSendPasswordResetEmail(auth);
	const errorMessage = error ? getErrorMessageFirebase(error) : undefined;

	if (error !== undefined) {
		console.error(error);
	}

	const { control, handleSubmit, reset } = useForm<ResetPasswordFormData>({
		resolver: yupResolver(resetPasswordFormSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
		const isSuccess = await sendPasswordResetEmail(data.email);
		if (!isSuccess) {
			return;
		}

		reset();
		showSuccess(SUCCESS_MESSAGES.resetPassword);
	};

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main title="Сброс пароля" titleId={titleId} isCancelButton={true}>
				<SmallForm
					onSubmit={handleSubmit(onSubmit)}
					buttonName="Восстановить"
					isLoading={isLoading}
					errorMessage={errorMessage}
				>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								label="Ваш email"
								placeholder="Ваш email"
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
				</SmallForm>
			</Book.Main>
		</Book>
	);
};

export default ResetPasswordPage;
