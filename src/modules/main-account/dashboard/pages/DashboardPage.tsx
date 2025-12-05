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
import { TransactionStatsCard } from '../components/TransactionStatsCard';
import { QuickTransfer } from '../components/QuickTransfer';
import { ActivitySection } from '../components/ActivitySection';
import { TransactionFlowChart } from '../components/TransactionFlowChart';
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
              
            </div>

            {/* Account Balance Cards */}
            <AccountBalanceCards balance={currentAccount.balance} />

            {/* Transaction Stats Card */}
            <TransactionStatsCard />

            {/* Quick Transfer & Activity Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <QuickTransfer balance={currentAccount.balance.availableBalance} currency={currentAccount.balance.currency} />
                <ActivitySection />
            </div>

            {/* Transaction Flow Chart */}
            <TransactionFlowChart />

           
        </div>
    );
};
