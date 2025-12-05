import {
    Category,
    ArrowSwapHorizontal,
    Layer,
    Card as CardIcon,
    Setting2,
    InfoCircle,
    People,
    Wallet2,
    Link21,
    Code
} from 'iconsax-react';

export interface NavItem {
    label: string;
    icon: any;
    path: string;
    variant?: 'default' | 'ghost' | 'secondary';
    className?: string;
}

export const mainAccountNav: NavItem[] = [
    {
        label: 'Tableau de bord',
        icon: Category,
        path: '/main/dashboard',
    },
    {
        label: 'Mes sous-comptes',
        icon: Layer,
        path: '/main/sub-accounts',
    },
    {
        label: 'Mes transactions',
        icon: ArrowSwapHorizontal,
        path: '/main/transactions',
    },
    {
        label: 'Utilisateurs',
        icon: People,
        path: '/main/users',
    },
    {
        label: 'Mes abonnements',
        icon: CardIcon,
        path: '/main/subscriptions',
    },
    {
        label: 'Récompenses',
        icon: Wallet2,
        path: '/main/rewards',
    }
];

export const mainAccountGeneralNav: NavItem[] = [
    {
        label: 'Paramètres',
        icon: Setting2,
        path: '/main/settings',
    },
    {
        label: 'Aide',
        icon: InfoCircle,
        path: '/main/help',
    }
];

export const subAccountNav: NavItem[] = [
    {
        label: 'Tableau de bord',
        icon: Category,
        path: '/sub/dashboard',
    },
    {
        label: 'Transactions',
        icon: ArrowSwapHorizontal,
        path: '/sub/transactions',
    },
    {
        label: 'Clients',
        icon: People,
        path: '/sub/clients',
    },
    {
        label: 'Ma boutique',
        icon: CardIcon,
        path: '/sub/store',
    },
    
    {
        label: 'Développeurs',
        icon: Code,
        path: '/sub/developers',
    },
    {
        label: 'Paramètres',
        icon: Setting2,
        path: '/sub/settings',
    }
];
