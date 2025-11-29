import React from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Eye, EyeSlash } from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import type { AccountBalance } from '@/core/types/account.types';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/ui/alert-dialog';

interface AccountBalanceCardsProps {
  balance: AccountBalance;
  className?: string;
}

export const AccountBalanceCards = ({ balance, className }: AccountBalanceCardsProps) => {
  const [showBalances, setShowBalances] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pendingVisibility, setPendingVisibility] = React.useState<boolean | null>(null);
  const [hiddenCards, setHiddenCards] = React.useState<Record<string, boolean>>({});

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setPendingVisibility(null);
    }
    setDialogOpen(open);
  };

  const handleToggleRequest = () => {
    setPendingVisibility(!showBalances);
    handleDialogChange(true);
  };

  const handleConfirmToggle = () => {
    if (pendingVisibility !== null) {
      setShowBalances(pendingVisibility);
    }
    handleDialogChange(false);
  };

  const nextVisibility = pendingVisibility ?? !showBalances;

  const toggleCardVisibility = (label: string) => {
    setHiddenCards((prev) => ({
      ...prev,
      [label]: !(prev[label] ?? false),
    }));
  };

  const formatCurrency = (amount: number) => {
    if (balance.currency === 'XOF' || balance.currency === 'FCFA') {
      return `${amount.toLocaleString('fr-FR')} ${balance.currency}`;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: balance.currency
    }).format(amount);
  };

  const maskAmount = (amount: string) => {
    return '••••••••';
  };

  const balanceItems = [
    {
      label: 'REVENU TOTAL',
      amount: balance.totalRevenue,
      icon: '💰',
      cardBg: 'bg-white/90 dark:bg-slate-900/70',
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-blue-800/20 text-blue-600 dark:text-blue-300',
      glow: 'from-blue-500/30 via-blue-500/5 to-transparent',
      badge: 'border-blue-300/60 text-blue-600 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/20',
      helper: 'Objectif mensuel',
      trend: '+12,4%',
      trendColor: 'text-emerald-500',
      projection: '30 prochains jours'
    },
    {
      label: "SOLDE D'OPÉRATION",
      amount: balance.operatingBalance,
      icon: '💳',
      cardBg: 'bg-white/90 dark:bg-slate-900/70',
      iconBg: 'bg-gradient-to-br from-amber-400/25 to-orange-500/25 text-amber-600 dark:text-amber-200',
      glow: 'from-amber-400/25 via-orange-400/5 to-transparent',
      badge: 'border-amber-300/60 text-amber-600 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-900/20',
      helper: 'Flux opérationnel',
      trend: '+4,8%',
      trendColor: 'text-amber-500',
      projection: 'Hebdomadaire'
    },
    {
      label: 'SOLDE DISPONIBLE',
      amount: balance.availableBalance,
      icon: '💵',
      cardBg: 'bg-white/90 dark:bg-slate-900/70',
      iconBg: 'bg-gradient-to-br from-emerald-400/25 to-teal-500/25 text-emerald-600 dark:text-emerald-200',
      glow: 'from-emerald-400/25 via-teal-400/5 to-transparent',
      badge: 'border-emerald-300/60 text-emerald-600 dark:text-emerald-200 bg-emerald-50/60 dark:bg-emerald-900/20',
      helper: 'Disponible immédiat',
      trend: '+2,1%',
      trendColor: 'text-emerald-500',
      projection: 'Temps réel'
    }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Récapitulatif</h3>
        <AlertDialog open={dialogOpen} onOpenChange={handleDialogChange}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleToggleRequest}
            >
              {showBalances ? (
                <Eye size={18} variant="Bulk" color="currentColor" />
              ) : (
                <EyeSlash size={18} variant="Bulk" color="currentColor" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {nextVisibility ? 'Afficher les montants ?' : 'Masquer les montants ?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {nextVisibility
                  ? 'Vous êtes sur le point de rendre visibles les soldes sensibles de votre compte.'
                  : 'Vous êtes sur le point de masquer tous les montants affichés.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmToggle}>
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {balanceItems.map((item, index) => (
          <Card
            key={index}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border/40 shadow-sm backdrop-blur',
              item.cardBg
            )}
          >
            <div className={cn('pointer-events-none absolute inset-0 opacity-70 blur-3xl', item.glow)} />
            <CardContent className="relative p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner', item.iconBg)}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/80">
                      {item.label}
                    </p>
                    <div className="relative mt-1 h-10 w-full [perspective:800px]">
                      <div
                        className="relative h-full w-full transform-gpu transition-transform duration-500 [transform-style:preserve-3d]"
                        style={{
                          transform:
                            showBalances && !(hiddenCards[item.label] ?? false)
                              ? 'rotateX(0deg)'
                              : 'rotateX(180deg)',
                        }}
                      >
                        <span className="absolute inset-0 flex items-center text-3xl font-semibold tracking-tight [backface-visibility:hidden]">
                          {formatCurrency(item.amount)}
                        </span>
                        <span
                          className="absolute inset-0 flex items-center text-3xl font-semibold tracking-tight [backface-visibility:hidden]"
                          style={{ transform: 'rotateX(180deg)' }}
                        >
                          {maskAmount(formatCurrency(item.amount))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium border', item.badge)}>
                    {item.helper}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleCardVisibility(item.label)}
                  >
                    {hiddenCards[item.label] ?? !showBalances ? (
                      <EyeSlash size={16} variant="Bulk" color="currentColor" />
                    ) : (
                      <Eye size={16} variant="Bulk" color="currentColor" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.projection}</span>
                <span className={cn('flex items-center gap-1 font-semibold', item.trendColor)}>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                  {item.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
