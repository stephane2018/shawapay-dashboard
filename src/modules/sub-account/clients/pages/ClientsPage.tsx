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

// Client type
interface Client {
    id: string
    name: string
    email: string
    phone: string
    totalSpent: number
    transactionCount: number
    status: 'active' | 'inactive' | 'pending'
    avatar?: string
    createdAt: string
    lastTransaction: string
}

// Mock data
const mockClients: Client[] = [
    {
        id: '1',
        name: 'Kofi Mensah',
        email: 'kofi.mensah@example.com',
        phone: '+225 07 00 00 01',
        totalSpent: 125000,
        transactionCount: 15,
        status: 'active',
        createdAt: '2024-01-15',
        lastTransaction: '2025-11-29 09:15',
    },
    {
        id: '2',
        name: 'Ama Asante',
        email: 'ama.asante@example.com',
        phone: '+225 07 00 00 02',
        totalSpent: 85000,
        transactionCount: 8,
        status: 'active',
        createdAt: '2024-03-20',
        lastTransaction: '2025-11-29 08:45',
    },
    {
        id: '3',
        name: 'Kwame Nkrumah',
        email: 'kwame.nkrumah@example.com',
        phone: '+225 07 00 00 03',
        totalSpent: 250000,
        transactionCount: 22,
        status: 'active',
        createdAt: '2024-02-10',
        lastTransaction: '2025-11-28 17:30',
    },
    {
        id: '4',
        name: 'Abena Osei',
        email: 'abena.osei@example.com',
        phone: '+225 07 00 00 04',
        totalSpent: 45000,
        transactionCount: 5,
        status: 'pending',
        createdAt: '2025-11-01',
        lastTransaction: '2025-11-28 14:20',
    },
    {
        id: '5',
        name: 'Yaw Boateng',
        email: 'yaw.boateng@example.com',
        phone: '+225 07 00 00 05',
        totalSpent: 15000,
        transactionCount: 2,
        status: 'inactive',
        createdAt: '2024-08-15',
        lastTransaction: '2025-10-05 11:10',
    },
]

// Status badge component
const StatusBadge = ({ status }: { status: Client['status'] }) => {
    const config = {
        active: { label: 'Actif', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
        inactive: { label: 'Inactif', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
        pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    }
    const { label, className } = config[status]
    return <Badge className={className}>{label}</Badge>
}

// Columns definition
const columns: ColumnDef<Client>[] = [
    {
        accessorKey: 'name',
        header: 'Client',
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
        accessorKey: 'totalSpent',
        header: 'Total dépensé',
        cell: ({ row }) => (
            <span className="text-sm font-medium">{row.original.totalSpent.toLocaleString('fr-FR')} XOF</span>
        ),
    },
    {
        accessorKey: 'transactionCount',
        header: 'Transactions',
        cell: ({ row }) => <span className="text-sm">{row.original.transactionCount}</span>,
    },
    {
        accessorKey: 'status',
        header: 'Statut',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
        accessorKey: 'lastTransaction',
        header: 'Dernière transaction',
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastTransaction}</span>,
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
                        <Phone className="h-4 w-4" /> Appeler
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

export const ClientsPage = () => {
    const [activeStatus, setActiveStatus] = React.useState('all')
    const [currentPage, setCurrentPage] = React.useState(1)

    // Filter clients by status
    const filteredClients = React.useMemo(() => {
        if (activeStatus === 'all') return mockClients
        return mockClients.filter((c) => c.status === activeStatus)
    }, [activeStatus])

    // Calculate stats
    const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0)
    const activeClients = mockClients.filter(c => c.status === 'active').length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Clients</h2>
                    <p className="text-muted-foreground">
                        Gérez vos clients et suivez leurs activités
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    + Ajouter un client
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-6">
                    <p className="text-sm text-muted-foreground">Total clients</p>
                    <p className="text-2xl font-bold">{mockClients.length}</p>
                </div>
                <div className="rounded-xl border bg-card p-6">
                    <p className="text-sm text-muted-foreground">Clients actifs</p>
                    <p className="text-2xl font-bold text-green-600">{activeClients}</p>
                </div>
                <div className="rounded-xl border bg-card p-6">
                    <p className="text-sm text-muted-foreground">Revenu total</p>
                    <p className="text-2xl font-bold">{totalRevenue.toLocaleString('fr-FR')} XOF</p>
                </div>
            </div>

            <TransactionDataTable
                data={filteredClients}
                columns={columns}
                statusTabs={statusTabs}
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
                filterConfig={{
                    dateFilter: false,
                    periodFilter: false,
                    otherFilters: false,
                    searchPlaceholder: 'Rechercher un client',
                }}
                pageSize={10}
                totalCount={filteredClients.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                enableRowSelection
            />
        </div>
    )
}
