import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';
import {
  Add,
  ArrowRight,
  Layer,
  Settings,
  Mobile,
} from 'iconsax-react';
import { useAccount } from '@/core/contexts/AccountContext';
import type { SubAccount } from '@/core/types/account.types';
import { cn } from '@/lib/utils';
import { Card } from 'iconsax-reactjs';

interface SubAccountCardProps {
  subAccount: SubAccount;
  onAccess: (id: string) => void;
  isActive: boolean;
}

const SubAccountCard = ({ subAccount, onAccess, isActive }: SubAccountCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: subAccount.balance.currency
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'Intégration': '🔌',
      'Terminal de paiement': '💳',
      'Application mobile': '📱',
      'Chap Chap': '⚡'
    };
    return icons[type] || '📊';
  };


  
  return (
    <div
      className={cn(
        'rounded-2xl border border-border/60 bg-card/80 p-4 hover:shadow-md transition-shadow',
        isActive && 'border-blue-600 dark:border-blue-400'
      )}
    >
      <div className="pb-3 border-b border-border/60">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
              {getTypeIcon(subAccount.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold">{subAccount.name}</p>
                {isActive && (
                  <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Actif
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{subAccount.type}</p>
            </div>
          </div>
          {subAccount.environment === 'sandbox' && (
            <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              Sandbox
            </Badge>
          )}
        </div>
      </div>
      <div className="space-y-3 pt-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 p-2 rounded-lg">
            <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">Revenu Total</p>
            <p className="text-sm font-bold">{formatCurrency(subAccount.balance.totalRevenue)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-lg">
            <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">Opération</p>
            <p className="text-sm font-bold">{formatCurrency(subAccount.balance.operatingBalance)}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded-lg">
            <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">Disponible</p>
            <p className="text-sm font-bold">{formatCurrency(subAccount.balance.availableBalance)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onAccess(subAccount.id)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 h-8 text-xs"
            disabled={isActive}
          >
            {isActive ? 'Compte actif' : 'Accéder au sous-compte'}
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>Créé le {new Date(subAccount.createdAt).toLocaleDateString('fr-FR')}</span>
          <Badge variant={subAccount.status === 'active' ? 'default' : 'secondary'} className="text-[10px]">
            {subAccount.status === 'active' ? 'Actif' : 'Inactif'}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export const SubAccountsSection = () => {
  const { mainAccount, switchToSubAccount, activeAccountType } = useAccount();

  if (activeAccountType === 'sub') {
    return null;
  }

  const tabs = [
    { label: 'Intégration', value: 'Intégration', icon: Settings },
    { label: 'Terminal de paiement', value: 'Terminal de paiement', icon: Card },
    { label: 'Application mobile', value: 'Application mobile', icon: Mobile },
    { label: 'Chap Chap', value: 'Chap Chap', icon:  Card}
  ];

  const [activeType, setActiveType] = React.useState<string>('Intégration');

  const filteredSubAccounts = React.useMemo(
    () =>
      mainAccount.subAccounts.filter((subAccount) =>
        activeType ? subAccount.type === activeType : true
      ),
    [mainAccount.subAccounts, activeType]
  );

  const summaryBalance =
    filteredSubAccounts.length > 0
      ? filteredSubAccounts[0].balance
      : mainAccount.balance;

  const formatSummaryCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: summaryBalance.currency
    }).format(amount);
  };

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 shadow-sm">
      <div className="flex flex-row items-center justify-between border-b border-border/60 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Layer size={24} variant="Bulk" color="currentColor" className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Mes sous-comptes</h3>
            <p className="text-sm text-muted-foreground">
              Gérez et accédez à vos différents sous-comptes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/main/sub-accounts">
            <Button variant="ghost" size="sm" className="gap-2">
              Voir tout
              <ArrowRight size={16} variant="Bulk" color="currentColor" />
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <Add size={16} variant="Bulk" color="currentColor" />
            Créer un sous-compte
          </Button>
        </div>
      </div>
      <div className="space-y-6 px-6 py-6">
        {mainAccount.subAccounts.length > 0 && (
          <Tabs value={activeType} onValueChange={setActiveType} className="w-full">
            <TabsList className="w-full justify-start border-b border-border/60 bg-transparent p-0 h-auto flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    'px-4 py-2 text-sm rounded-t-lg rounded-b-none border transition-colors flex items-center gap-2 data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-transparent',
                    'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-sm'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="space-y-6 mt-0">
                {/* Recap Section */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Récapitulatif</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20 px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300">
                        <span className="text-lg">💰</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-200">
                          Revenu total
                        </p>
                        <p className="text-sm font-semibold">
                          {formatSummaryCurrency(summaryBalance.totalRevenue)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20 px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300">
                        <span className="text-lg">📊</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-200">
                          Solde d'opération
                        </p>
                        <p className="text-sm font-semibold">
                          {formatSummaryCurrency(summaryBalance.operatingBalance)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20 px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                        <span className="text-lg">🧮</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                          Solde disponible
                        </p>
                        <p className="text-sm font-semibold">
                          {formatSummaryCurrency(summaryBalance.availableBalance)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Accounts Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSubAccounts.length === 0 ? (
                    <div className="col-span-full text-sm text-muted-foreground py-8 text-center border border-dashed rounded-xl">
                      Aucun sous-compte pour ce type pour le moment.
                    </div>
                  ) : (
                    filteredSubAccounts.map((subAccount) => (
                      <SubAccountCard
                        key={subAccount.id}
                        subAccount={subAccount}
                        onAccess={switchToSubAccount}
                        isActive={false}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {mainAccount.subAccounts.length === 0 && (
          <div className="py-12 px-6">
            {/* Hero Section */}
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 dark:from-blue-950/30 dark:via-violet-950/30 dark:to-purple-950/30 mb-6">
                <Layer size={56} variant="Bulk" className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Organisez vos activités avec les sous-comptes
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mb-8">
                Gérez plusieurs projets, séparez vos environnements et suivez vos performances individuellement avec des sous-comptes dédiés.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all gap-2"
              >
                <Add size={20} variant="Bulk" />
                Créer mon premier sous-compte
              </Button>
            </div>

            {/* Features Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-100 dark:border-blue-900/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 mb-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🔌</span>
                </div>
                <h4 className="font-semibold text-base mb-2">Intégration</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connectez vos applications via API avec des clés dédiées
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-violet-50/50 to-violet-100/30 dark:from-violet-950/20 dark:to-violet-900/10 border border-violet-100 dark:border-violet-900/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 mb-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💳</span>
                </div>
                <h4 className="font-semibold text-base mb-2">Terminal de paiement</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acceptez les paiements en magasin physique
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-50/50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10 border border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 mb-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-semibold text-base mb-2">Application mobile</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Intégrez les paiements dans votre app mobile
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 p-6 rounded-2xl bg-muted/30 border border-dashed max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Isolation des données</p>
                    <p className="text-xs text-muted-foreground">Chaque sous-compte a ses propres transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Gestion simplifiée</p>
                    <p className="text-xs text-muted-foreground">Basculez facilement entre vos comptes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Environnements séparés</p>
                    <p className="text-xs text-muted-foreground">Live et Sandbox indépendants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Reporting détaillé</p>
                    <p className="text-xs text-muted-foreground">Statistiques par sous-compte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
