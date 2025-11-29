'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { RotateCcw } from 'lucide-react'

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
  revenue: number
  date: string
  time: string
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'undefined Hbjkj',
    clientId: '2256057710000',
    reference: 'gZLNsiO5x',
    amount: 2514,
    fees: 60,
    revenue: 0,
    date: 'November 17 - 2025',
    time: '10:08 AM',
  },
  {
    id: '2',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'undefined Hhf',
    clientId: '2256057710000',
    reference: 'MfpncPKm4',
    amount: 1005,
    fees: 24,
    revenue: 0,
    date: 'November 17 - 2025',
    time: '7:50 AM',
  },
  {
    id: '3',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'undefined Jhjj',
    clientId: '2256057710000',
    reference: 'x7l_nC8N',
    amount: 1005,
    fees: 24,
    revenue: 0,
    date: 'November 17 - 2025',
    time: '6:48 AM',
  },
  {
    id: '4',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'KOUADIO Jean',
    clientId: '2256057710000',
    reference: 'L_aMQM1nh',
    amount: 32691,
    fees: 785,
    revenue: 0,
    date: 'November 13 - 2025',
    time: '7:58 PM',
  },
  {
    id: '5',
    type: 'debit',
    status: 'success',
    source: 'Card',
    clientName: 'Jean',
    clientId: 'kMwYPugCb',
    reference: 'kMwYPugCb',
    amount: 201176,
    fees: 8047,
    revenue: 0,
    date: 'November 13 - 2025',
    time: '7:53 PM',
  },
  {
    id: '6',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'KOUADIO Jean',
    clientId: '2256057710000',
    reference: 'phJJ-nC-v',
    amount: 40235,
    fees: 966,
    revenue: 0,
    date: 'November 13 - 2025',
    time: '7:47 PM',
  },
  {
    id: '7',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'KOUADIO Jean',
    clientId: '2256057710000',
    reference: 'n5pTjMbt',
    amount: 100588,
    fees: 2414,
    revenue: 0,
    date: 'November 12 - 2025',
    time: '8:35 PM',
  },
  {
    id: '8',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'KOUADIO Jean',
    clientId: '2256057710000',
    reference: 'kmB6Fwa35',
    amount: 201176,
    fees: 4828,
    revenue: 0,
    date: 'November 12 - 2025',
    time: '8:17 PM',
  },
  {
    id: '9',
    type: 'debit',
    status: 'success',
    source: 'Mobile Money',
    clientName: 'KOUADIO Jean',
    clientId: '2256057710000',
    reference: 'wFeL1J4N_',
    amount: 5029,
    fees: 121,
    revenue: 0,
    date: 'November 12 - 2025',
    time: '8:00 PM',
  },
  {
    id: '10',
    type: 'debit',
    status: 'pending',
    source: 'Mobile Money',
    clientName: 'Test User',
    clientId: '2256057710001',
    reference: 'abc123xyz',
    amount: 15000,
    fees: 360,
    revenue: 0,
    date: 'November 11 - 2025',
    time: '3:30 PM',
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  const config = {
    success: { label: 'Succès', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    failed: { label: 'Échec', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    refunded: { label: 'Remboursé', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  }
  const { label, className } = config[status]
  return <Badge className={className}>{label}</Badge>
}

// Columns definition
const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-muted-foreground">{row.original.type}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => <span className="text-sm">{row.original.source}</span>,
  },
  {
    accessorKey: 'client',
    header: 'Client',
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.clientName}</p>
        <p className="text-xs text-muted-foreground">{row.original.clientId}</p>
      </div>
    ),
  },
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => <span className="text-sm font-mono">{row.original.reference}</span>,
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.amount.toLocaleString('fr-FR')} XOF</span>
    ),
  },
  {
    accessorKey: 'fees',
    header: 'Frais',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.fees.toLocaleString('fr-FR')} XOF</span>
    ),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenu',
    cell: ({ row }) => <span className="text-sm">#</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div>
        <p className="text-sm">{row.original.date}</p>
        <p className="text-xs text-muted-foreground">{row.original.time}</p>
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <Button variant="outline" size="sm" className="gap-1">
        <span className="text-xs">+</span> Détails
      </Button>
    ),
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'success', label: 'Succès' },
  { value: 'failed', label: 'Échec' },
  { value: 'pending', label: 'En attente' },
  { value: 'refunded', label: 'Remboursé' },
  { value: 'all', label: 'Tout' },
]

export const TransactionsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)

  // Filter transactions by status
  const filteredTransactions = React.useMemo(() => {
    if (activeStatus === 'all') return mockTransactions
    return mockTransactions.filter((t) => t.status === activeStatus)
  }, [activeStatus])

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-red-600">Transactions</h2>
        <p className="text-muted-foreground">
          Gérez et suivez toutes vos transactions
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
