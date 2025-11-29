'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { useAccount } from '@/core/contexts/AccountContext'
import { ArrowRight, Plus, Settings, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

// Sub-account type
interface SubAccount {
  id: string
  name: string
  status: 'active' | 'inactive' | 'suspended'
  balance: number
  totalTransactions: number
  createdAt: string
  lastActivity: string
}

// Mock data for sub-accounts
const mockSubAccounts: SubAccount[] = [
  {
    id: 'SUB001',
    name: 'Sous-compte Commerce',
    status: 'active',
    balance: 5000000,
    totalTransactions: 245,
    createdAt: '2024-01-15',
    lastActivity: '2024-11-28',
  },
  {
    id: 'SUB002',
    name: 'Sous-compte Paiements',
    status: 'active',
    balance: 3200000,
    totalTransactions: 189,
    createdAt: '2024-02-20',
    lastActivity: '2024-11-28',
  },
  {
    id: 'SUB003',
    name: 'Sous-compte Test',
    status: 'inactive',
    balance: 500000,
    totalTransactions: 45,
    createdAt: '2024-03-10',
    lastActivity: '2024-11-20',
  },
  {
    id: 'SUB004',
    name: 'Sous-compte API',
    status: 'active',
    balance: 1500000,
    totalTransactions: 567,
    createdAt: '2024-04-05',
    lastActivity: '2024-11-27',
  },
]

export const SubAccountsPage = () => {
  const { switchToSubAccount } = useAccount()

  const handleSwitchToSubAccount = (subAccountId: string) => {
    switchToSubAccount(subAccountId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'suspended':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'inactive':
        return 'Inactif'
      case 'suspended':
        return 'Suspendu'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Mes sous-comptes
          </h2>
          <p className="text-muted-foreground">
            Gérez et accédez à vos sous-comptes
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white gap-2">
          <Plus className="h-4 w-4" />
          Créer un sous-compte
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sous-comptes actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockSubAccounts.filter(s => s.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solde total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockSubAccounts.reduce((sum, s) => sum + s.balance, 0).toLocaleString('fr-FR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">XOF</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockSubAccounts.reduce((sum, s) => sum + s.totalTransactions, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub-accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSubAccounts.map((subAccount) => (
          <Card key={subAccount.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 shrink-0">
                    <span className="text-sm font-bold text-white">
                      {subAccount.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{subAccount.name}</CardTitle>
                    <CardDescription className="text-xs">
                      ID: {subAccount.id}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(subAccount.status) as any}>
                  {getStatusLabel(subAccount.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Balance */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Solde</p>
                <p className="text-lg font-bold">
                  {subAccount.balance.toLocaleString('fr-FR')} XOF
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 py-2 border-y">
                <div>
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="text-sm font-semibold">{subAccount.totalTransactions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Créé le</p>
                  <p className="text-sm font-semibold">
                    {new Date(subAccount.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {/* Last Activity */}
              <div>
                <p className="text-xs text-muted-foreground">
                  Dernière activité: {new Date(subAccount.lastActivity).toLocaleDateString('fr-FR')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white gap-2"
                  onClick={() => handleSwitchToSubAccount(subAccount.id)}
                  disabled={subAccount.status !== 'active'}
                >
                  <ArrowRight className="h-4 w-4" />
                  Accéder
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600">
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
