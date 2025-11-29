export interface CaisseProduct {
  id: string
  productCode: string
  productName: string
  category: string
  quantitySold: number
  revenue: number
  stock: number
  lastSale: string
}

export interface CaisseDetails {
  id: string
  code: string
  name: string
  status: "active" | "inactive" | "pause"
  cashier: string
  openedAt: string
  lastTransaction: string
  dailyRevenue: number
  transactionCount: number
  averageTicket: number
  products: CaisseProduct[]
}

export interface BureauPerformance {
  bureauName: string
  bureauCode: string
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  topProduct: string
  efficiency: number
  customerSatisfaction: number
  comparisonVsYesterday: {
    revenue: number
    transactions: number
  }
}

export interface BureauExportData {
  bureau: BureauPerformance
  caisses: CaisseDetails[]
}
