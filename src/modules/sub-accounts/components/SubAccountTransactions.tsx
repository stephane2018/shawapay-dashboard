'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction, type OtherFilterOption } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { RotateCcw, CheckCircle, XCircle, Clock, RefreshCcw, List } from 'lucide-react'

interface SubAccountTransactionsProps {
  subAccountId: string
}

interface Transaction {
  id: string
  type: 'debit' | 'credit'
  status: 'success' | 'failed' | 'pending' | 'refunded'
  source: string
  clientName: string
  clientId: string
  reference: string
  amount: number
  fees: number
  date: string
  time: string
  description: string
}

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'Jean Dupont',
    clientId: 'CLI_001',
    reference: 'REF_20251129_001',
    amount: 50000,
    fees: 500,
    date: '2025-11-29',
    time: '14:30',
    description: 'Paiement facture'
  },
  {
    id: '2',
    type: 'debit',
    status: 'success',
    source: 'Card',
    clientName: 'Marie Martin',
    clientId: 'CLI_002',
    reference: 'REF_20251129_002',
    amount: 25000,
    fees: 250,
    date: '2025-11-29',
    time: '13:15',
    description: 'Remboursement'
  },
  {
    id: '3',
    type: 'credit',
    status: 'pending',
    source: 'Bank Transfer',
    clientName: 'Pierre Bernard',
    clientId: 'CLI_003',
    reference: 'REF_20251128_003',
    amount: 100000,
    fees: 1000,
    date: '2025-11-28',
    time: '10:45',
    description: 'Virement bancaire'
  },
]

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => <span className="font-medium">{row.getValue('reference')}</span>,
  },
  {
    accessorKey: 'clientName',
    header: 'Client',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant={type === 'credit' ? 'default' : 'secondary'}>
          {type === 'credit' ? 'Crédit' : 'Débit'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
        success: { label: 'Succès', variant: 'default' },
        failed: { label: 'Échec', variant: 'destructive' },
        pending: { label: 'En attente', variant: 'secondary' },
        refunded: { label: 'Remboursé', variant: 'outline' },
      }
      const config = statusConfig[status] || { label: status, variant: 'default' as const }
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return <span className="font-semibold">{(amount / 1000).toFixed(0)}K XOF</span>
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
]

const statusTabs: StatusTab[] = [
  { value: 'success', label: 'Succès', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'failed', label: 'Échec', icon: <XCircle className="h-4 w-4" /> },
  { value: 'pending', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
  { value: 'refunded', label: 'Remboursé', icon: <RefreshCcw className="h-4 w-4" /> },
  { value: 'all', label: 'Tout', icon: <List className="h-4 w-4" /> },
]

const otherFilterOptions: OtherFilterOption[] = [
  {
    id: 'type',
    label: 'Type',
    options: [
      { value: 'debit', label: 'Débit' },
      { value: 'credit', label: 'Crédit' },
    ],
  },
  {
    id: 'source',
    label: 'Source',
    options: [
      { value: 'mobile_money', label: 'Mobile Money' },
      { value: 'card', label: 'Carte bancaire' },
      { value: 'bank_transfer', label: 'Virement bancaire' },
    ],
  },
]

export const SubAccountTransactions = ({ subAccountId }: SubAccountTransactionsProps) => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [otherFilters, setOtherFilters] = React.useState<Record<string, string>>({})

  const filteredTransactions = React.useMemo(() => {
    let result = mockTransactions

    if (activeStatus !== 'all') {
      result = result.filter((t) => t.status === activeStatus)
    }

    if (otherFilters.type) {
      result = result.filter((t) => t.type === otherFilters.type)
    }

    return result
  }, [activeStatus, otherFilters])

  const bulkActions: BulkAction[] = [
    {
      label: 'Rembourser',
      icon: <RotateCcw className="h-4 w-4" />,
      onClick: (rows) => {
        console.log('Refunding:', rows)
      },
      variant: 'outline',
    },
  ]

  const handleDownload = () => {
    console.log('Downloading transactions...')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Transactions du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Gérez et suivez toutes les transactions
        </p>
      </div>

      <TransactionDataTable
        data={filteredTransactions}
        columns={columns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: true,
          periodFilter: true,
          otherFilters: true,
          searchPlaceholder: 'Rechercher',
        }}
        onOtherFiltersChange={setOtherFilters}
        otherFilterOptions={otherFilterOptions}
        onDownload={handleDownload}
        bulkActions={bulkActions}
        pageSize={10}
        totalCount={filteredTransactions.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />
    </div>
  )
}
