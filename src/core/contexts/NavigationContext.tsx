'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type MainSection = 'sous-comptes' | 'transactions' | 'utilisateurs' | 'abonnements' | 'recompenses'

interface NavigationContextType {
  activeSection: MainSection
  setActiveSection: (section: MainSection) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState<MainSection>('sous-comptes')

  const setActiveSection = useCallback((section: MainSection) => {
    setActiveSectionState(section)
  }, [])

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
