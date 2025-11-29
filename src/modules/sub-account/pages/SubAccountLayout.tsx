'use client'

import React, { useState } from 'react'
import { SubAccountProvider, useSubAccount } from '@/core/contexts/SubAccountContext'
import { SubAccountSidebar } from '@/shared/layouts/SubAccountSidebar'
import { Header } from '@/shared/layouts/Header'
import { SubAccountDashboardPage } from './SubAccountDashboardPage'
import { SubAccountTransactionsPage } from './SubAccountTransactionsPage'
import { SubAccountClientsPage } from './SubAccountClientsPage'
import { SubAccountReversementsPage } from './SubAccountReversementsPage'
import { SubAccountDevelopersPage } from './SubAccountDevelopersPage'

const SubAccountContent = () => {
  const { activeSection } = useSubAccount()

  switch (activeSection) {
    case 'transactions':
      return <SubAccountTransactionsPage />
    case 'clients':
      return <SubAccountClientsPage />
    case 'reversements':
      return <SubAccountReversementsPage />
    case 'developers':
      return <SubAccountDevelopersPage />
    case 'dashboard':
    default:
      return <SubAccountDashboardPage />
  }
}

export const SubAccountLayoutPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <SubAccountProvider>
      <div className="flex h-screen bg-background">
        <SubAccountSidebar
          className={`${isSidebarOpen ? 'w-64' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden`}
          subAccountName="Sous-compte 1"
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            SidebarComponent={SubAccountSidebar}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto py-6 px-4 md:px-6">
              <SubAccountContent />
            </div>
          </main>
        </div>
      </div>
    </SubAccountProvider>
  )
}
