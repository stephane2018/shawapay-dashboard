import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ArrowDown2 } from 'iconsax-react';

interface EmptyStateProps {
  title: string;
  period?: string;
}

export const EmptyState = ({ title, period = 'Il y a 30 jours' }: EmptyStateProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-7">
          {period}
          <ArrowDown2 size={14} className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="w-24 h-24 mb-4 opacity-20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-full h-full text-muted-foreground"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
      </CardContent>
    </Card>
  );
};
