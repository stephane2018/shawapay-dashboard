import React from 'react'

import { cn } from '@/lib/utils'

export type ClientLocationItemData = {
  city: string
  country: string
  percentage: number
  trend: string
}

interface ClientLocationItemProps {
  item: ClientLocationItemData
  className?: string
}

export const ClientLocationItem: React.FC<ClientLocationItemProps> = ({ item, className }) => {
  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm',
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{item.city}</p>
            <p className="text-xs text-muted-foreground">{item.country}</p>
          </div>
          <span className="rounded-full border border-blue-200/70 bg-blue-50/60 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-200">
            {item.trend}
          </span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
            style={{ width: `${item.percentage}%` }}
          />
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-semibold tracking-tight">{item.percentage}%</p>
        <p className="text-[11px] uppercase text-muted-foreground">du volume</p>
      </div>
    </div>
  )
}
