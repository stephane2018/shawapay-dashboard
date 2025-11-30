import React from 'react';
import {
    TrendDown,
} from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { AccountBalanceCards } from '../components/AccountBalanceCards';
import { SubAccountsSection } from '../components/SubAccountsSection';
import { useAccount } from '@/core/contexts/AccountContext';


export const DashboardPage = () => {
    const { currentAccount } = useAccount();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Tableau de bord principal
                    </h2>
                    <p className="text-muted-foreground">
                        Vue d'ensemble de votre compte principal et sous-comptes
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">This Month <TrendDown size={16} variant="Bulk" color="currentColor" className="ml-2" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>This Week</DropdownMenuItem>
                            <DropdownMenuItem>This Month</DropdownMenuItem>
                            <DropdownMenuItem>This Year</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">Reset Data</Button>
                </div>
            </div>

            {/* Account Balance Cards */}
            <AccountBalanceCards balance={currentAccount.balance} />

            {/* Sub Accounts Section */}
            <SubAccountsSection />
        </div>
    );
};
