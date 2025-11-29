'use client'

import React from 'react'
import { Card, CardContent } from '@/shared/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { SubAccountStats } from '../types'

interface SubAccountStatsCardsProps {
  stats: SubAccountStats
  isLoading?: boolean
}

export const SubAccountStatsCards: React.FC<SubAccountStatsCardsProps> = ({ stats, isLoading }) => {
  const cards = [
    {
      title: 'Solde total',
      value: stats.totalBalance,
      unit: 'XOF',
      icon: '💰',
      color: 'from-blue-600 to-violet-600',
      trend: '+12%',
      positive: true,
    },
    {
      title: 'Comptes actifs',
      value: stats.activeAccounts,
      unit: '',
      icon: '✅',
      color: 'from-emerald-600 to-teal-600',
      trend: '+2',
      positive: true,
    },
    {
      title: 'Comptes inactifs',
      value: stats.inactiveAccounts,
      unit: '',
      icon: '⏸️',
      color: 'from-amber-600 to-orange-600',
      trend: '-1',
      positive: false,
    },
    {
      title: 'Total transactions',
      value: stats.totalTransactions,
      unit: '',
      icon: '📊',
      color: 'from-indigo-600 to-purple-600',
      trend: '+8%',
      positive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold">
                    {card.value.toLocaleString('fr-FR')}
                  </p>
                  {card.unit && <span className="text-sm text-muted-foreground">{card.unit}</span>}
                </div>
              </div>
              <span className="text-3xl">{card.icon}</span>
            </div>

            <div className="flex items-center gap-1">
              {card.positive ? (
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={card.positive ? 'text-emerald-600 text-sm font-medium' : 'text-red-600 text-sm font-medium'}>
                {card.trend}
              </span>
              <span className="text-xs text-muted-foreground">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
