'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { MainAccountRoute, SubAccountRoute } from '@/core/routes'

// Union type for all possible sections
export type NavigationSection = MainAccountRoute | SubAccountRoute

interface NavigationContextType {
  activeSection: NavigationSection
  setActiveSection: (section: NavigationSection) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState<NavigationSection>('dashboard')

  const setActiveSection = useCallback((section: NavigationSection) => {
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
