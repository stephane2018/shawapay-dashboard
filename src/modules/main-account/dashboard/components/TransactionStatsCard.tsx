import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowUp, ArrowDown } from 'iconsax-react';

interface TransactionStatsCardProps {
  className?: string;
}

export const TransactionStatsCard = ({ className }: TransactionStatsCardProps) => {
  // Mock data - À remplacer par les vraies données
  const stats = {
    totalTransactions: 1247,
    successfulTransactions: 1189,
    failedTransactions: 58,
    pendingTransactions: 23,
    successRate: 95.3,
    monthlyGrowth: 12.4,
  };

  const StatItem = ({
    label,
    value,
    subValue,
    trend,
    trendColor
  }: {
    label: string;
    value: string | number;
    subValue?: string;
    trend?: number;
    trendColor?: string;
  }) => (
    <div className="flex flex-col space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            {trend > 0 ? (
              <ArrowUp size={14} variant="Bulk" color="currentColor" />
            ) : (
              <ArrowDown size={14} variant="Bulk" color="currentColor" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Statistiques des Transactions</CardTitle>
        <CardDescription>
          Vue d'ensemble des transactions du compte principal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatItem
            label="Total Transactions"
            value={stats.totalTransactions.toLocaleString('fr-FR')}
            subValue="Ce mois"
            trend={stats.monthlyGrowth}
            trendColor="text-emerald-500"
          />
          <StatItem
            label="Réussies"
            value={stats.successfulTransactions.toLocaleString('fr-FR')}
            subValue={`${stats.successRate}% taux de succès`}
          />
          <StatItem
            label="Échouées"
            value={stats.failedTransactions}
            subValue="À examiner"
            trend={-2.3}
            trendColor="text-emerald-500"
          />
          <StatItem
            label="En attente"
            value={stats.pendingTransactions}
            subValue="En cours de traitement"
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Taux de réussite</span>
            <span className="font-medium">{stats.successRate}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${stats.successRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
