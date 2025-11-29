'use client'

import React from 'react'
import { useSubAccount } from '@/core/contexts/SubAccountContext'
import { Button } from '@/shared/ui/button'
import { cn } from '@/lib/utils'
import { LayoutGrid, CreditCard, Settings } from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Aperçu', icon: LayoutGrid },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
  { id: 'settings', label: 'Paramètres', icon: Settings },
] as const

export const SubAccountNavigation = () => {
  const { activeSection, setActiveSection } = useSubAccount()

  return (
    <div className="flex items-center gap-2 border-b">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => setActiveSection(item.id as any)}
            className={cn(
              'gap-2 rounded-none border-b-2 border-transparent px-4 py-2 h-auto',
              isActive
                ? 'border-violet-600 bg-transparent text-violet-600 hover:bg-transparent'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
