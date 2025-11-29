'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye, Lock, Unlock } from 'lucide-react'
import type { SubAccount } from '../types'
import { cn } from '@/core/lib/utils'

interface SubAccountCardProps {
  account: SubAccount
  onView?: (account: SubAccount) => void
  onEdit?: (account: SubAccount) => void
  onDelete?: (account: SubAccount) => void
  onToggleSuspend?: (account: SubAccount) => void
}

const statusConfig = {
  active: { label: 'Actif', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' },
  inactive: { label: 'Inactif', className: 'bg-slate-100 text-slate-800 dark:bg-slate-950/30 dark:text-slate-300' },
  suspended: { label: 'Suspendu', className: 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300' },
}

const typeConfig = {
  merchant: { label: 'Commerçant', icon: '🏪' },
  reseller: { label: 'Revendeur', icon: '🔄' },
  agent: { label: 'Agent', icon: '👤' },
}

export const SubAccountCard: React.FC<SubAccountCardProps> = ({
  account,
  onView,
  onEdit,
  onDelete,
  onToggleSuspend,
}) => {
  const statusInfo = statusConfig[account.status]
  const typeInfo = typeConfig[account.type]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{typeInfo.icon}</span>
              <CardTitle className="text-lg">{account.name}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">{account.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(account)} className="gap-2">
                <Eye className="h-4 w-4" />
                Voir détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(account)} className="gap-2">
                <Edit className="h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              {account.status === 'active' && (
                <DropdownMenuItem onClick={() => onToggleSuspend?.(account)} className="gap-2">
                  <Lock className="h-4 w-4" />
                  Suspendre
                </DropdownMenuItem>
              )}
              {account.status === 'suspended' && (
                <DropdownMenuItem onClick={() => onToggleSuspend?.(account)} className="gap-2">
                  <Unlock className="h-4 w-4" />
                  Réactiver
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete?.(account)} className="gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Type */}
        <div className="flex items-center gap-2">
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
          <Badge variant="outline">{typeInfo.label}</Badge>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Solde</p>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {account.balance.toLocaleString('fr-FR')} {account.currency}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Transactions</p>
            <p className="text-lg font-semibold">{account.transactions}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Utilisateurs</p>
            <p className="text-lg font-semibold">{account.users}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>📱 {account.phone}</p>
          <p>📅 Créé le {new Date(account.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
