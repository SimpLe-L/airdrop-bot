import { RouteObject, Navigate } from 'react-router-dom';
import Loading from '@/components/loading';
import MainLayout from '@/components/layout';
import { lazy, Suspense } from 'react';
import AuthGuard from './auth';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const ForBidden = lazy(() => import('@renderer/pages/forbidden'));


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            {
                path: 'home',
                element: (
                    <AuthGuard requiredPermissions={['home:view']}>
                        <Suspense fallback={<Loading />}>
                            <Home />
                        </Suspense>
                    </AuthGuard>
                )
            },
        ]
    },
    {
        path: '/accounts',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/twitter" replace /> },
            {
                path: 'twitter',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'discord',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'telegram',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'email',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/configs',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/common" replace /> },
            {
                path: 'common',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'wallets',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'fingerprint',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/plugins',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/plugin" replace /> },
            {
                path: 'plugin',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        )
    },
    {
        path: '/403',
        element: (
            <Suspense fallback={<Loading />}>
                <ForBidden />
            </Suspense>
        )
    },
    { path: '*', element: <Navigate to="/login" replace /> }
];
