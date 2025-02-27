import Root from '@/pages/Root';
import useAuthWitchNotifications from '@/hooks/useAuthWitchNotifications';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import useDelayedLoader from '@/hooks/useDelayedLoader';

import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import { auth } from '@/firebase';
import { LOGIN_URL } from '@/consts/routes';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const UpcomingPage = lazy(() => import('@/pages/UpcomingPage'));

const AppRouter = () => {
	const [user, isLoading] = useAuthWitchNotifications(auth);
	const isDelayedLoading = useDelayedLoader(isLoading);

	if (isDelayedLoading) {
		return <LoadingScreen />;
	}

	const privateRoutes = (
		<>
			<Route
				index
				element={
					<Suspense>
						<UpcomingPage />
					</Suspense>
				}
			/>
		</>
	);

	const publicRoutes = (
		<>
			<Route
				index
				element={
					<Suspense>
						<HomePage />
					</Suspense>
				}
			/>
			<Route
				path={LOGIN_URL}
				element={
					<Suspense>
						<LoginPage />
					</Suspense>
				}
			/>
		</>
	);

	return (
		<Routes>
			<Route element={<Root />}>{user ? privateRoutes : publicRoutes}</Route>
		</Routes>
	);
};

export default AppRouter;
