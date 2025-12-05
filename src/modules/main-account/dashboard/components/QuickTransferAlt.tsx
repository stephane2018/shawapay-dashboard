import React from 'react';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
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
  Send2,
  Hierarchy,
  CardPos,
  Mobile,
  Flash,
  DocumentText,
  Warning2,
  ArrowRight
} from 'iconsax-react';

interface QuickTransferAltProps {
  balance: number;
  currency?: string;
  className?: string;
}

export const QuickTransferAlt = ({ balance, currency = 'FCFA', className }: QuickTransferAltProps) => {
  const { mainAccount } = useAccount();
  const [amount, setAmount] = React.useState('');
  const [selectedSubAccount, setSelectedSubAccount] = React.useState<string>('');

  // Get active sub-accounts
  const activeSubAccounts = mainAccount.subAccounts.filter(
    (subAccount) => subAccount.status === 'active'
  );

  const getSubAccountIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Intégration': <Hierarchy size={20} variant="Bulk" className="text-blue-600" />,
      'Terminal de paiement': <CardPos size={20} variant="Bulk" className="text-purple-600" />,
      'Application mobile': <Mobile size={20} variant="Bulk" className="text-green-600" />,
      'Chap Chap': <Flash size={20} variant="Bulk" className="text-yellow-600" />
    };
    return iconMap[type] || <DocumentText size={20} variant="Bulk" className="text-gray-600" />;
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
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Send2 size={22} variant="Bulk" className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Quick Recharge</h3>
              <p className="text-xs text-muted-foreground">Rechargez vos sous-comptes</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        {/* Balance Display - Minimal Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 p-5 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} variant="Bulk" className="text-white/80" />
              <p className="text-xs uppercase tracking-wider text-white/80">Compte Principal</p>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
          </div>
        </div>

        {/* Sub-Account Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sous-compte destinataire</label>
          {activeSubAccounts.length === 0 ? (
            <div className="rounded-xl p-6 border-2 border-dashed text-center">
              <p className="text-sm text-muted-foreground">Aucun sous-compte actif</p>
            </div>
          ) : (
            <Select value={selectedSubAccount} onValueChange={setSelectedSubAccount}>
              <SelectTrigger className="h-14 rounded-xl border-2 hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Sélectionner un sous-compte">
                  {selectedAccount && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 flex items-center justify-center border">
                        {getSubAccountIcon(selectedAccount.type)}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{selectedAccount.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedAccount.type}</p>
                      </div>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {activeSubAccounts.map((subAccount) => (
                  <SelectItem
                    key={subAccount.id}
                    value={subAccount.id}
                    className="cursor-pointer py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 flex items-center justify-center border">
                        {getSubAccountIcon(subAccount.type)}
                      </div>
                      <div>
                        <p className="font-semibold">{subAccount.name}</p>
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
          <label className="text-sm font-medium">Montant à transférer</label>
          <div className="relative rounded-xl border-2 p-4 focus-within:border-primary transition-colors bg-muted/30">
            <div className="flex items-baseline gap-2">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full bg-transparent border-none outline-none text-4xl font-bold placeholder:text-muted-foreground/40"
              />
              <span className="text-lg font-semibold text-muted-foreground">{currency}</span>
            </div>
            {formattedAmount && (
              <p className="text-xs text-muted-foreground mt-2">
                {formattedAmount} {currency}
              </p>
            )}
          </div>
          {amount && parseInt(amount) > balance && (
            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">
              <Warning2 size={14} variant="Bulk" />
              Solde insuffisant pour effectuer cette opération
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleRecharge}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || !selectedSubAccount || parseInt(amount) > balance}
        >
          <span>Recharger maintenant</span>
          <ArrowRight size={18} variant="Bulk" className="ml-2" />
        </Button>

        {/* Info text */}
        <p className="text-xs text-center text-muted-foreground">
          Le transfert sera instantané et gratuit
        </p>
      </CardContent>
    </Card>
  );
};
