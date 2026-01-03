interface AmountDisplayProps {
  amount: number
  type: 'CREDIT' | 'DEBIT'
}

export const AmountDisplay = ({ amount, type }: AmountDisplayProps) => {
  const isCredit = type === 'CREDIT' || amount > 0
  const displayAmount = Math.abs(amount).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-bold ${isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isCredit ? '+' : '-'} {displayAmount} XOF
      </span>
    </div>
  )
}
