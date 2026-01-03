import { Badge } from '@/shared/ui/badge'

interface AccountTypeBadgeProps {
  accountType: 'PRIMARY' | 'SECONDARY'
}

export const AccountTypeBadge = ({ accountType }: AccountTypeBadgeProps) => {
  return (
    <Badge className={`${accountType === 'PRIMARY'
      ? 'border border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400'
      : 'border border-cyan-500 bg-cyan-50 text-cyan-700 dark:border-cyan-500 dark:bg-cyan-900/20 dark:text-cyan-400'
    } px-3 py-1 rounded-full`}>
      {accountType === 'PRIMARY' ? 'Principal' : 'Secondaire'}
    </Badge>
  )
}
