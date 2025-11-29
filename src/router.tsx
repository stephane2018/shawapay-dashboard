import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '@/modules/auth'
import { ProtectedRoute } from '@/core/Guard/ProtectedRoute'
import App from '@/App'

// Main Account Pages
import { DashboardPage } from '@/modules/main-account/dashboard';
import { TransactionsPage } from '@/modules/main-account/mes-transactions';
import { UsersPage } from '@/modules/main-account/utilisateurs';
import { SubscriptionsPage } from '@/modules/main-account/abonnements';
import { RewardsPage } from '@/modules/main-account/recompenses';

// Sub-Account Pages
import { TransactionsPage as SubTransactionsPage } from '@/modules/sub-account/transactions';
import { ClientsPage } from '@/modules/sub-account/clients';
import { StorePage } from '@/modules/sub-account/ma-boutique';
import { DevelopersPage } from '@/modules/sub-account/developpeurs';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/main/dashboard" replace />
            },
            // Main Account Routes
            {
                path: 'main',
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardPage />
                    },
                    {
                        path: 'transactions',
                        element: <TransactionsPage />
                    },
                    {
                        path: 'users',
                        element: <UsersPage />
                    },
                    {
                        path: 'subscriptions',
                        element: <SubscriptionsPage />
                    },
                    {
                        path: 'rewards',
                        element: <RewardsPage />
                    },
                    {
                        path: '*',
                        element: <Navigate to="/main/dashboard" replace />
                    }
                ]
            },
            // Sub Account Routes
            {
                path: 'sub',
                children: [
                    {
                        path: 'dashboard',
                        element: <SubTransactionsPage /> // Mapping dashboard to transactions for now as per previous logic
                    },
                    {
                        path: 'transactions',
                        element: <SubTransactionsPage />
                    },
                    {
                        path: 'clients',
                        element: <ClientsPage />
                    },
                    {
                        path: 'store',
                        element: <StorePage />
                    },
                    {
                        path: 'developers',
                        element: <DevelopersPage />
                    },
                    {
                        path: '*',
                        element: <Navigate to="/sub/dashboard" replace />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
])
