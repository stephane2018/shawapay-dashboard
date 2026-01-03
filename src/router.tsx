import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '@/modules/auth'
import { ProtectedRoute } from '@/core/guard/ProtectedRoute'
import { ThemeProvider } from '@/core/providers/ThemeProvider'
import App from '@/App'

// Main Account Pages
import { DashboardPage } from '@/modules/main-account/dashboard';
import { SubAccountsPage } from '@/modules/main-account/sous-comptes';
import { TransactionsPage } from '@/modules/main-account/mes-transactions';
import { ClientsPage as MainClientsPage } from '@/modules/main-account/clients';
import { BackofficeUsersPage } from '@/modules/main-account/utilisateurs-backoffice';
import { ApiClientsPage } from '@/modules/main-account/clients-api';
import { SubscriptionsPage } from '@/modules/main-account/abonnements';
import { RewardsPage } from '@/modules/main-account/recompenses';

// Sub-Account Pages
import { DashboardPage as SubDashboardPage } from '@/modules/sub-account/dashboard';
import { TransactionsPage as SubTransactionsPage, TransactionDetailPage } from '@/modules/sub-account/transactions';
import { ClientsPage } from '@/modules/sub-account/clients';
import { StorePage } from '@/modules/sub-account/ma-boutique';
import { DevelopersPage } from '@/modules/sub-account/developpeurs';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <ThemeProvider defaultTheme="system" storageKey="shawapay-ui-theme">
                <LoginPage />
            </ThemeProvider>
        )
    },
    {
        path: '/register',
        element: (
            <ThemeProvider defaultTheme="system" storageKey="shawapay-ui-theme">
                <RegisterPage />
            </ThemeProvider>
        )
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
                        path: 'sub-accounts',
                        element: <SubAccountsPage />
                    },
                    {
                        path: 'transactions',
                        element: <TransactionsPage />
                    },
                    {
                        path: 'clients',
                        element: <MainClientsPage />
                    },
                    {
                        path: 'backoffice-users',
                        element: <BackofficeUsersPage />
                    },
                    {
                        path: 'api-clients',
                        element: <ApiClientsPage />
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
                        element: <SubDashboardPage />
                    },
                    {
                        path: 'transactions',
                        element: <SubTransactionsPage />
                    },
                    {
                        path: 'transactions/:transactionId',
                        element: <TransactionDetailPage />
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
