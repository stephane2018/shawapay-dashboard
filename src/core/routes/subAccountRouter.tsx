import React from 'react';
import type { SubAccountRoute } from './types';

// Sub-Account Pages
import { TransactionsPage } from '@/modules/sub-account/transactions';
import { ClientsPage } from '@/modules/sub-account/clients';
import { StorePage } from '@/modules/sub-account/ma-boutique';
import { DevelopersPage } from '@/modules/sub-account/developpeurs';

// Sub-account route to component mapping
export const subAccountRoutes: Record<SubAccountRoute, React.ComponentType> = {
    transactions: TransactionsPage,
    clients: ClientsPage,
    'ma-boutique': StorePage,
    developpeurs: DevelopersPage,
};

// Helper function to get component by route
export const getSubAccountComponent = (route: SubAccountRoute): React.ComponentType => {
    return subAccountRoutes[route] || TransactionsPage;
};
