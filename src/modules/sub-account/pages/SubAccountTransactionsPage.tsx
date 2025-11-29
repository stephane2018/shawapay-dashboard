'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction, type OtherFilterOption } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { RotateCcw, CheckCircle, XCircle, Clock, RefreshCcw, List } from 'lucide-react'

// Transaction type
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
}

// Mock data for sub-account transactions
const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'credit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'Acme Corp',
    clientId: 'CLI001',
    reference: 'REF-2024-001',
    amount: 500000,
    fees: 2500,
    date: '2024-11-28',
    time: '14:30',
  },
  {
    id: 'TXN002',
    type: 'debit',
    status: 'success',
    source: 'Card',
    clientName: 'Tech Solutions',
    clientId: 'CLI002',
    reference: 'REF-2024-002',
    amount: 250000,
    fees: 1250,
    date: '2024-11-28',
    time: '13:15',
  },
  {
    id: 'TXN003',
    type: 'credit',
    status: 'pending',
    source: 'Bank Transfer',
    clientName: 'Global Trade',
    clientId: 'CLI003',
    reference: 'REF-2024-003',
    amount: 1000000,
    fees: 5000,
    date: '2024-11-28',
    time: '12:00',
  },
  {
    id: 'TXN004',
    type: 'debit',
    status: 'failed',
    source: 'Mobile Money',
    clientName: 'Local Shop',
    clientId: 'CLI004',
    reference: 'REF-2024-004',
    amount: 75000,
    fees: 375,
    date: '2024-11-27',
    time: '11:45',
  },
  {
    id: 'TXN005',
    type: 'credit',
    status: 'refunded',
    source: 'Card',
    clientName: 'E-Commerce Ltd',
    clientId: 'CLI005',
    reference: 'REF-2024-005',
    amount: 300000,
    fees: 1500,
    date: '2024-11-27',
    time: '10:30',
  },
]

// Columns definition
const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => <span className="font-medium">{row.getValue('reference')}</span>,
  },
  {
    accessorKey: 'clientName',
    header: 'Client',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue('clientName')}</span>
        <span className="text-xs text-muted-foreground">{row.original.clientId}</span>
      </div>
    ),
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
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return <span className="font-medium">{amount.toLocaleString('fr-FR')} XOF</span>
    },
  },
  {
    accessorKey: 'fees',
    header: 'Frais',
    cell: ({ row }) => {
      const fees = row.getValue('fees') as number
      return <span className="text-sm text-muted-foreground">{fees.toLocaleString('fr-FR')} XOF</span>
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => <span className="text-sm">{row.getValue('source')}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      const time = row.original.time
      return (
        <div className="flex flex-col">
          <span className="text-sm">{new Date(date).toLocaleDateString('fr-FR')}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
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
      const config = statusConfig[status]
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'success', label: 'Succès', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'failed', label: 'Échec', icon: <XCircle className="h-4 w-4" /> },
  { value: 'pending', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
  { value: 'refunded', label: 'Remboursé', icon: <RefreshCcw className="h-4 w-4" /> },
  { value: 'all', label: 'Tout', icon: <List className="h-4 w-4" /> },
]

// Other filter options for sub-account transactions
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

export const SubAccountTransactionsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date } | undefined>()
  const [otherFilters, setOtherFilters] = React.useState<Record<string, string>>({})

  // Filter transactions by status
  const filteredTransactions = React.useMemo(() => {
    let result = mockTransactions

    // Filter by status
    if (activeStatus !== 'all') {
      result = result.filter((t) => t.status === activeStatus)
    }

    // Filter by type (from other filters)
    if (otherFilters.type) {
      result = result.filter((t) => t.type === otherFilters.type)
    }

    // Filter by source (from other filters)
    if (otherFilters.source) {
      const sourceMap: Record<string, string> = {
        mobile_money: 'Mobile Money',
        card: 'Card',
        bank_transfer: 'Bank Transfer',
      }
      result = result.filter((t) => t.source === sourceMap[otherFilters.source])
    }

    return result
  }, [activeStatus, otherFilters])

  // Bulk actions
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

  const handleDateFilterChange = (date: Date | undefined) => {
    setSelectedDate(date)
    console.log('Date filter:', date)
  }

  const handlePeriodFilterChange = (range: { from?: Date; to?: Date } | undefined) => {
    setDateRange(range)
    console.log('Period filter:', range)
  }

  const handleOtherFiltersChange = (filters: Record<string, string>) => {
    setOtherFilters(filters)
    console.log('Other filters:', filters)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Transactions du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Gérez et suivez toutes les transactions de ce sous-compte
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
          searchPlaceholder: 'Rechercher une transaction',
        }}
        onDateFilterChange={handleDateFilterChange}
        onPeriodFilterChange={handlePeriodFilterChange}
        onOtherFiltersChange={handleOtherFiltersChange}
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
