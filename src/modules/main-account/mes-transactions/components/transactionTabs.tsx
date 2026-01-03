import type { StatusTab } from '@/shared/components/common/data-table'
import { MoneyRecive, MoneySend, Category, WalletMoney } from 'iconsax-react'

export const statusTabs: StatusTab[] = [
  { value: 'CREDIT', label: 'Crédit', icon: <MoneyRecive size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'DEBIT', label: 'Débit', icon: <MoneySend size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'all', label: 'Tout', icon: <Category size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const accountTypeTabs: StatusTab[] = [
  { value: 'PRIMARY', label: 'Principal', icon: <WalletMoney size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'SECONDARY', label: 'Secondaire', icon: <WalletMoney size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'all', label: 'Tous', icon: <Category size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]
