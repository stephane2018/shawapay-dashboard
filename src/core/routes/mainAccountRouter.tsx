import React from 'react';
import type { MainAccountRoute } from './types';

// Main Account Pages
import { DashboardPage } from '@/modules/main-account/dashboard';
import { TransactionsPage } from '@/modules/main-account/mes-transactions';
import { ClientsPage } from '@/modules/main-account/clients';
import { BackofficeUsersPage } from '@/modules/main-account/utilisateurs-backoffice';
import { ApiClientsPage } from '@/modules/main-account/clients-api';
import { SubscriptionsPage } from '@/modules/main-account/abonnements';
import { RewardsPage } from '@/modules/main-account/recompenses';

// Main account route to component mapping
export const mainAccountRoutes: Record<MainAccountRoute, React.ComponentType> = {
    dashboard: DashboardPage,
    'mes-transactions': TransactionsPage,
    clients: ClientsPage,
    'backoffice-users': BackofficeUsersPage,
    'api-clients': ApiClientsPage,
    abonnements: SubscriptionsPage,
    recompenses: RewardsPage,
};

// Helper function to get component by route
export const getMainAccountComponent = (route: MainAccountRoute): React.ComponentType => {
    return mainAccountRoutes[route] || DashboardPage;
};
