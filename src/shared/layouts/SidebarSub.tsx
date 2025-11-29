

import {
    Category,
    ArrowSwapHorizontal,
    People,
    Wallet2,
    Card as CardIcon,
    Link21,
    Code,
    Setting2,
    Logout,
    SearchNormal,
    DocumentText
} from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/lib/utils';
import { useAccount } from '@/core/contexts/AccountContext';
import { AccountSelector } from '@/core/components/AccountSelector';

interface SidebarProps {
    className?: string;
}

export const SidebarSub = ({ className }: SidebarProps) => {
    const { currentAccount, switchToMainAccount, environment, setEnvironment } = useAccount();

    return (
        <div className={cn("flex flex-col h-full bg-card border-r", className)}>
            {/* Back to Main Account Button */}
            <div className="p-4 border-b bg-muted/20">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sm hover:bg-background"
                    onClick={switchToMainAccount}
                >
                    <ArrowSwapHorizontal size={16} variant="Bulk" color="currentColor" />
                    <span className="text-muted-foreground">Retour au compte principal</span>
                </Button>
            </div>

            <div className="p-6 ">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {currentAccount.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {currentAccount.name}
                        </span>
                        {'type' in currentAccount && (
                            <span className="text-xs text-muted-foreground font-normal">
                                {currentAccount.type}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {'id' in currentAccount && (
                <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>ID: {currentAccount.id.substring(0, 12)}...</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                            <DocumentText size={12} />
                        </Button>
                    </div>
                </div>
            )}

            <div className="px-4 mb-6">
                <div className="relative">
                    <SearchNormal size={16} variant="Bulk" color="currentColor" className="absolute left-2 top-2.5 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8 bg-muted/50 border-none" />
                    <div className="absolute right-2 top-2.5 flex items-center gap-1">
                        <span className="text-xs text-muted-foreground border rounded px-1">⌘ K</span>
                    </div>
                </div>
            </div>

            {/* Environment Toggle */}
            <div className="px-4 mb-4">
                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                    <Button
                        variant={environment === 'live' ? "secondary" : "ghost"}
                        size="sm"
                        className={cn("flex-1 h-7 text-xs", environment === 'live' && "bg-white shadow-sm dark:bg-slate-950")}
                        onClick={() => setEnvironment('live')}
                    >
                        Live
                    </Button>
                    <Button
                        variant={environment === 'sandbox' ? "secondary" : "ghost"}
                        size="sm"
                        className={cn("flex-1 h-7 text-xs", environment === 'sandbox' && "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400")}
                        onClick={() => setEnvironment('sandbox')}
                    >
                        Sandbox
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-6">
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <Category size={16} variant="Bulk" color="currentColor" />
                        Tableau de bord maître
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 font-medium">
                        <Category size={16} variant="Bulk" color="currentColor" />
                        Tableau de bord
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <ArrowSwapHorizontal size={16} variant="Bulk" color="currentColor" />
                        Transactions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <People size={16} variant="Bulk" color="currentColor" />
                        Clients
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <Wallet2 size={16} variant="Bulk" color="currentColor" />
                        Reversements
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <CardIcon size={16} variant="Bulk" color="currentColor" />
                        Ma boutique
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <Link21 size={16} variant="Bulk" color="currentColor" />
                        KKiaPay Direct
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <Code size={16} variant="Bulk" color="currentColor" />
                        Développeurs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                        <Setting2 size={16} variant="Bulk" color="currentColor" />
                        Paramètres
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <Logout size={16} variant="Bulk" color="currentColor" />
                        Déconnexion
                    </Button>
                </div>
            </div>

            <div className="mt-auto">
                <AccountSelector />
            </div>
        </div>
    );
};
