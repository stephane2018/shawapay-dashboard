export interface SubAccount {
  id: string
  name: string
  type: 'merchant' | 'reseller' | 'agent'
  status: 'active' | 'inactive' | 'suspended'
  balance: number
  currency: string
  email: string
  phone: string
  createdAt: Date
  lastActivity: Date
  transactions: number
  users: number
}

export interface SubAccountStats {
  totalBalance: number
  activeAccounts: number
  inactiveAccounts: number
  totalTransactions: number
  totalUsers: number
}

export interface SubAccountFilter {
  status?: string
  type?: string
  searchQuery?: string
}
