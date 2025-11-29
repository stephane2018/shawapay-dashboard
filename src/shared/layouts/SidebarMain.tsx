import { useNavigate, useLocation } from 'react-router-dom';
import {
    SearchNormal,
    Logout
} from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/lib/utils';
import { AccountSelector } from '@/core/components/AccountSelector';
import { mainAccountNav, mainAccountGeneralNav } from '@/core/config/navigation';
import { useAuth } from '@/core/contexts/AuthContext';

interface SidebarProps {
    className?: string;
}

export const SidebarMain = ({ className }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <div className={cn("flex flex-col h-full bg-card border-r", className)}>
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-2xl text-primary">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white">
                        S
                    </div>
                    Shawapay
                </div>
            </div>

            <div className="px-4 mb-6">
                <div className="relative">
                    <SearchNormal size={16} variant="Bulk" color="currentColor" className="absolute left-2 top-2.5 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8 bg-muted/50 border-none" />
                    <div className="absolute right-2 top-2.5 flex items-center gap-1">
                        <span className="text-xs text-muted-foreground border rounded px-1">⌘ K</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-6">
                <div>
                    <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Compte principal</h3>
                    <div className="space-y-1">
                        {mainAccountNav.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.path}
                                    variant="ghost"
                                    onClick={() => navigate(item.path)}
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
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Général</h3>
                    <div className="space-y-1">
                        {mainAccountGeneralNav.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.path}
                                    variant="ghost"
                                    onClick={() => navigate(item.path)}
                                    className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground"
                                >
                                    <Icon size={16} variant="Bulk" color="currentColor" />
                                    {item.label}
                                </Button>
                            );
                        })}
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 font-medium text-muted-foreground hover:text-foreground text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={logout}
                        >
                            <Logout size={16} variant="Bulk" color="currentColor" />
                            Déconnexion
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <AccountSelector />
            </div>
        </div>
    );
};
