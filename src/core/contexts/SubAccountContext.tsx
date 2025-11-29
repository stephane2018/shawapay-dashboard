'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type SubAccountSection = 'dashboard' | 'transactions' | 'clients' | 'reversements' | 'developers'

interface SubAccountContextType {
  activeSection: SubAccountSection
  setActiveSection: (section: SubAccountSection) => void
  currentSubAccountId?: string
  setCurrentSubAccountId: (id: string) => void
}

const SubAccountContext = createContext<SubAccountContextType | undefined>(undefined)

export const SubAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState<SubAccountSection>('dashboard')
  const [currentSubAccountId, setCurrentSubAccountId] = useState<string>()

  const setActiveSection = useCallback((section: SubAccountSection) => {
    setActiveSectionState(section)
  }, [])

  return (
    <SubAccountContext.Provider value={{ activeSection, setActiveSection, currentSubAccountId, setCurrentSubAccountId }}>
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
