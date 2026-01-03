import { Badge } from '@/shared/ui/badge'
import { ArrowDown, ArrowUp } from 'iconsax-react'

interface TypeBadgeProps {
  type: 'CREDIT' | 'DEBIT'
  amount: number
}

export const TypeBadge = ({ type, amount }: TypeBadgeProps) => {
  const isCredit = type === 'CREDIT' || amount > 0

  return (
    <Badge className={`${isCredit
      ? 'border border-green-400 w-fit border-dashed bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400'
      : 'border border-red-400 w-fit bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-400/20 dark:text-red-400'
    } px-3 py-1 flex items-center rounded-full gap-2 min-w-fit whitespace-nowrap`}>
      {isCredit ? (
        <ArrowDown size={14} variant="Bulk" color='currentColor' className="text-green-600 dark:text-green-400" />
      ) : (
        <ArrowUp size={14} variant="Bulk" color='currentColor' className="text-red-600 dark:text-red-400" />
      )}
      {isCredit ? 'Crédit' : 'Débit'}
    </Badge>
  )
}
