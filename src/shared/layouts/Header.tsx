import React from 'react';
import {
    InfoCircle,
    Notification,
    ArrowDown2,
    HambergerMenu
} from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
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
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Notification size={20} variant="Bulk" color="currentColor" />
                </Button>

                <div className="h-8 w-[1px] bg-border mx-1" />

                <div className="flex items-center gap-3 pl-2">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium leading-none">Stephane Davy</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
                    </div>
                    <ArrowDown2 size={16} variant="Bulk" color="currentColor" className="text-muted-foreground" />
                </div>

                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 border-none shadow-md">
                    Share
                </Button>
            </div>
        </header>
    );
};
