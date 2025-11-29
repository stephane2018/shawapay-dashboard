import React from 'react';
import {
    InfoCircle,
    Notification,
    ArrowDown2,
    HambergerMenu,
    ArrowSwapHorizontal,
    People,
    Wallet2,
    Setting2,
    Logout
} from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { Badge } from '@/shared/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ThemeToggle } from '@/core/components/ThemeToggle';
import { useAccount } from '@/core/contexts/AccountContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
    SidebarComponent: React.ComponentType<{ className?: string }>;
    onToggleSidebar?: () => void;
    isSidebarOpen?: boolean;
}

export const Header = ({ SidebarComponent, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
    const { environment, setEnvironment, activeAccountType } = useAccount();

    return (
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                {/* Desktop Sidebar Toggle */}
                {onToggleSidebar && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex"
                        onClick={onToggleSidebar}
                    >
                        <HambergerMenu size={20} variant="Bulk" color="currentColor" />
                    </Button>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer">Shawapay</span>
                    <span>/</span>
                    <span className="text-foreground font-medium">Dashboard</span>
                </div>
            </div>

            {/* Mobile Sidebar Trigger */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute left-4 top-4 z-50">
                        <HambergerMenu size={20} variant="Bulk" color="currentColor" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarComponent />
                </SheetContent>
            </Sheet>

            <div className="flex items-center gap-4">
                {/* Environment Toggle - Only for Main Account here (Sub account has it in sidebar) */}
                {activeAccountType === 'main' && (
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
                )}

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
    );
};
