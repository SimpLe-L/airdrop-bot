import { RouteObject, Navigate } from 'react-router-dom';
import Loading from '@/components/loading';
import MainLayout from '@/components/layout';
import { lazy, Suspense } from 'react';
// import AuthGuard from './auth';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const ForBidden = lazy(() => import('@/pages/forbidden'));

// accounts
const Twitter = lazy(() => import('@/pages/accountsCenter/twitter'));
const Discord = lazy(() => import('@/pages/accountsCenter/discord'));
const Telegram = lazy(() => import('@/pages/accountsCenter/telegram'));
const Emails = lazy(() => import('@/pages/accountsCenter/emails'));

// configs
const CommonConfig = lazy(() => import('@/pages/configsCenter/common'));
const WalletConfig = lazy(() => import('@/pages/configsCenter/wallet'));
const ProxyConfig = lazy(() => import('@/pages/configsCenter/proxy'));

// plugins
const PluginMarket = lazy(() => import('@/pages/pluginMarket/hot'));
const PluginDiy = lazy(() => import('@/pages/pluginMarket/diy'));

// project
const BotProject = lazy(() => import('@/pages/projectCenter/bot'));
const SignProject = lazy(() => import('@/pages/projectCenter/sign'));
const TestnetProject = lazy(() => import('@/pages/projectCenter/testnet'));



export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            {
                path: 'home',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                    // <AuthGuard requiredPermissions={['home']}>

                    // </AuthGuard>
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
                        <Twitter />
                    </Suspense>
                )
            },
            {
                path: 'discord',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Discord />
                    </Suspense>
                )
            },
            {
                path: 'telegram',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Telegram />
                    </Suspense>
                )
            },
            {
                path: 'email',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Emails />
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
                        <CommonConfig />
                    </Suspense>
                )
            },
            {
                path: 'wallets',
                element: (
                    <Suspense fallback={<Loading />}>
                        <WalletConfig />
                    </Suspense>
                )
            },
            {
                path: 'proxy',
                element: (
                    <Suspense fallback={<Loading />}>
                        <ProxyConfig />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/projects',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/bot" replace /> },
            {
                path: 'bot',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BotProject />
                    </Suspense>
                )
            },
            {
                path: 'testnet',
                element: (
                    <Suspense fallback={<Loading />}>
                        <TestnetProject />
                    </Suspense>
                )
            },
            {
                path: 'sign',
                element: (
                    <Suspense fallback={<Loading />}>
                        <SignProject />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/plugins',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/hot" replace /> },
            {
                path: 'hot',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PluginMarket />
                    </Suspense>
                )
            },
            {
                path: 'diy',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PluginDiy />
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
