'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type SubAccountSection = 'overview' | 'transactions' | 'settings'

interface SubAccountContextType {
  activeSubAccountId: string | null
  activeSection: SubAccountSection
  setActiveSubAccountId: (id: string | null) => void
  setActiveSection: (section: SubAccountSection) => void
}

const SubAccountContext = createContext<SubAccountContextType | undefined>(undefined)

export const SubAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSubAccountId, setActiveSubAccountIdState] = useState<string | null>(null)
  const [activeSection, setActiveSectionState] = useState<SubAccountSection>('overview')

  const setActiveSubAccountId = useCallback((id: string | null) => {
    setActiveSubAccountIdState(id)
    // Reset section when switching sub-accounts
    if (id) setActiveSectionState('overview')
  }, [])

  const setActiveSection = useCallback((section: SubAccountSection) => {
    setActiveSectionState(section)
  }, [])

  return (
    <SubAccountContext.Provider value={{ activeSubAccountId, activeSection, setActiveSubAccountId, setActiveSection }}>
      {children}
    </SubAccountContext.Provider>
  )
}

export const useSubAccount = () => {
  const context = useContext(SubAccountContext)
  if (!context) {
    throw new Error('useSubAccount must be used within a SubAccountProvider')
  }
  return context
}
