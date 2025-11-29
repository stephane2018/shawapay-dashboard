import React from 'react';
import {
    TrendUp,
    TrendDown,
    Wallet,
    More,
    ArrowRight,
    Add,
    Filter,
    SearchNormal
} from 'iconsax-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Input } from '@/shared/ui/input';
import { DataTable } from '@/shared/components/common/data-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { AccountBalanceCards } from '../components/AccountBalanceCards';
import { SubAccountsSection } from '../components/SubAccountsSection';
import { PaymentStatsBanner } from '../components/PaymentStatsBanner';
import { PaymentByDayChart } from '../components/PaymentByDayChart';
import { PaymentMethodChart } from '../components/PaymentMethodChart';
import { PaymentFlowChart } from '../components/PaymentFlowChart';
import { useAccount } from '@/core/contexts/AccountContext';
import {
    ClientLocationItem,
    type ClientLocationItemData
} from '@/shared/components/dashboard/ClientLocationItem';
import {
    BankDistributionItem,
    type BankDistributionItemData
} from '@/shared/components/dashboard/BankDistributionItem';

const data = [
    { name: 'Jan', value: 20000 },
    { name: 'Feb', value: 25000 },
    { name: 'Mar', value: 45000 },
    { name: 'Apr', value: 30000 },
    { name: 'May', value: 35000 },
    { name: 'Jun', value: 28000 },
    { name: 'Jul', value: 32000 },
];

const transactions = [
    {
        id: "INV_000076",
        activity: "Software License",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1200px-Adobe_Creative_Cloud_rainbow_icon.svg.png",
        date: "17 Apr, 2026",
        time: "03:45 PM",
        price: "$25,500",
        status: "Completed",
        statusColor: "text-green-600"
    },
    {
        id: "INV_000075",
        activity: "Flight Ticket",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/American_Airlines_logo_%282013%29.svg/2560px-American_Airlines_logo_%282013%29.svg.png",
        date: "15 Apr, 2026",
        time: "11:20 AM",
        price: "$22,750",
        status: "Pending",
        statusColor: "text-red-500"
    },
    {
        id: "INV_000074",
        activity: "Marketing Campaign",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png",
        date: "12 Apr, 2026",
        time: "09:30 AM",
        price: "$15,000",
        status: "Completed",
        statusColor: "text-green-600"
    }
];

const clientLocations: ClientLocationItemData[] = [
    { city: 'Cotonou', country: 'Bénin', percentage: 42, trend: '+5%' },
    { city: 'Libreville', country: 'Gabon', percentage: 27, trend: '+2%' },
    { city: 'Abidjan', country: "Côte d'Ivoire", percentage: 19, trend: '+1%' },
    { city: 'Paris', country: 'France', percentage: 7, trend: 'Stable' },
    { city: 'Autres', country: 'Global', percentage: 5, trend: '-1%' }
];

const bankDistributions: BankDistributionItemData[] = [
    { bank: 'Ecobank', volume: '12,5 M FCFA', share: 48, status: 'Principal' },
    { bank: 'UBA', volume: '6,2 M FCFA', share: 24, status: 'Secondaire' },
    { bank: 'NSIA', volume: '3,9 M FCFA', share: 15, status: 'Régional' },
    { bank: 'Société Générale', volume: '2,1 M FCFA', share: 8, status: 'International' },
    { bank: 'Autres', volume: '1,4 M FCFA', share: 5, status: 'Divers' }
];

export const DashboardPage = () => {
    const [activeIndex, setActiveIndex] = React.useState(2);
    const { currentAccount, activeAccountType } = useAccount();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {activeAccountType === 'main' ? 'Tableau de bord principal' : currentAccount.name}
                    </h2>
                    <p className="text-muted-foreground">
                        {activeAccountType === 'main'
                            ? 'Vue d\'ensemble de votre compte principal et sous-comptes'
                            : 'Détails et statistiques du sous-compte'}
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



            {/* Stats Grid for Sub Accounts */}
            {activeAccountType === 'sub' && (
                <>
                    {/* Payment Flow Chart */}
                    {'paymentStats' in currentAccount && currentAccount.paymentStats && (
                        <PaymentFlowChart
                            totalAmount={currentAccount.paymentStats.totalAmount}
                            period={currentAccount.paymentStats.period}
                        />
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <PaymentByDayChart />
                        <Card className="h-full">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">Où sont mes clients ?</CardTitle>
                                <CardDescription>Répartition géographique des derniers paiements</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {clientLocations.map((location) => (
                                    <ClientLocationItem key={location.city} item={location} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="h-full">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">Banques par lesquelles je suis payé</CardTitle>
                                <CardDescription>Volume et part de marché des établissements bancaires</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {bankDistributions.map((bank) => (
                                    <BankDistributionItem key={bank.bank} item={bank} />
                                ))}
                            </CardContent>
                        </Card>
                        <PaymentMethodChart />
                    </div>
                </>
            )}
            <SubAccountsSection />
        </div>
    );
};
