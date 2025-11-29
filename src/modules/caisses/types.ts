export type CaisseStatus = "ON" | "OFF" | "FAULT" | "OPEN" | "CLOSE"

export interface Caisse {
  id: string
  code: string
  postOffice: string
  region: string
  address: string
  city: string
  status: CaisseStatus
  cashier: string
  responsable: string
  dailyRevenue: number
  transactionCount: number
  lastActivity: string
  lastUpdate: string
  openingTime: string
  closingTime: string
}

export interface CaisseStats {
  totalCaisses: number
  activeCaisses: number
  inactiveCaisses: number
  maintenanceCaisses: number
  totalRevenue: number
  totalTransactions: number
}
