import type { SubAccount, SubAccountStats } from '../types'

// Mock data
const mockSubAccounts: SubAccount[] = [
  {
    id: 'SA_001',
    name: 'Boutique Cotonou',
    type: 'merchant',
    status: 'active',
    balance: 5_250_000,
    currency: 'XOF',
    email: 'boutique@example.com',
    phone: '+229 94 12 34 56',
    createdAt: new Date('2024-01-15'),
    lastActivity: new Date('2024-11-28'),
    transactions: 1250,
    users: 3,
  },
  {
    id: 'SA_002',
    name: 'Reseller Libreville',
    type: 'reseller',
    status: 'active',
    balance: 8_750_000,
    currency: 'XOF',
    email: 'reseller@example.com',
    phone: '+241 01 23 45 67',
    createdAt: new Date('2024-02-20'),
    lastActivity: new Date('2024-11-27'),
    transactions: 2100,
    users: 5,
  },
  {
    id: 'SA_003',
    name: 'Agent Abidjan',
    type: 'agent',
    status: 'active',
    balance: 3_120_000,
    currency: 'XOF',
    email: 'agent@example.com',
    phone: '+225 07 89 01 23',
    createdAt: new Date('2024-03-10'),
    lastActivity: new Date('2024-11-26'),
    transactions: 890,
    users: 2,
  },
  {
    id: 'SA_004',
    name: 'Shop Paris',
    type: 'merchant',
    status: 'inactive',
    balance: 1_500_000,
    currency: 'XOF',
    email: 'shop.paris@example.com',
    phone: '+33 1 23 45 67 89',
    createdAt: new Date('2024-04-05'),
    lastActivity: new Date('2024-10-15'),
    transactions: 340,
    users: 1,
  },
  {
    id: 'SA_005',
    name: 'Boutique Dakar',
    type: 'merchant',
    status: 'active',
    balance: 6_890_000,
    currency: 'XOF',
    email: 'dakar@example.com',
    phone: '+221 77 123 45 67',
    createdAt: new Date('2024-05-12'),
    lastActivity: new Date('2024-11-29'),
    transactions: 1560,
    users: 4,
  },
  {
    id: 'SA_006',
    name: 'Reseller Accra',
    type: 'reseller',
    status: 'suspended',
    balance: 2_340_000,
    currency: 'XOF',
    email: 'accra@example.com',
    phone: '+233 24 567 89 01',
    createdAt: new Date('2024-06-18'),
    lastActivity: new Date('2024-09-20'),
    transactions: 420,
    users: 2,
  },
]

export const subAccountService = {
  async getSubAccounts(): Promise<SubAccount[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSubAccounts), 500)
    })
  },

  async getSubAccountById(id: string): Promise<SubAccount | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const account = mockSubAccounts.find((acc) => acc.id === id)
        resolve(account || null)
      }, 300)
    })
  },

  async getSubAccountStats(): Promise<SubAccountStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats: SubAccountStats = {
          totalBalance: mockSubAccounts.reduce((sum, acc) => sum + acc.balance, 0),
          activeAccounts: mockSubAccounts.filter((acc) => acc.status === 'active').length,
          inactiveAccounts: mockSubAccounts.filter((acc) => acc.status === 'inactive').length,
          totalTransactions: mockSubAccounts.reduce((sum, acc) => sum + acc.transactions, 0),
          totalUsers: mockSubAccounts.reduce((sum, acc) => sum + acc.users, 0),
        }
        resolve(stats)
      }, 300)
    })
  },

  async updateSubAccount(id: string, data: Partial<SubAccount>): Promise<SubAccount | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSubAccounts.findIndex((acc) => acc.id === id)
        if (index !== -1) {
          mockSubAccounts[index] = { ...mockSubAccounts[index], ...data }
          resolve(mockSubAccounts[index])
        }
        resolve(null)
      }, 300)
    })
  },

  async deleteSubAccount(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSubAccounts.findIndex((acc) => acc.id === id)
        if (index !== -1) {
          mockSubAccounts.splice(index, 1)
          resolve(true)
        }
        resolve(false)
      }, 300)
    })
  },
}
