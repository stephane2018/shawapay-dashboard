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

interface QuickTransferPremiumProps {
  balance: number;
  currency?: string;
  className?: string;
}

export const QuickTransferPremium = ({ balance, currency = 'FCFA', className }: QuickTransferPremiumProps) => {
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
    <Card className={cn("relative overflow-hidden border-none shadow-2xl", className)}>
      {/* Animated Gradient Background with Glassmorphism */}
      <div className="absolute inset-0">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/60 via-transparent to-pink-500/60" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/40 via-transparent to-blue-500/40" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-pulse" />

        {/* Large floating orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Medium orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Small accent orbs */}
        <div className="absolute top-1/2 right-12 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-12 left-12 w-24 h-24 bg-pink-300/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2.5s' }} />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(255, 182, 193, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 85%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 30% 15%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `
        }} />

        {/* Noise texture for depth */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          backgroundSize: '200px 200px'
        }} />
      </div>

      <CardContent className="relative p-6 space-y-6 z-10">
        {/* Header with glow effect */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-md" />
            <div className="relative w-11 h-11 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
              <ArrowDown2 size={22} variant="Bulk" className="text-white" />
            </div>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">Recharger un sous-compte</h3>
            <p className="text-xs text-white/80">Transfert instantané et sécurisé</p>
          </div>
        </div>

        {/* Balance Display - Glass Card with Shine Effect */}
        <div className="relative overflow-hidden rounded-2xl p-6 border border-white/40 backdrop-blur-xl bg-white/15 shadow-2xl group">
          {/* Animated shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Decorative gradient orbs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/25 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-pink-300/25 to-transparent rounded-full blur-xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                <Wallet size={18} variant="Bulk" className="text-white" />
              </div>
              <p className="text-xs text-white/90 uppercase tracking-[0.15em] font-bold">Solde disponible</p>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">{formatCurrency(balance)}</p>

            {/* Animated sparkles */}
            <div className="absolute top-5 right-5 flex gap-2">
              <div className="relative">
                <div className="absolute inset-0 w-2.5 h-2.5 bg-white/70 rounded-full animate-ping" />
                <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg" />
              </div>
              <div className="relative" style={{ animationDelay: '300ms' }}>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-pink-200/70 rounded-full animate-ping" style={{ animationDelay: '300ms' }} />
                <div className="w-1.5 h-1.5 bg-pink-200 rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Account Selection */}
        <div className="space-y-2.5">
          <p className="text-xs text-white/90 uppercase tracking-wider font-semibold">Destinataire</p>
          {activeSubAccounts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/30 text-center">
              <p className="text-sm text-white/80">Aucun sous-compte actif</p>
            </div>
          ) : (
            <Select value={selectedSubAccount} onValueChange={setSelectedSubAccount}>
              <SelectTrigger className="bg-white/15 backdrop-blur-md border-white/30 text-white h-16 rounded-xl hover:bg-white/20 focus:ring-2 focus:ring-white/40 transition-all shadow-lg">
                <SelectValue placeholder="Sélectionner un sous-compte">
                  {selectedAccount && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-md">
                        {getSubAccountIcon(selectedAccount.type)}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-white">{selectedAccount.name}</p>
                        <p className="text-xs text-white/70">{selectedAccount.type}</p>
                      </div>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50">
                {activeSubAccounts.map((subAccount) => (
                  <SelectItem
                    key={subAccount.id}
                    value={subAccount.id}
                    className="text-white hover:bg-slate-800/80 focus:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-800/60 flex items-center justify-center">
                        {getSubAccountIcon(subAccount.type)}
                      </div>
                      <div>
                        <p className="font-medium">{subAccount.name}</p>
                        <p className="text-xs text-slate-400">
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

        {/* Amount Input with Glass Effect */}
        <div className="space-y-2.5">
          <p className="text-xs text-white/90 uppercase tracking-wider font-semibold">Montant</p>
          <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-5 min-h-[90px] flex items-center border border-white/30 shadow-lg">
            <div className="w-full">
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full bg-transparent border-none outline-none text-4xl font-bold text-white placeholder:text-white/30 caret-white"
              />
              {amount && (
                <p className="text-xs text-white/70 mt-2 font-medium">
                  {formattedAmount} {currency}
                </p>
              )}
            </div>
          </div>
          {amount && parseInt(amount) > balance && (
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-lg px-3 py-2.5">
              <Warning2 size={16} variant="Bulk" className="text-red-100" />
              <p className="text-xs text-red-100 font-medium">Solde insuffisant</p>
            </div>
          )}
        </div>

        {/* Action Button with Gradient */}
        <Button
          onClick={handleRecharge}
          className="w-full h-14 bg-white hover:bg-white/95 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-base uppercase tracking-wider rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          disabled={!amount || !selectedSubAccount || parseInt(amount) > balance}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent" />
          <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Recharger Maintenant
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};
