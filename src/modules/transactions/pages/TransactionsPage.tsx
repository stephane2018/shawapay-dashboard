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
  { value: 'success', label: 'Succès', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'failed', label: 'Échec', icon: <XCircle className="h-4 w-4" /> },
  { value: 'pending', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
  { value: 'refunded', label: 'Remboursé', icon: <RefreshCcw className="h-4 w-4" /> },
  { value: 'all', label: 'Tout', icon: <List className="h-4 w-4" /> },
]

// Other filter options for transactions
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
  {
    id: 'amount_range',
    label: 'Montant',
    options: [
      { value: '0-10000', label: '0 - 10 000 XOF' },
      { value: '10000-50000', label: '10 000 - 50 000 XOF' },
      { value: '50000-100000', label: '50 000 - 100 000 XOF' },
      { value: '100000+', label: '+ 100 000 XOF' },
    ],
  },
]

export const TransactionsPage = () => {
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
