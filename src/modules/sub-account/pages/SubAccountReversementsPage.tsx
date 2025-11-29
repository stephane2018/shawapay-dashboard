'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { CheckCircle, Clock, XCircle, List, RefreshCw } from 'lucide-react'

// Reversal type
interface Reversal {
  id: string
  reference: string
  originalTransaction: string
  reason: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  requestDate: string
  completionDate?: string
  initiatedBy: string
}

// Mock data for reversals
const mockReversals: Reversal[] = [
  {
    id: 'REV001',
    reference: 'REV-2024-001',
    originalTransaction: 'TXN-2024-100',
    reason: 'Erreur de montant',
    amount: 500000,
    status: 'completed',
    requestDate: '2024-11-28',
    completionDate: '2024-11-28',
    initiatedBy: 'Admin',
  },
  {
    id: 'REV002',
    reference: 'REV-2024-002',
    originalTransaction: 'TXN-2024-101',
    reason: 'Demande client',
    amount: 250000,
    status: 'pending',
    requestDate: '2024-11-27',
    initiatedBy: 'Support',
  },
  {
    id: 'REV003',
    reference: 'REV-2024-003',
    originalTransaction: 'TXN-2024-102',
    reason: 'Doublon',
    amount: 100000,
    status: 'completed',
    requestDate: '2024-11-26',
    completionDate: '2024-11-26',
    initiatedBy: 'System',
  },
  {
    id: 'REV004',
    reference: 'REV-2024-004',
    originalTransaction: 'TXN-2024-103',
    reason: 'Problème technique',
    amount: 75000,
    status: 'failed',
    requestDate: '2024-11-25',
    initiatedBy: 'Admin',
  },
  {
    id: 'REV005',
    reference: 'REV-2024-005',
    originalTransaction: 'TXN-2024-104',
    reason: 'Remboursement client',
    amount: 300000,
    status: 'completed',
    requestDate: '2024-11-24',
    completionDate: '2024-11-24',
    initiatedBy: 'Support',
  },
]

// Columns definition
const columns: ColumnDef<Reversal>[] = [
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => <span className="font-medium">{row.getValue('reference')}</span>,
  },
  {
    accessorKey: 'originalTransaction',
    header: 'Transaction originale',
    cell: ({ row }) => <span className="text-sm">{row.getValue('originalTransaction')}</span>,
  },
  {
    accessorKey: 'reason',
    header: 'Raison',
    cell: ({ row }) => <span className="text-sm">{row.getValue('reason')}</span>,
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return <span className="font-medium">{amount.toLocaleString('fr-FR')} XOF</span>
    },
  },
  {
    accessorKey: 'initiatedBy',
    header: 'Initié par',
    cell: ({ row }) => <span className="text-sm">{row.getValue('initiatedBy')}</span>,
  },
  {
    accessorKey: 'requestDate',
    header: 'Date de demande',
    cell: ({ row }) => {
      const date = row.getValue('requestDate') as string
      return <span className="text-sm">{new Date(date).toLocaleDateString('fr-FR')}</span>
    },
  },
  {
    accessorKey: 'completionDate',
    header: 'Date de complétion',
    cell: ({ row }) => {
      const date = row.getValue('completionDate') as string | undefined
      return <span className="text-sm">{date ? new Date(date).toLocaleDateString('fr-FR') : '-'}</span>
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
        completed: { label: 'Complété', variant: 'default' },
        pending: { label: 'En attente', variant: 'secondary' },
        failed: { label: 'Échoué', variant: 'destructive' },
      }
      const config = statusConfig[status]
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'completed', label: 'Complétés', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'pending', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
  { value: 'failed', label: 'Échoués', icon: <XCircle className="h-4 w-4" /> },
  { value: 'all', label: 'Tous', icon: <List className="h-4 w-4" /> },
]

export const SubAccountReversementsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)

  // Filter reversals by status
  const filteredReversals = React.useMemo(() => {
    if (activeStatus === 'all') return mockReversals
    return mockReversals.filter((r) => r.status === activeStatus)
  }, [activeStatus])

  // Bulk actions
  const bulkActions: BulkAction[] = [
    {
      label: 'Relancer',
      icon: <RefreshCw className="h-4 w-4" />,
      onClick: (rows) => {
        console.log('Retrying reversals:', rows)
      },
      variant: 'outline',
    },
  ]

  const handleDownload = () => {
    console.log('Downloading reversals...')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Reversements du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Gérez et suivez tous les reversements et remboursements
        </p>
      </div>

      <TransactionDataTable
        data={filteredReversals}
        columns={columns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: true,
          periodFilter: true,
          otherFilters: false,
          searchPlaceholder: 'Rechercher un reversement',
        }}
        onDownload={handleDownload}
        bulkActions={bulkActions}
        pageSize={10}
        totalCount={filteredReversals.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />
    </div>
  )
}
