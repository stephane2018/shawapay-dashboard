'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { More, Sms, Call, Edit, Trash, TickCircle, CloseCircle, Clock, People } from 'iconsax-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useCustomers } from '@/core/hooks/use-customers'
import type { Customer } from '@/core/types/customer.types'

// Customer display type
interface CustomerDisplay {
  id: string
  name: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  validationStep: string | null
}

// Helper function to map customer to display format
const mapCustomerToDisplay = (customer: Customer): CustomerDisplay => ({
  id: customer.userId,
  name: `${customer.firstname} ${customer.lastname}`,
  phone: customer.phone,
  status: customer.isEnabled ? 'active' : 'inactive',
  createdAt: new Date(customer.createdAt).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  validationStep: customer.validationStep,
})

// Phone component with icon
const PhoneDisplay = ({ phone }: { phone: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20">
      <Call size={16} color="currentColor" variant="Bulk" className="text-blue-600 dark:text-blue-400" />
    </div>
    <span className="text-sm font-medium">{phone}</span>
  </div>
)

// Date display component
const DateDisplay = ({ date }: { date: string }) => {
  const [datePart, timePart] = date.split(' à ')
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium">{datePart}</span>
      {timePart && <span className="text-xs text-muted-foreground">{timePart}</span>}
    </div>
  )
}

// Status badge component
const StatusBadge = ({ status }: { status: CustomerDisplay['status'] }) => {
  const config = {
    active: {
      label: 'Actif',
      className: 'border border-green-500 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400',
      dotColor: 'bg-green-500'
    },
    inactive: {
      label: 'Inactif',
      className: 'w-fit border border-dashed border-red-400 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-900/20 dark:text-red-400',
      dotColor: 'bg-red-500'
    },
    pending: {
      label: 'En attente',
      className: 'w-fit border border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-900/20 dark:text-amber-400',
      dotColor: 'bg-amber-500'
    },
  }
  const { label, className, dotColor } = config[status]
  return (
    <Badge className={`${className} px-3 py-1 flex items-center rounded-full gap-2`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
      {label}
    </Badge>
  )
}

// Columns definition
const columns: ColumnDef<CustomerDisplay>[] = [
  {
    accessorKey: 'name',
    header: 'Client',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs">
            {row.original.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.phone}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => <PhoneDisplay phone={row.original.phone} />,
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date création',
    cell: ({ row }) => <DateDisplay date={row.original.createdAt} />,
  },
  {
    accessorKey: 'validationStep',
    header: 'Étape de validation',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.validationStep || 'Non défini'}
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
            <Call size={16} variant="Bulk" color="currentColor" /> Appeler
          </DropdownMenuItem>
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
  { value: 'active', label: 'Actifs', icon: <TickCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'inactive', label: 'Inactifs', icon: <CloseCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'pending', label: 'En attente', icon: <Clock size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'all', label: 'Tous', icon: <People size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const ClientsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  // Fetch customers from API
  const { data, isLoading, isError, error } = useCustomers({
    page: currentPage - 1,
    size: pageSize,
    sort: 'createdAt,desc',
  })

  // Map customers to display format
  const customers = React.useMemo(() => {
    if (!data?.content) return []
    return data.content.map(mapCustomerToDisplay)
  }, [data])

  // Filter customers by status
  const filteredCustomers = React.useMemo(() => {
    if (activeStatus === 'all') return customers
    return customers.filter((c) => c.status === activeStatus)
  }, [customers, activeStatus])

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
      currentPage: data.number + 1, // API is 0-based, UI is 1-based
    }
  }, [data])

  // Show error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Clients</h2>
            <p className="text-muted-foreground">
              Gérez les clients de votre compte
            </p>
          </div>
        </div>
        <div className="p-8 text-center border rounded-lg bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">
            Erreur lors du chargement des clients: {(error as any)?.message || 'Erreur inconnue'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Clients</h2>
          <p className="text-muted-foreground">
            {paginationInfo.totalElements} client{paginationInfo.totalElements > 1 ? 's' : ''} au total
            {paginationInfo.numberOfElements > 0 && (
              <> • Affichage de {paginationInfo.numberOfElements} sur cette page</>
            )}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          + Ajouter un client
        </Button>
      </div>

      <TransactionDataTable
        data={filteredCustomers}
        columns={columns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: false,
          periodFilter: false,
          otherFilters: true,
          searchPlaceholder: 'Rechercher un client',
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
