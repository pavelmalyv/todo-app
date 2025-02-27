import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';
import LoginSocials from '@/components/loginSocials/LoginSocials';
import useSignInGoogleWithNotifications from '@/hooks/useSignInGoogleWithNotifications';

import { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object } from 'yup';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { emailSchema, passwordSchema } from '@/schemas/fields';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { REGISTRATION_URL } from '@/consts/routes';

const formSchema = object({
	email: emailSchema,
	password: passwordSchema,
});

type FormData = InferType<typeof formSchema>;

const LoginPage = () => {
	const titleId = useId();
	const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle, , isLoadingGoogle] = useSignInGoogleWithNotifications(auth);

	let errorMessage: string | undefined;
	if (error) {
		errorMessage = getErrorMessageFirebase(error);
	}

	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		await signInWithEmailAndPassword(data.email, data.password);
	};

	const handleClickGoogle = () => {
		signInWithGoogle();
	};

	return (
		<Book aria-labelledby={titleId}>
			<Auth
				title="Вход"
				titleId={titleId}
				footer={{
					description: 'Нет аккаунта?',
					linkName: 'Зарегистрироваться',
					linkUrl: REGISTRATION_URL,
				}}
			>
				<Auth.Form
					isLoading={isLoading}
					errorMessage={errorMessage}
					buttonName="Войти"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								type="email"
								label="Email"
								placeholder="Email"
								autoComplete="email"
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								label="Пароль"
								placeholder="Пароль"
								autoComplete="current-password"
								isProtected={true}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
				</Auth.Form>
				<Auth.LoginSocials>
					<LoginSocials>
						<LoginSocials.Google isLoading={isLoadingGoogle} onClick={handleClickGoogle} />
					</LoginSocials>
				</Auth.LoginSocials>
			</Auth>
		</Book>
	);
};

export default LoginPage;
