import React from 'react'

import { Badge } from '@/shared/ui/badge'
import { cn } from '@/lib/utils'

export type BankDistributionItemData = {
  bank: string
  volume: string
  share: number
  status: string
}

interface BankDistributionItemProps {
  item: BankDistributionItemData
  className?: string
}

export const BankDistributionItem: React.FC<BankDistributionItemProps> = ({ item, className }) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{item.bank}</p>
          <p className="text-xs text-muted-foreground">{item.status}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {item.volume}
        </Badge>
      </div>
      <div className="relative flex items-center justify-between text-xs text-muted-foreground">
        <span>Part du volume</span>
        <span className="font-semibold text-foreground">{item.share}%</span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
          style={{ width: `${item.share}%` }}
        />
      </div>
    </div>
  )
}
