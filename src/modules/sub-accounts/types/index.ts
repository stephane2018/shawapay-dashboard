export interface SubAccountTransaction {
  id: string
  type: 'debit' | 'credit'
  status: 'success' | 'failed' | 'pending' | 'refunded'
  source: string
  clientName: string
  clientId: string
  reference: string
  amount: number
  fees: number
  date: string
  time: string
  description: string
}

export interface SubAccountOverviewData {
  totalTransactions: number
  totalAmount: number
  successRate: number
  averageAmount: number
  recentTransactions: SubAccountTransaction[]
}
