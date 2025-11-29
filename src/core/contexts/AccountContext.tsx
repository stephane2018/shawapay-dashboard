import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AccountContextType,
  MainAccount,
  SubAccount,
  AccountType,
  EnvironmentMode
} from '../types/account.types';

const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Mock data - À remplacer par vos vraies données d'API
const mockMainAccount: MainAccount = {
  id: 'main_001',
  name: 'Compte Principal',
  environment: 'live',
  balance: {
    totalRevenue: 45820.50,
    operatingBalance: 32450.75,
    availableBalance: 28340.25,
    currency: 'USD'
  },
  subAccounts: [
    {
      id: 'sub_001',
      name: 'TY-IT SARL',
      type: 'Intégration',
      status: 'active',
      environment: 'live',
      createdAt: '2024-01-15',
      balance: {
        totalRevenue: 2540760,
        operatingBalance: 0,
        availableBalance: 2540760,
        currency: 'XOF'
      },
      paymentStats: {
        totalAmount: 3241715,
        currency: 'FCFA',
        period: 'Il y a un an'
      }
    },
    {
      id: 'sub_002',
      name: 'E-Commerce Store',
      type: 'Terminal de paiement',
      status: 'active',
      environment: 'live',
      createdAt: '2024-02-20',
      balance: {
        totalRevenue: 8950000,
        operatingBalance: 7200000,
        availableBalance: 6500000,
        currency: 'XOF'
      },
      paymentStats: {
        totalAmount: 9850000,
        currency: 'FCFA',
        period: 'Il y a 30 jours'
      }
    },
    {
      id: 'sub_003',
      name: 'Mobile App',
      type: 'Application mobile',
      status: 'active',
      environment: 'sandbox',
      createdAt: '2024-03-10',
      balance: {
        totalRevenue: 2340000,
        operatingBalance: 1800000,
        availableBalance: 1500000,
        currency: 'XOF'
      },
      paymentStats: {
        totalAmount: 2500000,
        currency: 'FCFA',
        period: 'Il y a 7 jours'
      }
    }
  ]
};

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [mainAccount] = useState<MainAccount>(mockMainAccount);
  const [currentAccount, setCurrentAccount] = useState<MainAccount | SubAccount>(mockMainAccount);
  const [environment, setEnvironment] = useState<EnvironmentMode>('live');

  const activeAccountType: AccountType = 'id' in currentAccount && currentAccount.id === mainAccount.id
    ? 'main'
    : 'sub';

  const switchToMainAccount = () => {
    setCurrentAccount(mainAccount);
  };

  const switchToSubAccount = (subAccountId: string) => {
    const subAccount = mainAccount.subAccounts.find(acc => acc.id === subAccountId);
    if (subAccount) {
      setCurrentAccount(subAccount);
      // Synchroniser l'environnement avec celui du sous-compte
      setEnvironment(subAccount.environment);
    }
  };

  const handleSetEnvironment = (mode: EnvironmentMode) => {
    setEnvironment(mode);
    // Si on change d'environnement, on peut filtrer les sous-comptes affichés
  };

  const value: AccountContextType = {
    currentAccount,
    activeAccountType,
    environment,
    mainAccount,
    setCurrentAccount,
    setEnvironment: handleSetEnvironment,
    switchToMainAccount,
    switchToSubAccount
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
