'use client'

import React from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import { Plus, Search } from 'lucide-react'
import { SubAccountCard, SubAccountStatsCards } from '../components'
import { subAccountService } from '../services/subAccount.service'
import type { SubAccount, SubAccountStats } from '../types'

export const SubAccountsPage = () => {
  const [subAccounts, setSubAccounts] = React.useState<SubAccount[]>([])
  const [stats, setStats] = React.useState<SubAccountStats | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState<string>('all')
  const [filterType, setFilterType] = React.useState<string>('all')

  // Load data
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [accountsData, statsData] = await Promise.all([
          subAccountService.getSubAccounts(),
          subAccountService.getSubAccountStats(),
        ])
        setSubAccounts(accountsData)
        setStats(statsData)
      } catch (error) {
        console.error('Error loading sub-accounts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter accounts
  const filteredAccounts = React.useMemo(() => {
    return subAccounts.filter((account) => {
      const matchesSearch =
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || account.status === filterStatus
      const matchesType = filterType === 'all' || account.type === filterType
      return matchesSearch && matchesStatus && matchesType
    })
  }, [subAccounts, searchQuery, filterStatus, filterType])

  const handleViewAccount = (account: SubAccount) => {
    console.log('View account:', account)
  }

  const handleEditAccount = (account: SubAccount) => {
    console.log('Edit account:', account)
  }

  const handleDeleteAccount = async (account: SubAccount) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${account.name} ?`)) {
      try {
        await subAccountService.deleteSubAccount(account.id)
        setSubAccounts(subAccounts.filter((acc) => acc.id !== account.id))
      } catch (error) {
        console.error('Error deleting account:', error)
      }
    }
  }

  const handleToggleSuspend = async (account: SubAccount) => {
    const newStatus = account.status === 'active' ? 'suspended' : 'active'
    try {
      const updated = await subAccountService.updateSubAccount(account.id, { status: newStatus })
      if (updated) {
        setSubAccounts(
          subAccounts.map((acc) => (acc.id === account.id ? updated : acc))
        )
      }
    } catch (error) {
      console.error('Error updating account:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Mes sous-comptes
          </h2>
          <p className="text-muted-foreground">
            Gérez tous vos sous-comptes et leurs activités
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Créer un sous-compte
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && !isLoading && <SubAccountStatsCards stats={stats} />}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Statut:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="suspended">Suspendus</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="all">Tous</option>
              <option value="merchant">Commerçant</option>
              <option value="reseller">Revendeur</option>
              <option value="agent">Agent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAccounts.length} sous-compte{filteredAccounts.length !== 1 ? 's' : ''} trouvé{filteredAccounts.length !== 1 ? 's' : ''}
        </p>
        {filteredAccounts.length > 0 && (
          <div className="flex gap-2">
            <Badge variant="outline">{filterStatus === 'all' ? 'Tous les statuts' : filterStatus}</Badge>
            <Badge variant="outline">{filterType === 'all' ? 'Tous les types' : filterType}</Badge>
          </div>
        )}
      </div>

      {/* Sub-accounts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map((account) => (
            <SubAccountCard
              key={account.id}
              account={account}
              onView={handleViewAccount}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              onToggleSuspend={handleToggleSuspend}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Aucun sous-compte trouvé</p>
          <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Créer votre premier sous-compte
          </Button>
        </div>
      )}
    </div>
  )
}
