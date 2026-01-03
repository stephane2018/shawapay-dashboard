import { MoneyRecive, MoneySend, WalletMoney } from 'iconsax-react'

interface StatisticsCardsProps {
  totalCredit: number
  totalDebit: number
  balance: number
}

export const StatisticsCards = ({ totalCredit, totalDebit, balance }: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
          <MoneyRecive size={20} variant="Bulk" color='currentColor' />
          <span className="text-sm font-medium">Total Crédits</span>
        </div>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          +{totalCredit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF
        </p>
      </div>

      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
          <MoneySend size={20} variant="Bulk" color='currentColor' />
          <span className="text-sm font-medium">Total Débits</span>
        </div>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
          -{totalDebit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF
        </p>
      </div>

      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
          <WalletMoney size={20} variant="Bulk" color='currentColor' />
          <span className="text-sm font-medium">Solde Net</span>
        </div>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
          {balance >= 0 ? '+' : ''}{balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF
        </p>
      </div>
    </div>
  )
}
