'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { MoreHorizontal, Mail, Phone, Edit, Trash2, UserCheck, UserX, Clock, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

// User type
interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'manager' | 'operator' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  createdAt: string
  lastLogin: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jean Kouadio',
    email: 'jean.kouadio@example.com',
    phone: '+225 07 00 00 00',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2025-11-17 10:30',
  },
  {
    id: '2',
    name: 'Marie Dupont',
    email: 'marie.dupont@example.com',
    phone: '+225 05 00 00 00',
    role: 'manager',
    status: 'active',
    createdAt: '2024-03-20',
    lastLogin: '2025-11-16 14:45',
  },
  {
    id: '3',
    name: 'Paul Martin',
    email: 'paul.martin@example.com',
    phone: '+225 01 00 00 00',
    role: 'operator',
    status: 'inactive',
    createdAt: '2024-06-10',
    lastLogin: '2025-10-05 09:00',
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    phone: '+225 07 11 22 33',
    role: 'viewer',
    status: 'pending',
    createdAt: '2025-11-01',
    lastLogin: '-',
  },
  {
    id: '5',
    name: 'Ahmed Diallo',
    email: 'ahmed.diallo@example.com',
    phone: '+225 05 44 55 66',
    role: 'operator',
    status: 'active',
    createdAt: '2024-09-15',
    lastLogin: '2025-11-17 08:15',
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: User['status'] }) => {
  const config = {
    active: { label: 'Actif', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    inactive: { label: 'Inactif', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
    pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  }
  const { label, className } = config[status]
  return <Badge className={className}>{label}</Badge>
}

// Role badge component
const RoleBadge = ({ role }: { role: User['role'] }) => {
  const config = {
    admin: { label: 'Admin', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    manager: { label: 'Manager', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    operator: { label: 'Opérateur', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
    viewer: { label: 'Lecteur', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
  }
  const { label, className } = config[role]
  return <Badge className={className}>{label}</Badge>
}

// Columns definition
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Utilisateur',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs">
            {row.original.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
  },
  {
    accessorKey: 'role',
    header: 'Rôle',
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date création',
    cell: ({ row }) => <span className="text-sm">{row.original.createdAt}</span>,
  },
  {
    accessorKey: 'lastLogin',
    header: 'Dernière connexion',
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastLogin}</span>,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Mail className="h-4 w-4" /> Envoyer un email
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

export const UsersPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter users by status
  const filteredUsers = React.useMemo(() => {
    if (activeStatus === 'all') return mockUsers
    return mockUsers.filter((u) => u.status === activeStatus)
  }, [activeStatus])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Utilisateurs</h2>
          <p className="text-muted-foreground">
            Gérez les utilisateurs de votre compte
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          + Ajouter un utilisateur
        </Button>
      </div>

      <TransactionDataTable
        data={filteredUsers}
        columns={columns}
        statusTabs={statusTabs}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        filterConfig={{
          dateFilter: false,
          periodFilter: false,
          otherFilters: true,
          searchPlaceholder: 'Rechercher un utilisateur',
        }}
        pageSize={10}
        totalCount={filteredUsers.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />
    </div>
  )
}
