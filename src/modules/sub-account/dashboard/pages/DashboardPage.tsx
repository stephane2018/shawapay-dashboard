import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import {
    ClientLocationItem,
    type ClientLocationItemData
} from '@/shared/components/dashboard/ClientLocationItem';
import {
    BankDistributionItem,
    type BankDistributionItemData
} from '@/shared/components/dashboard/BankDistributionItem';
import { PaymentByDayChart } from '../components/PaymentByDayChart';
import { PaymentMethodChart } from '../components/PaymentMethodChart';
import { PaymentFlowChart } from '../components/PaymentFlowChart';
import { useAccount } from '@/core/contexts/AccountContext';

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
    const { currentAccount } = useAccount();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{currentAccount.name}</h2>
                <p className="text-muted-foreground">
                    Détails et statistiques du sous-compte
                </p>
            </div>

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
        </div>
    );
};
