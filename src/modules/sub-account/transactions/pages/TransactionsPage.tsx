'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction, type OtherFilterOption } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { TickCircle, CloseCircle, Clock, RefreshCircle, Category, Eye, RotateLeft } from 'iconsax-react'

// Transaction type for sub-account
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

// Mock data for sub-account transactions
const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'credit',
        status: 'success',
        source: 'Mobile Money',
        clientName: 'Kofi Mensah',
        clientId: '2250700000001',
        reference: 'SUB_TXN_001',
        amount: 15000,
        fees: 300,
        revenue: 150,
        date: 'November 29 - 2025',
        time: '09:15 AM',
    },
    {
        id: '2',
        type: 'credit',
        status: 'success',
        source: 'Card',
        clientName: 'Ama Asante',
        clientId: '2250700000002',
        reference: 'SUB_TXN_002',
        amount: 25000,
        fees: 1000,
        revenue: 250,
        date: 'November 29 - 2025',
        time: '08:45 AM',
    },
    {
        id: '3',
        type: 'debit',
        status: 'pending',
        source: 'Bank Transfer',
        clientName: 'Kwame Nkrumah',
        clientId: '2250700000003',
        reference: 'SUB_TXN_003',
        amount: 50000,
        fees: 1500,
        revenue: 500,
        date: 'November 28 - 2025',
        time: '05:30 PM',
    },
    {
        id: '4',
        type: 'credit',
        status: 'success',
        source: 'Mobile Money',
        clientName: 'Abena Osei',
        clientId: '2250700000004',
        reference: 'SUB_TXN_004',
        amount: 8500,
        fees: 170,
        revenue: 85,
        date: 'November 28 - 2025',
        time: '02:20 PM',
    },
    {
        id: '5',
        type: 'credit',
        status: 'failed',
        source: 'Card',
        clientName: 'Yaw Boateng',
        clientId: '2250700000005',
        reference: 'SUB_TXN_005',
        amount: 12000,
        fees: 480,
        revenue: 0,
        date: 'November 27 - 2025',
        time: '11:10 AM',
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

// Columns definition - function to access navigate
const getColumns = (onViewDetails: (id: string) => void): ColumnDef<Transaction>[] => [
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <span className="text-sm font-medium text-muted-foreground capitalize">{row.original.type}</span>
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
        cell: ({ row }) => (
            <span className="text-sm font-medium text-green-600">{row.original.revenue.toLocaleString('fr-FR')} XOF</span>
        ),
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
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={(e) => {
                    e.stopPropagation()
                    onViewDetails(row.original.id)
                }}
            >
                <Eye size={14} variant="Bulk" color="currentColor" className="text-primary" /> Détails
            </Button>
        ),
    },
]

// Status tabs
const statusTabs: StatusTab[] = [
    { value: 'success', label: 'Succès', icon: <TickCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
    { value: 'failed', label: 'Échec', icon: <CloseCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
    { value: 'pending', label: 'En attente', icon: <Clock size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
    { value: 'refunded', label: 'Remboursé', icon: <RefreshCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
    { value: 'all', label: 'Tout', icon: <Category size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

// Other filter options
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

export const TransactionsPage = () => {
    const navigate = useNavigate()
    const [activeStatus, setActiveStatus] = React.useState('all')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(false)
    const [otherFilters, setOtherFilters] = React.useState<Record<string, string>>({})

    // Navigate to transaction details
    const handleViewDetails = (transactionId: string) => {
        navigate(`/sub/transactions/${transactionId}`)
    }

    // Memoize columns with navigate callback
    const columns = React.useMemo(() => getColumns(handleViewDetails), [])

    // Filter transactions by status
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

    // Bulk actions
    const bulkActions: BulkAction[] = [
        {
            label: 'Rembourser',
            icon: <RotateLeft size={16} variant="Bulk" color="currentColor" className="text-primary" />,
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
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Transactions du sous-compte</h2>
                <p className="text-muted-foreground">
                    Consultez et gérez toutes les transactions de votre sous-compte
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
