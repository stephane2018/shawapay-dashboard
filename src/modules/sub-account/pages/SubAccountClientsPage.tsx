'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab, type BulkAction } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { MoreHorizontal, Mail, Phone, Edit, Trash2, UserCheck, UserX, Clock, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

// Client type
interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  totalTransactions: number
  totalAmount: number
}

// Mock data for sub-account clients
const mockClients: Client[] = [
  {
    id: 'CLI001',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+229 90 00 00 00',
    status: 'active',
    joinDate: '2024-01-15',
    totalTransactions: 45,
    totalAmount: 5000000,
  },
  {
    id: 'CLI002',
    name: 'Tech Solutions SARL',
    email: 'info@techsol.com',
    phone: '+229 91 11 11 11',
    status: 'active',
    joinDate: '2024-02-20',
    totalTransactions: 32,
    totalAmount: 3200000,
  },
  {
    id: 'CLI003',
    name: 'Global Trade Ltd',
    email: 'sales@globaltrade.com',
    phone: '+229 92 22 22 22',
    status: 'active',
    joinDate: '2024-03-10',
    totalTransactions: 28,
    totalAmount: 2800000,
  },
  {
    id: 'CLI004',
    name: 'Local Shop',
    email: 'shop@local.com',
    phone: '+229 93 33 33 33',
    status: 'inactive',
    joinDate: '2024-04-05',
    totalTransactions: 12,
    totalAmount: 1200000,
  },
  {
    id: 'CLI005',
    name: 'E-Commerce Ltd',
    email: 'support@ecommerce.com',
    phone: '+229 94 44 44 44',
    status: 'pending',
    joinDate: '2024-05-12',
    totalTransactions: 0,
    totalAmount: 0,
  },
]

// Columns definition
const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Nom du client',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.getValue('email')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.getValue('phone')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalTransactions',
    header: 'Transactions',
    cell: ({ row }) => <span className="text-sm">{row.getValue('totalTransactions')}</span>,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Montant total',
    cell: ({ row }) => {
      const amount = row.getValue('totalAmount') as number
      return <span className="font-medium">{amount.toLocaleString('fr-FR')} XOF</span>
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Date d\'adhésion',
    cell: ({ row }) => {
      const date = row.getValue('joinDate') as string
      return <span className="text-sm">{new Date(date).toLocaleDateString('fr-FR')}</span>
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
        active: { label: 'Actif', variant: 'default' },
        inactive: { label: 'Inactif', variant: 'secondary' },
        pending: { label: 'En attente', variant: 'outline' },
      }
      const config = statusConfig[status]
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Mail className="h-4 w-4" /> Contacter
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Edit className="h-4 w-4" /> Modifier
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-red-600">
            <Trash2 className="h-4 w-4" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'active', label: 'Actifs', icon: <UserCheck className="h-4 w-4" /> },
  { value: 'inactive', label: 'Inactifs', icon: <UserX className="h-4 w-4" /> },
  { value: 'pending', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
  { value: 'all', label: 'Tous', icon: <Users className="h-4 w-4" /> },
]

export const SubAccountClientsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)

  // Filter clients by status
  const filteredClients = React.useMemo(() => {
    if (activeStatus === 'all') return mockClients
    return mockClients.filter((c) => c.status === activeStatus)
  }, [activeStatus])

  const handleDownload = () => {
    console.log('Downloading clients...')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Clients du sous-compte
          </h2>
          <p className="text-muted-foreground">
            Gérez les clients de ce sous-compte
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          + Ajouter un client
        </Button>
      </div>

      <TransactionDataTable
        data={filteredClients}
        columns={columns}
        isLoading={isLoading}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: true,
          periodFilter: false,
          otherFilters: false,
          searchPlaceholder: 'Rechercher un client',
        }}
        onDownload={handleDownload}
        pageSize={10}
        totalCount={filteredClients.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection={false}
      />
    </div>
  )
}
