import React from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { cn } from '@/lib/utils';
import { useAccount } from '@/core/contexts/AccountContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Wallet,
  ArrowDown2,
  Hierarchy,
  CardPos,
  Mobile,
  Flash,
  DocumentText,
  Warning2
} from 'iconsax-react';

interface QuickTransferProps {
  balance: number;
  currency?: string;
  className?: string;
}

export const QuickTransfer = ({ balance, currency = 'FCFA', className }: QuickTransferProps) => {
  const { mainAccount } = useAccount();
  const [amount, setAmount] = React.useState('');
  const [selectedSubAccount, setSelectedSubAccount] = React.useState<string>('');

  // Get active sub-accounts
  const activeSubAccounts = mainAccount.subAccounts.filter(
    (subAccount) => subAccount.status === 'active'
  );

  const getSubAccountIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Intégration': <Hierarchy size={20} variant="Bulk" color="currentColor" />,
      'Terminal de paiement': <CardPos size={20} variant="Bulk" color="currentColor" />,
      'Application mobile': <Mobile size={20} variant="Bulk" color="currentColor" />,
      'Chap Chap': <Flash size={20} variant="Bulk" color="currentColor" />
    };
    return iconMap[type] || <DocumentText size={20} variant="Bulk" color="currentColor" />;
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('fr-FR')} ${currency}`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleRecharge = () => {
    if (!amount || !selectedSubAccount) return;

    // TODO: Implémenter la logique de rechargement
    console.log('Recharger le sous-compte:', selectedSubAccount, 'avec', amount, currency);

    // Reset form
    setAmount('');
    setSelectedSubAccount('');
  };

  const formattedAmount = amount ? `${parseInt(amount).toLocaleString('fr-FR')}` : '';
  const selectedAccount = activeSubAccounts.find(acc => acc.id === selectedSubAccount);

  return (
    <Card className={cn("relative overflow-hidden border-none shadow-lg", className)}>
  
      <CardContent className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-900/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowDown2 size={20} variant="Bulk" color="currentColor" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-foreground">Recharger un sous-compte</h3>
            <p className="text-xs text-muted-foreground">Transférez des fonds vers vos sous-comptes</p>
          </div>
        </div>

        {/* Balance Display */}
        <div className=" bg-purple-900 rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={30} variant="Bulk" color="currentColor" className="text-white" />
            <p className="text-xs text-white uppercase tracking-wider">Solde disponible</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(balance)}</p>
        </div>

        {/* Sub-Account Selection */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Sous-compte</p>
          {activeSubAccounts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <p className="text-sm text-muted-foreground">Aucun sous-compte actif</p>
            </div>
          ) : (
            <Select value={selectedSubAccount} onValueChange={setSelectedSubAccount}>
              <SelectTrigger className="bg-background/40 backdrop-blur-sm  text-muted-foreground h-14 rounded-xl hover:bg-white/15 focus:ring-none">
                <SelectValue placeholder="Sélectionner un sous-compte">
                  {selectedAccount && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        {getSubAccountIcon(selectedAccount.type)}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{selectedAccount.name}</p>
                        <p className="text-xs font-semibold text-muted-foreground">{selectedAccount.type}</p>
                      </div>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-background">
                {activeSubAccounts.map((subAccount) => (
                  <SelectItem
                    key={subAccount.id}
                    value={subAccount.id}
                    className="text-foreground bg-background/40 hover:bg-background/60 hover:text-foreground focus:bg-background/80 focus:text-foreground cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-background/20 flex items-center justify-center">
                        {getSubAccountIcon(subAccount.type)}
                      </div>
                      <div>
                        <p className="font-medium">{subAccount.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {subAccount.type} • {formatCurrency(subAccount.balance.availableBalance)}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Montant</p>
          <div className="relative bg-slate-300/40 dark:bg-background/60 backdrop-blur-sm rounded-xl p-4 min-h-[80px] flex items-center border border-border/50">
            <div className="w-full">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full  bg-transparent border-none outline-none text-3xl font-bold text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/30 caret-foreground dark:caret-white"
              />
              {amount && (
                <p className="text-xs text-muted-foreground mt-1">
                  {formattedAmount} {currency}
                </p>
              )}
            </div>
          </div>
          {amount && parseInt(amount) > balance && (
            <p className="text-xs text-red-200 flex items-center gap-1.5">
              <Warning2 size={14} variant="Bulk" color="currentColor" />
              Solde insuffisant
            </p>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleRecharge}
          variant="secondary"
          className="w-full bg-purple-900 h-12 text-white hover:bg-white/90 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={!amount || !selectedSubAccount || parseInt(amount) > balance}
        >
          Recharger Maintenant
        </Button>
      </CardContent>
    </Card>
  );
};
