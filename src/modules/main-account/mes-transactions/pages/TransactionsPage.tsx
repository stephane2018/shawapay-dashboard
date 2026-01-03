'use client'

import React from 'react'
import type { BulkAction } from '@/shared/components/common/data-table'
import { TransactionDataTable } from '@/shared/components/common/data-table'
import { Button } from '@/shared/ui/button'
import { Copy } from 'iconsax-react'
import { useTransactions } from '@/core/hooks/use-transactions'
import type { Transaction } from '@/core/types/transaction.types'
import { toast } from 'sonner'
import {
  transactionColumns,
  type TransactionDisplay,
  statusTabs,
  StatisticsCards,
} from '../components'

// Helper function to map transaction to display format
const mapTransactionToDisplay = (transaction: Transaction): TransactionDisplay => ({
  id: transaction.id,
  type: transaction.type,
  amount: transaction.amount,
  accountType: transaction.accountType,
  createdAt: new Date(transaction.createdAt).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  userId: transaction.userId,
})

export const TransactionsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  // Fetch transactions from API
  const { data, isLoading, isError, error } = useTransactions({
    page: currentPage - 1,
    size: pageSize,
    sort: 'createdAt,desc',
  })

  // Map transactions to display format
  const transactions = React.useMemo(() => {
    if (!data?.content) return []
    return data.content.map(mapTransactionToDisplay)
  }, [data])

  // Filter transactions by type
  const filteredTransactions = React.useMemo(() => {
    if (activeStatus === 'all') return transactions
    return transactions.filter((t) => t.type === activeStatus)
  }, [transactions, activeStatus])

  // Reset to page 1 when status filter changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeStatus])

  // Pagination info
  const paginationInfo = React.useMemo(() => {
    if (!data) return { totalElements: 0, totalPages: 0, numberOfElements: 0, currentPage: 0 }
    return {
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      numberOfElements: data.numberOfElements,
      currentPage: data.number + 1,
    }
  }, [data])

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalCredit = transactions
      .filter(t => t.type === 'CREDIT' || t.amount > 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const totalDebit = transactions
      .filter(t => t.type === 'DEBIT' || t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    return { totalCredit, totalDebit, balance: totalCredit - totalDebit }
  }, [transactions])

  // Bulk actions
  const bulkActions: BulkAction[] = [
    {
      label: 'Exporter sélection',
      icon: <Copy size={16} variant="Bulk" color="currentColor" className="text-primary" />,
      onClick: (rows) => {
        toast.success(`${rows.length} transaction(s) exportée(s)`)
      },
      variant: 'outline',
    },
  ]

  const handleDownload = () => {
    toast.success('Téléchargement des transactions...')
  }

  // Show error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Transactions</h2>
            <p className="text-muted-foreground">
              Gérez et suivez toutes vos transactions
            </p>
          </div>
        </div>
        <div className="p-8 text-center border rounded-lg bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">
            Erreur lors du chargement des transactions: {(error as any)?.message || 'Erreur inconnue'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Transactions</h2>
          <p className="text-muted-foreground">
            {paginationInfo.totalElements} transaction{paginationInfo.totalElements > 1 ? 's' : ''} au total
            {paginationInfo.numberOfElements > 0 && (
              <> • Affichage de {paginationInfo.numberOfElements} sur cette page</>
            )}
          </p>
        </div>
        <Button
          onClick={handleDownload}
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
        >
          Télécharger
        </Button>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards
        totalCredit={stats.totalCredit}
        totalDebit={stats.totalDebit}
        balance={stats.balance}
      />

      <TransactionDataTable
        data={filteredTransactions}
        columns={transactionColumns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: true,
          periodFilter: true,
          otherFilters: false,
          searchPlaceholder: 'Rechercher par ID',
        }}
        onDownload={handleDownload}
        bulkActions={bulkActions}
        pageSize={pageSize}
        totalCount={paginationInfo.totalElements}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />
    </div>
  )
}
