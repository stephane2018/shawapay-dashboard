'use client'

import React from 'react'
import { useNavigation } from '@/core/contexts/NavigationContext'
import { DashboardPage } from './DashboardPage'
import { SubAccountsPage } from './SubAccountsPage'

export const MainDashboardWrapper = () => {
  const { activeSection } = useNavigation()

  // Show SubAccountsPage when "sous-comptes" is selected
  if (activeSection === 'sous-comptes') {
    return <SubAccountsPage />
  }

  // Otherwise show the main dashboard
  return <DashboardPage />
}
