'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Sector } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { ChartConfig } from '@/shared/ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart';

const chartData = [
  { method: 'Mobile money', value: 75, fill: '#3b82f6' },
  { method: 'Carte de crédit', value: 20, fill: '#f97316' },
  { method: 'Compte bancaire', value: 5, fill: '#a855f7' },
];

const chartConfig = {
  value: {
    label: 'Montant',
  },
  mobileMoney: {
    label: 'Mobile money',
    color: '#3b82f6',
  },
  creditCard: {
    label: 'Carte de crédit',
    color: '#f97316',
  },
  bankAccount: {
    label: 'Compte bancaire',
    color: '#a855f7',
  },
} satisfies ChartConfig;

export const PaymentMethodChart = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base">Quelle est la méthode de paiement la plus utilisée ?</CardTitle>
        <CardDescription>Il y a 30 jours</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[500px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="method"
              innerRadius={100}
              outerRadius={160}
              strokeWidth={5}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              activeShape={
                activeIndex >= 0
                  ? ({
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )
                  : undefined
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing payment methods for the last 30 days
        </div>
      </CardFooter>
    </Card>
  );
};
