'use client'

import React from 'react'
import { useSubAccount } from '@/core/contexts/SubAccountContext'
import { SubAccountOverview } from '../components/SubAccountOverview'
import { SubAccountTransactions } from '../components/SubAccountTransactions'
import { SubAccountSettings } from '../components/SubAccountSettings'
import { SubAccountNavigation } from '../components/SubAccountNavigation'

export const SubAccountDetailPage = () => {
  const { activeSubAccountId, activeSection } = useSubAccount()

  if (!activeSubAccountId) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Sélectionnez un sous-compte</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SubAccountNavigation />
      {activeSection === 'overview' && <SubAccountOverview subAccountId={activeSubAccountId} />}
      {activeSection === 'transactions' && <SubAccountTransactions subAccountId={activeSubAccountId} />}
      {activeSection === 'settings' && <SubAccountSettings subAccountId={activeSubAccountId} />}
    </div>
  )
}
