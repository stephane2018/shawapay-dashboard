// Route types for main account
export type MainAccountRoute =
    | 'dashboard'
    | 'mes-transactions'
    | 'utilisateurs'
    | 'abonnements'
    | 'recompenses';

// Route types for sub-account
export type SubAccountRoute =
    | 'transactions'
    | 'clients'
    | 'ma-boutique'
    | 'developpeurs';

// Route configuration interface
export interface RouteConfig {
    path: string;
    label: string;
    icon?: string;
}

// Main account routes configuration
export const MAIN_ACCOUNT_ROUTES: Record<MainAccountRoute, RouteConfig> = {
    dashboard: {
        path: '/dashboard',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
    },
    'mes-transactions': {
        path: '/mes-transactions',
        label: 'Mes Transactions',
        icon: 'Receipt',
    },
    utilisateurs: {
        path: '/utilisateurs',
        label: 'Utilisateurs',
        icon: 'Users',
    },
    abonnements: {
        path: '/abonnements',
        label: 'Abonnements',
        icon: 'CreditCard',
    },
    recompenses: {
        path: '/recompenses',
        label: 'Récompenses',
        icon: 'Gift',
    },
};

// Sub-account routes configuration
export const SUB_ACCOUNT_ROUTES: Record<SubAccountRoute, RouteConfig> = {
    transactions: {
        path: '/transactions',
        label: 'Transactions',
        icon: 'Receipt',
    },
    clients: {
        path: '/clients',
        label: 'Clients',
        icon: 'Users',
    },
    'ma-boutique': {
        path: '/ma-boutique',
        label: 'Ma Boutique',
        icon: 'Store',
    },
    developpeurs: {
        path: '/developpeurs',
        label: 'Développeurs',
        icon: 'Code',
    },
};
