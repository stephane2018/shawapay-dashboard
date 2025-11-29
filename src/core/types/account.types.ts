export type EnvironmentMode = 'live' | 'sandbox';

export type AccountType = 'main' | 'sub';

export interface AccountBalance {
  totalRevenue: number;
  operatingBalance: number;
  availableBalance: number;
  currency: string;
}

export interface PaymentStats {
  totalAmount: number;
  currency: string;
  period: string;
}

export interface SubAccount {
  id: string;
  name: string;
  type: string;
  balance: AccountBalance;
  status: 'active' | 'inactive';
  createdAt: string;
  environment: EnvironmentMode;
  paymentStats?: PaymentStats;
}

export interface MainAccount {
  id: string;
  name: string;
  balance: AccountBalance;
  subAccounts: SubAccount[];
  environment: EnvironmentMode;
}

export interface AccountContextType {
  currentAccount: MainAccount | SubAccount;
  activeAccountType: AccountType;
  environment: EnvironmentMode;
  mainAccount: MainAccount;
  setCurrentAccount: (account: MainAccount | SubAccount) => void;
  setEnvironment: (mode: EnvironmentMode) => void;
  switchToMainAccount: () => void;
  switchToSubAccount: (subAccountId: string) => void;
}
