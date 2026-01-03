'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { More, Edit, Trash, User, Profile2User } from 'iconsax-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useBackofficeUsers } from '@/core/hooks/use-backoffice-users'
import type { BackofficeUser } from '@/core/types/backoffice-user.types'

// Columns definition
const columns: ColumnDef<BackofficeUser>[] = [
  {
    accessorKey: 'username',
    header: 'Utilisateur',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
            {row.original.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{row.original.username}</p>
          <p className="text-xs text-muted-foreground">ID: {row.original.id.substring(0, 8)}...</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="text-sm font-mono text-muted-foreground">
        {row.original.id.substring(0, 13)}...
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <More size={16} variant="Bulk" color="currentColor" className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Edit size={16} variant="Bulk" color="currentColor" /> Modifier
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-red-600">
            <Trash size={16} variant="Bulk" color="currentColor" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'all', label: 'Tous', icon: <Profile2User size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const BackofficeUsersPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  // Fetch backoffice users from API
  const { data, isLoading, isError, error } = useBackofficeUsers({
    page: currentPage - 1,
    size: pageSize,
    sort: 'username,asc',
  })

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

  // Show error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Utilisateurs Backoffice</h2>
            <p className="text-muted-foreground">
              Gérez les utilisateurs du backoffice
            </p>
          </div>
        </div>
        <div className="p-8 text-center border rounded-lg bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">
            Erreur lors du chargement des utilisateurs: {(error as any)?.message || 'Erreur inconnue'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Utilisateurs Backoffice</h2>
          <p className="text-muted-foreground">
            {paginationInfo.totalElements} utilisateur{paginationInfo.totalElements > 1 ? 's' : ''} au total
            {paginationInfo.numberOfElements > 0 && (
              <> • Affichage de {paginationInfo.numberOfElements} sur cette page</>
            )}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          + Ajouter un utilisateur
        </Button>
      </div>

      <TransactionDataTable
        data={data?.content || []}
        columns={columns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: false,
          periodFilter: false,
          otherFilters: false,
          searchPlaceholder: 'Rechercher un utilisateur',
        }}
        pageSize={pageSize}
        totalCount={paginationInfo.totalElements}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />
    </div>
  )
}
