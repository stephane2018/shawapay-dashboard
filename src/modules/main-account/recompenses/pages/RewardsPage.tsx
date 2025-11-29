'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Gift, Trophy, Star, Zap, TickCircle, Clock, CloseCircle, Category } from 'iconsax-react'

// Reward type
interface Reward {
  id: string
  name: string
  description: string
  type: 'cashback' | 'bonus' | 'points' | 'discount'
  status: 'available' | 'claimed' | 'expired'
  value: number
  currency: string
  expiresAt: string
  claimedAt?: string
}

// Mock data
const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Cashback 5%',
    description: 'Remise sur vos prochaines transactions',
    type: 'cashback',
    status: 'available',
    value: 25000,
    currency: 'XOF',
    expiresAt: '2025-12-31',
  },
  {
    id: '2',
    name: 'Bonus de bienvenue',
    description: 'Bonus pour votre premier mois',
    type: 'bonus',
    status: 'claimed',
    value: 10000,
    currency: 'XOF',
    expiresAt: '2025-11-15',
    claimedAt: '2025-11-10',
  },
  {
    id: '3',
    name: 'Points fidélité',
    description: '500 points à convertir',
    type: 'points',
    status: 'available',
    value: 500,
    currency: 'PTS',
    expiresAt: '2026-01-31',
  },
  {
    id: '4',
    name: 'Réduction frais',
    description: '-20% sur les frais de transaction',
    type: 'discount',
    status: 'expired',
    value: 20,
    currency: '%',
    expiresAt: '2025-10-31',
  },
  {
    id: '5',
    name: 'Bonus volume',
    description: 'Bonus pour volume de transactions élevé',
    type: 'bonus',
    status: 'available',
    value: 50000,
    currency: 'XOF',
    expiresAt: '2025-12-15',
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: Reward['status'] }) => {
  const config = {
    available: { label: 'Disponible', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    claimed: { label: 'Réclamé', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    expired: { label: 'Expiré', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
  }
  const { label, className } = config[status]
  return <Badge className={className}>{label}</Badge>
}

// Type icon component
const TypeIcon = ({ type }: { type: Reward['type'] }) => {
  const icons = {
    cashback: <Gift size={20} variant="Bulk" color="currentColor" className="text-green-600" />,
    bonus: <Trophy size={20} variant="Bulk" color="currentColor" className="text-amber-600" />,
    points: <Star size={20} variant="Bulk" color="currentColor" className="text-purple-600" />,
    discount: <Zap size={20} variant="Bulk" color="currentColor" className="text-blue-600" />,
  }
  return icons[type]
}

// Columns definition
const columns: ColumnDef<Reward>[] = [
  {
    accessorKey: 'name',
    header: 'Récompense',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <TypeIcon type={row.original.type} />
        </div>
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.description}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const labels = {
        cashback: 'Cashback',
        bonus: 'Bonus',
        points: 'Points',
        discount: 'Réduction',
      }
      return <span className="text-sm">{labels[row.original.type]}</span>
    },
  },
  {
    accessorKey: 'value',
    header: 'Valeur',
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {row.original.value.toLocaleString('fr-FR')} {row.original.currency}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expire le',
    cell: ({ row }) => <span className="text-sm">{row.original.expiresAt}</span>,
  },
  {
    accessorKey: 'claimedAt',
    header: 'Réclamé le',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.claimedAt || '-'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        disabled={row.original.status !== 'available'}
        className="gap-1"
      >
        Réclamer
      </Button>
    ),
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'available', label: 'Disponibles', icon: <TickCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'claimed', label: 'Réclamés', icon: <Gift size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'expired', label: 'Expirés', icon: <Clock size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'all', label: 'Tous', icon: <Category size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const RewardsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter rewards by status
  const filteredRewards = React.useMemo(() => {
    if (activeStatus === 'all') return mockRewards
    return mockRewards.filter((r) => r.status === activeStatus)
  }, [activeStatus])

  // Calculate totals
  const availableTotal = mockRewards
    .filter((r) => r.status === 'available' && r.currency === 'XOF')
    .reduce((sum, r) => sum + r.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Récompenses</h2>
          <p className="text-muted-foreground">
            Consultez et gérez vos récompenses
          </p>
        </div>
        <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 px-6 py-3">
          <p className="text-xs text-muted-foreground">Total disponible</p>
          <p className="text-xl font-bold text-amber-600">{availableTotal.toLocaleString('fr-FR')} XOF</p>
        </div>
      </div>

      <TransactionDataTable
        data={filteredRewards}
        columns={columns}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: false,
          periodFilter: false,
          otherFilters: false,
          searchPlaceholder: 'Rechercher une récompense',
        }}
        pageSize={10}
        totalCount={filteredRewards.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection={false}
      />
    </div>
  )
}
