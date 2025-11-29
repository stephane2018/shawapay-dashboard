import React from 'react';
import {
    Category,
    Chart,
    ArrowSwapHorizontal,
    DocumentText,
    Layer,
    Card as CardIcon,
    MessageText,
    Setting2,
    InfoCircle,
    Logout,
    SearchNormal,
    Notification,
    ArrowDown2,
    HambergerMenu,
    People,
    Wallet2,
    Link21,
    Code
} from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { AccountSelector } from './AccountSelector';
import { useAccount } from '@/core/contexts/AccountContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Sidebar = ({ className }: { className?: string }) => {
    const { currentAccount, activeAccountType, switchToMainAccount, environment } = useAccount();

    return (
        <div className={cn("flex flex-col h-full bg-card border-r", className)}>
            {/* Back to Main Account Button - Only show in sub account */}
            {activeAccountType === 'sub' && (
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
            )}

            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm">
                        {activeAccountType === 'sub' ? currentAccount.name.charAt(0) : 'S'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm leading-tight">
                            {activeAccountType === 'sub' ? currentAccount.name : 'Shawapay'}
                        </span>
                        {activeAccountType === 'sub' && 'type' in currentAccount && (
                            <span className="text-xs text-muted-foreground font-normal">
                                {currentAccount.type}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {activeAccountType === 'sub' && 'id' in currentAccount && (
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

            {/* Environment Toggle - Only show for sub accounts */}
            {activeAccountType === 'sub' && (
                <div className="px-4 mb-4">
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                        <Button
                            variant={environment === 'sandbox' ? "ghost" : "secondary"}
                            size="sm"
                            className={cn("flex-1 h-7 text-xs", environment === 'live' && "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400")}
                        >
                            Live
                        </Button>
                        <Button
                            variant={environment === 'sandbox' ? "secondary" : "ghost"}
                            size="sm"
                            className={cn("flex-1 h-7 text-xs", environment === 'sandbox' && "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400")}
                        >
                            Sandbox
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 space-y-6">
                {activeAccountType === 'main' ? (
                    // Main Account Menu - Compte principal
                    <>
                        <div>
                            <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Compte principal</h3>
                            <div className="space-y-1">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 font-medium bg-gradient-to-r from-blue-50 to-violet-50 text-violet-600 hover:from-blue-100 hover:to-violet-100 hover:text-violet-700 dark:from-blue-950/30 dark:to-violet-950/30 dark:text-violet-300"
                                >
                                    <Layer size={16} variant="Bulk" color="currentColor" />
                                    Mes sous-comptes
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                >
                                    <ArrowSwapHorizontal size={16} variant="Bulk" color="currentColor" />
                                    Mes transactions
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                >
                                    <People size={16} variant="Bulk" color="currentColor" />
                                    Utilisateurs
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                >
                                    <CardIcon size={16} variant="Bulk" color="currentColor" />
                                    Mes abonnements
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                >
                                    <Wallet2 size={16} variant="Bulk" color="currentColor" />
                                    Récompenses
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Général</h3>
                            <div className="space-y-1">
                                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                                    <Setting2 size={16} variant="Bulk" color="currentColor" />
                                    Paramètres
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground">
                                    <InfoCircle size={16} variant="Bulk" color="currentColor" />
                                    Aide
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                                    <Logout size={16} variant="Bulk" color="currentColor" />
                                    Déconnexion
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Sub Account Menu
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
                )}
            </div>

            <div className="mt-auto">
                <AccountSelector />
            </div>
        </div>
    );
};

export const Layout = ({ children }: LayoutProps) => {
    const { environment, setEnvironment } = useAccount();

    return (
        <div className="flex h-screen bg-muted/20">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 h-full">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute left-4 top-4 z-50">
                        <HambergerMenu size={20} variant="Bulk" color="currentColor" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            <div className="flex-1 flex flex-col  overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b bg-card flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 ml-10 md:ml-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="hover:text-foreground cursor-pointer">Shawapay</span>
                            <span>/</span>
                            <span className="text-foreground font-medium">Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                            <Button
                                variant={environment === 'live' ? "secondary" : "ghost"}
                                size="sm"
                                className={cn("h-7 text-xs", environment === 'live' && "bg-white shadow-sm dark:bg-slate-950")}
                                onClick={() => setEnvironment('live')}
                            >
                                Live
                            </Button>
                            <Button
                                variant={environment === 'sandbox' ? "secondary" : "ghost"}
                                size="sm"
                                className={cn("h-7 text-xs", environment === 'sandbox' && "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400")}
                                onClick={() => setEnvironment('sandbox')}
                            >
                                Sandbox
                            </Button>
                        </div>

                        <ThemeToggle />

                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <InfoCircle size={20} variant="Bulk" color="currentColor" />
                        </Button>

                        {/* Notifications Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                                    <Notification size={20} variant="Bulk" color="currentColor" />
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                        3
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <div className="flex items-center justify-between px-4 py-3 border-b">
                                    <h3 className="font-semibold">Notifications</h3>
                                    <Badge variant="secondary" className="text-xs">3 nouvelles</Badge>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {/* Notification Items */}
                                    <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                                        <div className="flex gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                                <ArrowSwapHorizontal size={20} className="text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">Nouveau paiement reçu</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Paiement de 25,000 XOF reçu de Kofi Mensah
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">Il y a 5 minutes</p>
                                            </div>
                                            <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                                        <div className="flex gap-3">
                                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <People size={20} className="text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">Nouveau client ajouté</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Ama Asante a été ajouté à votre liste de clients
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">Il y a 1 heure</p>
                                            </div>
                                            <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                                        <div className="flex gap-3">
                                            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                                <Setting2 size={20} className="text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">Mise à jour système</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Nouvelles fonctionnalités disponibles dans votre dashboard
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">Il y a 3 heures</p>
                                            </div>
                                            <div className="h-2 w-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-muted/50 cursor-pointer">
                                        <div className="flex gap-3">
                                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                <Wallet2 size={20} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-muted-foreground">Retrait effectué</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Retrait de 50,000 XOF vers votre compte bancaire
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">Hier à 14:30</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-t">
                                    <Button variant="ghost" className="w-full text-sm">
                                        Voir toutes les notifications
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="h-8 w-[1px] bg-border mx-1" />

                        {/* User Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors">
                                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white">SD</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:block text-sm">
                                        <p className="font-medium leading-none">Stephane Davy</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
                                    </div>
                                    <ArrowDown2 size={16} variant="Bulk" color="currentColor" className="text-muted-foreground" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="flex items-center gap-3 px-3 py-3 border-b">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white">SD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">Stephane Davy</p>
                                        <p className="text-xs text-muted-foreground truncate">stephane@shawapay.com</p>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <People size={16} className="mr-2" />
                                        Mon profil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Setting2 size={16} className="mr-2" />
                                        Paramètres
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Wallet2 size={16} className="mr-2" />
                                        Facturation
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <InfoCircle size={16} className="mr-2" />
                                        Aide & Support
                                    </DropdownMenuItem>
                                </div>
                                <div className="border-t py-2">
                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                                        <Logout size={16} className="mr-2" />
                                        Déconnexion
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
