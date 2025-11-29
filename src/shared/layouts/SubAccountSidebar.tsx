import {
  Home,
  ArrowSwapHorizontal,
  People,
  Wallet2,
  Code,
  ArrowLeft,
} from 'iconsax-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/lib/utils'
import { useSubAccount, type SubAccountSection } from '@/core/contexts/SubAccountContext'
import { useNavigation } from '@/core/contexts/NavigationContext'

interface SidebarProps {
  className?: string
  subAccountName?: string
}

const navItems: { id: SubAccountSection; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: ArrowSwapHorizontal },
  { id: 'clients', label: 'Clients', icon: People },
  { id: 'reversements', label: 'Reversements', icon: Wallet2 },
  { id: 'developers', label: 'Développeurs', icon: Code },
]

export const SubAccountSidebar = ({ className, subAccountName = 'Sous-compte' }: SidebarProps) => {
  const { activeSection, setActiveSection } = useSubAccount()
  const { setActiveSection: setMainActiveSection } = useNavigation()

  const handleBackToMain = () => {
    setMainActiveSection('sous-comptes')
  }

  return (
    <div className={cn('flex flex-col h-full bg-card border-r', className)}>
      {/* Back Button */}
      <div className="p-4 border-b bg-muted/20">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sm hover:bg-background"
          onClick={handleBackToMain}
        >
          <ArrowLeft size={16} variant="Bulk" color="currentColor" />
          <span className="text-muted-foreground">Retour aux sous-comptes</span>
        </Button>
      </div>

      {/* Sub-Account Info */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {subAccountName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {subAccountName}
            </span>
            <span className="text-xs text-muted-foreground font-normal">
              Sous-compte actif
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-full justify-start gap-3 font-medium',
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-violet-600 hover:from-blue-100 hover:to-violet-100 hover:text-violet-700 dark:from-blue-950/30 dark:to-violet-950/30 dark:text-violet-300'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                )}
              >
                <Icon size={16} variant="Bulk" color="currentColor" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t bg-muted/20 text-xs text-muted-foreground">
        <p>ID: SUB-2024-001</p>
        <p className="mt-1">Statut: Actif</p>
      </div>
    </div>
  )
}
