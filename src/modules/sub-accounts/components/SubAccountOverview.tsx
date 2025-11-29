'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'

interface SubAccountOverviewProps {
  subAccountId: string
}

// Mock data
const mockOverviewData = {
  totalTransactions: 1234,
  totalAmount: 45678900,
  successRate: 98.5,
  averageAmount: 37000,
  recentTransactions: [
    {
      id: '1',
      type: 'credit' as const,
      amount: 50000,
      date: '2025-11-29',
      description: 'Paiement reçu'
    },
    {
      id: '2',
      type: 'debit' as const,
      amount: 25000,
      date: '2025-11-28',
      description: 'Frais de transaction'
    },
  ]
}

export const SubAccountOverview = ({ subAccountId }: SubAccountOverviewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Aperçu du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Statistiques et résumé des activités
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{mockOverviewData.totalTransactions.toLocaleString('fr-FR')}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% ce mois
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-600/20" />
            </div>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Montant total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{(mockOverviewData.totalAmount / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% ce mois
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-violet-600/20" />
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de succès</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{mockOverviewData.successRate}%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Excellent
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700">Bon</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Average Amount */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Montant moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{(mockOverviewData.averageAmount / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Par transaction
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
          <CardDescription>Dernières activités du sous-compte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOverviewData.recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {tx.type === 'credit' ? (
                      <TrendingUp className={`h-5 w-5 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <TrendingDown className={`h-5 w-5 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{(tx.amount / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
