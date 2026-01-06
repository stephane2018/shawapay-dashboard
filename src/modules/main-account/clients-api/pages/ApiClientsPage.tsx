'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { TransactionDataTable, type StatusTab } from '@/shared/components/common/data-table'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { More, Edit, Trash, Copy, Eye, EyeSlash, TickCircle, CloseCircle, Code1 } from 'iconsax-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useApiClients } from '@/core/hooks/use-api-clients'
import type { ApiClient } from '@/core/types/api-client.types'
import { toast } from 'sonner'
import { ApiClientForm } from '../components/ApiClientForm'

// Status badge component
const StatusBadge = ({ active }: { active: boolean }) => {
  return (
    <Badge className={`${active
      ? 'border w-fit border-green-500 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400'
      : 'border border-dashed border-red-400 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-900/20 dark:text-red-400'
    } px-3 py-1 flex items-center rounded-full gap-2 min-w-fit whitespace-nowrap`}>
      <span className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
      {active ? 'Actif' : 'Inactif'}
    </Badge>
  )
}

// API Key display component
const ApiKeyDisplay = ({ apiKey }: { apiKey: string }) => {
  const [showKey, setShowKey] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    toast.success('Clé API copiée dans le presse-papiers')
  }

  return (
    <div className="flex items-center gap-2">
      <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
        {showKey ? apiKey.substring(0, 30) + '...' : '••••••••••••••••••••••••••••••'}
      </code>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => setShowKey(!showKey)}
      >
        {showKey ? <EyeSlash size={14} variant="Bulk" color='currentColor' /> : <Eye size={14} variant="Bulk" color='currentColor'/>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={copyToClipboard}
      >
        <Copy size={14} />
      </Button>
    </div>
  )
}

// Status tabs
const statusTabs: StatusTab[] = [
  { value: 'active', label: 'Actifs', icon: <TickCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'inactive', label: 'Inactifs', icon: <CloseCircle size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
  { value: 'all', label: 'Tous', icon: <Code1 size={16} variant="Bulk" color="currentColor" className="text-primary" /> },
]

export const ApiClientsPage = () => {
  const [activeStatus, setActiveStatus] = React.useState('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isCreateFormOpen, setIsCreateFormOpen] = React.useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState<ApiClient | null>(null)
  const [isFormLoading, setIsFormLoading] = React.useState(false)
  const [generatedApiKey, setGeneratedApiKey] = React.useState<string>('')
  const pageSize = 10

  // Handle create API client
  const handleCreateClient = async (data: any) => {
    setIsFormLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newApiKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setGeneratedApiKey(newApiKey)
      console.log('Creating API client:', data, 'with key:', newApiKey)
    } catch (error) {
      console.error('Error creating API client:', error)
    } finally {
      setIsFormLoading(false)
    }
  }

  // Handle edit API client
  const handleEditClient = async (data: any) => {
    setIsFormLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating API client:', data)
      setIsEditFormOpen(false)
      // In real app, you would refresh the data here
    } catch (error) {
      console.error('Error updating API client:', error)
    } finally {
      setIsFormLoading(false)
    }
  }

  // Handle delete API client
  const handleDeleteClient = async (client: ApiClient) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client API ${client.owner} ?`)) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Deleting API client:', client)
        // In real app, you would refresh the data here
      } catch (error) {
        console.error('Error deleting API client:', error)
      }
    }
  }

  // Open edit form with selected client
  const openEditForm = (client: ApiClient) => {
    setSelectedClient(client)
    setIsEditFormOpen(true)
  }

  // Columns definition with access to handlers
  const columns: ColumnDef<ApiClient>[] = [
    {
      accessorKey: 'owner',
      header: 'Propriétaire',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xs">
              {row.original.owner.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{row.original.owner}</p>
            <p className="text-xs text-muted-foreground">ID: {row.original.id.substring(0, 8)}...</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'apiKey',
      header: 'Clé API',
      cell: ({ row }) => <ApiKeyDisplay apiKey={row.original.apiKey} />,
    },
    {
      accessorKey: 'active',
      header: 'Statut',
      cell: ({ row }) => <StatusBadge active={row.original.active} />,
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
            <DropdownMenuItem className="gap-2" onClick={() => openEditForm(row.original)}>
              <Edit size={16} variant="Bulk" color="currentColor" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Copy size={16} variant="Bulk" color="currentColor" /> Copier la clé
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDeleteClient(row.original)}>
              <Trash size={16} variant="Bulk" color="currentColor" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // Fetch API clients from API
  const { data, isLoading, isError, error } = useApiClients({
    page: currentPage - 1,
    size: pageSize,
    sort: 'owner,asc',
  })

  // Filter by status
  const filteredClients = React.useMemo(() => {
    if (!data?.content) return []
    if (activeStatus === 'all') return data.content
    return data.content.filter((client) =>
      activeStatus === 'active' ? client.active : !client.active
    )
  }, [data, activeStatus])

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

  // Reset to page 1 when status filter changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeStatus])

  // Show error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Clients API</h2>
            <p className="text-muted-foreground">
              Gérez les clés API de vos clients
            </p>
          </div>
        </div>
        <div className="p-8 text-center border rounded-lg bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">
            Erreur lors du chargement des clients API: {(error as any)?.message || 'Erreur inconnue'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Clients API</h2>
          <p className="text-muted-foreground">
            {paginationInfo.totalElements} client{paginationInfo.totalElements > 1 ? 's' : ''} API au total
            {paginationInfo.numberOfElements > 0 && (
              <> • Affichage de {paginationInfo.numberOfElements} sur cette page</>
            )}
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
          onClick={() => setIsCreateFormOpen(true)}
        >
          + Générer une clé API
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
          dateFilter: false,
          periodFilter: false,
          otherFilters: false,
          searchPlaceholder: 'Rechercher un client API',
        }}
        pageSize={pageSize}
        totalCount={paginationInfo.totalElements}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        enableRowSelection
      />

      {/* Forms */}
      <ApiClientForm
        open={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
        onSubmit={handleCreateClient}
        isLoading={isFormLoading}
        generatedApiKey={generatedApiKey}
      />
      <ApiClientForm
        open={isEditFormOpen}
        onOpenChange={setIsEditFormOpen}
        client={selectedClient}
        onSubmit={handleEditClient}
        isLoading={isFormLoading}
      />
    </div>
  )
}
