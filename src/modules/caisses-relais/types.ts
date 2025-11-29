export type CaisseRelaisStatus = "active" | "inactive" | "maintenance" | "suspended"

export interface CaisseRelais {
  id: string
  code: string
  relayPointName: string
  relayPointCode: string
  region: string
  city: string
  address: string
  manager: string
  phone: string
  status: CaisseRelaisStatus
  openingHours: string
  dailyRevenue: number
  weeklyRevenue: number
  transactionCount: number
  lastActivity: string
  cashBalance: number
  serviceTypes: string[]
}

export interface CaisseRelaisStats {
  totalCaisses: number
  activeCaisses: number
  inactiveCaisses: number
  maintenanceCaisses: number
  suspendedCaisses: number
  totalRevenue: number
  totalTransactions: number
  averageRevenue: number
}
