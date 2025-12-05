import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowUp, ArrowDown, Clock } from 'iconsax-react';
import { cn } from '@/lib/utils';

interface ActivitySectionProps {
  className?: string;
}

interface Activity {
  id: string;
  type: 'incoming' | 'outgoing' | 'pending';
  title: string;
  description: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

export const ActivitySection = ({ className }: ActivitySectionProps) => {
  // Mock data - À remplacer par les vraies données
  const activities: Activity[] = [
    {
      id: '1',
      type: 'incoming',
      title: 'Paiement reçu',
      description: 'De Commerce Express SARL',
      amount: 125000,
      currency: 'FCFA',
      timestamp: 'Il y a 2h',
      status: 'success',
    },
    {
      id: '2',
      type: 'outgoing',
      title: 'Transfert effectué',
      description: 'Vers Sous-compte Marketing',
      amount: 50000,
      currency: 'FCFA',
      timestamp: 'Il y a 5h',
      status: 'success',
    },
    {
      id: '3',
      type: 'pending',
      title: 'Paiement en attente',
      description: 'Vérification en cours',
      amount: 75000,
      currency: 'FCFA',
      timestamp: 'Il y a 1 jour',
      status: 'pending',
    },
    {
      id: '4',
      type: 'incoming',
      title: 'Paiement reçu',
      description: 'De Boutique Mode & Style',
      amount: 89500,
      currency: 'FCFA',
      timestamp: 'Il y a 1 jour',
      status: 'success',
    },
    {
      id: '5',
      type: 'outgoing',
      title: 'Commission payée',
      description: 'Frais de transaction',
      amount: 2500,
      currency: 'FCFA',
      timestamp: 'Il y a 2 jours',
      status: 'success',
    },
  ];

  const getActivityIcon = (type: Activity['type'], status: Activity['status']) => {
    if (status === 'pending') {
      return <Clock size={18} variant="Bulk" className="text-amber-500" color='currentcolor' />;
    }

    if (type === 'incoming') {
      return <ArrowDown size={18} variant="Bulk" className="text-emerald-500" color='currentcolor' />;
    }

    return <ArrowUp size={18} variant="Bulk" className="text-blue-500" color='currentcolor' />;
  };

  const getActivityBg = (type: Activity['type'], status: Activity['status']) => {
    if (status === 'pending') {
      return 'bg-amber-50 dark:bg-amber-950/30';
    }

    if (type === 'incoming') {
      return 'bg-emerald-50 dark:bg-emerald-950/30';
    }

    return 'bg-blue-50 dark:bg-blue-950/30';
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString('fr-FR')} ${currency}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
        <CardDescription>
          Dernières transactions du compte principal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:bg-accent/50 transition-colors"
            >
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                getActivityBg(activity.type, activity.status)
              )}>
                {getActivityIcon(activity.type, activity.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>

              {/* Amount & Time */}
              <div className="text-right shrink-0">
                <p className={cn(
                  "font-semibold text-sm",
                  activity.type === 'incoming'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-foreground'
                )}>
                  {activity.type === 'incoming' ? '+' : '-'}
                  {formatCurrency(activity.amount, activity.currency)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Voir toutes les activités →
        </button>
      </CardContent>
    </Card>
  );
};
