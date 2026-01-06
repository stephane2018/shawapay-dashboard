'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
    More,
    Sms,
    Call,
    Edit,
    Trash,

    Clock,
    People,
    CloseCircle,
} from 'iconsax-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { UserCheck } from 'lucide-react'
import { ClientForm } from '../components/ClientForm'

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

// Status tabs
const statusTabs: StatusTab[] = [
    { value: 'active', label: 'Actifs', icon: <UserCheck size={16} color="currentColor" className="text-primary" /> },
    { value: 'inactive', label: 'Inactifs', icon: <CloseCircle size={16} color="currentColor" className="text-primary" /> },
    { value: 'pending', label: 'En attente', icon: <Clock size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
    { value: 'all', label: 'Tous', icon: <People size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const ClientsPage = () => {
    const [activeStatus, setActiveStatus] = React.useState('all')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [isCreateFormOpen, setIsCreateFormOpen] = React.useState(false)
    const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)
    const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    // Handle create client
    const handleCreateClient = async (data: any) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Creating client:', data)
            // In real app, you would refresh the data here
        } catch (error) {
            console.error('Error creating client:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Handle edit client
    const handleEditClient = async (data: any) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Updating client:', data)
            // In real app, you would refresh the data here
        } catch (error) {
            console.error('Error updating client:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Handle delete client
    const handleDeleteClient = async (client: Client) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.name} ?`)) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                console.log('Deleting client:', client)
                // In real app, you would refresh the data here
            } catch (error) {
                console.error('Error deleting client:', error)
            }
        }
    }

    // Open edit form with selected client
    const openEditForm = (client: Client) => {
        setSelectedClient(client)
        setIsEditFormOpen(true)
    }

    // Columns definition with access to handlers
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
                            <More size={16} variant="Bulk" color="currentColor" className="text-primary" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                            <Sms size={16} variant="Bulk" color="currentColor" /> Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <Call size={16} variant="Bulk" color="currentColor" /> Appeler
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => openEditForm(row.original)}>
                            <Edit size={16} variant="Bulk" color="currentColor" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDeleteClient(row.original)}>
                            <Trash size={16} variant="Bulk" color="currentColor" /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]

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
                <Button 
                    className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                    onClick={() => setIsCreateFormOpen(true)}
                >
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

            {/* Forms */}
            <ClientForm
                open={isCreateFormOpen}
                onOpenChange={setIsCreateFormOpen}
                onSubmit={handleCreateClient}
                isLoading={isLoading}
            />
            <ClientForm
                open={isEditFormOpen}
                onOpenChange={setIsEditFormOpen}
                client={selectedClient}
                onSubmit={handleEditClient}
                isLoading={isLoading}
            />
        </div>
    )
}
