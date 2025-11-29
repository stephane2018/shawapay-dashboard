'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { TrendingUp, TrendingDown, Wallet, Users, FileText, Code } from 'lucide-react'

export const SubAccountDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Tableau de bord du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Vue d'ensemble des performances et statistiques
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions totales</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        {/* Total Volume */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125.4M</div>
            <p className="text-xs text-muted-foreground">XOF</p>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +3 cette semaine
            </p>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de succès</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-600" />
              -0.2% vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Accès rapide</CardTitle>
          <CardDescription>Accédez facilement aux modules principaux</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Transactions</p>
                <p className="text-xs text-muted-foreground">Voir toutes</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Clients</p>
                <p className="text-xs text-muted-foreground">Gérer</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Reversements</p>
                <p className="text-xs text-muted-foreground">Voir</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Développeurs</p>
                <p className="text-xs text-muted-foreground">API</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Les 5 dernières transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">Transaction TXN-2024-{1000 + i}</p>
                  <p className="text-xs text-muted-foreground">Client {i}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{(500000 * i).toLocaleString('fr-FR')} XOF</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    Succès
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
