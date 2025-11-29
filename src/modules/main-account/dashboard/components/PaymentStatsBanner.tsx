import React from 'react';
import { Card } from '@/shared/ui/card';
import type { PaymentStats } from '@/core/types/account.types';

interface PaymentStatsBannerProps {
  stats: PaymentStats;
}

export const PaymentStatsBanner = ({ stats }: PaymentStatsBannerProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString('fr-FR')} ${currency}`;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 border-blue-100 dark:border-blue-900/50">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Montant encaissé sur la période : {stats.period}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(stats.totalAmount, stats.currency)}
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
              Actif
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
