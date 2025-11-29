'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { ChartConfig } from '@/shared/ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/core/lib/utils';

const chartData = [
  { date: '26/10', amount: 750000 },
  { date: '27/10', amount: 1800000 },
  { date: '28/10', amount: 950000 },
  { date: '29/10', amount: 1100000 },
  { date: '30/10', amount: 1350000 },
  { date: '31/10', amount: 900000 },
  { date: '01/11', amount: 1250000 },
  { date: '02/11', amount: 1450000 },
  { date: '03/11', amount: 650000 },
  { date: '04/11', amount: 800000 },
  { date: '05/11', amount: 4500000 },
  { date: '06/11', amount: 1500000 },
  { date: '07/11', amount: 750000 },
  { date: '08/11', amount: 1900000 },
  { date: '09/11', amount: 950000 },
  { date: '10/11', amount: 11500000 },
  { date: '11/11', amount: 800000 },
  { date: '12/11', amount: 900000 },
  { date: '13/11', amount: 4200000 },
  { date: '14/11', amount: 1150000 },
  { date: '15/11', amount: 850000 },
  { date: '16/11', amount: 1350000 },
  { date: '17/11', amount: 1850000 },
  { date: '18/11', amount: 1950000 },
  { date: '19/11', amount: 950000 },
  { date: '20/11', amount: 2100000 },
  { date: '21/11', amount: 1950000 },
  { date: '22/11', amount: 1600000 },
  { date: '23/11', amount: 1850000 },
  { date: '24/11', amount: 1250000 },
];

const chartConfig = {
  amount: {
    label: 'Montant',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

interface PaymentFlowChartProps {
  totalAmount?: number;
  period?: string;
}

export const PaymentFlowChart = ({ totalAmount = 45000000, period = '30 jours' }: PaymentFlowChartProps) => {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = React.useMemo(() => {
    if (timeRange === '7d') {
      return chartData.slice(-7);
    } else if (timeRange === '30d') {
      return chartData.slice(-30);
    }
    return chartData;
  }, [timeRange]);

  return (
    <Card className="col-span-full pt-0">
      <CardHeader className="flex flex-col gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Montant encaissé sur la période : {period}</CardTitle>
          <CardDescription className="text-2xl font-bold text-foreground">
            {totalAmount.toLocaleString('fr-FR')} FCFA
          </CardDescription>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
            <Button
              variant={timeRange === '7d' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn('gap-2 h-8 text-xs', timeRange === '7d' && 'bg-white shadow-sm dark:bg-slate-950')}
              onClick={() => setTimeRange('7d')}
            >
              <Calendar className="w-3.5 h-3.5" />
              7 jours
            </Button>
            <Button
              variant={timeRange === '30d' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn('gap-2 h-8 text-xs', timeRange === '30d' && 'bg-white shadow-sm dark:bg-slate-950')}
              onClick={() => setTimeRange('30d')}
            >
              <Calendar className="w-3.5 h-3.5" />
              30 jours
            </Button>
            <Button
              variant={timeRange === '90d' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn('gap-2 h-8 text-xs', timeRange === '90d' && 'bg-white shadow-sm dark:bg-slate-950')}
              onClick={() => setTimeRange('90d')}
            >
              <Calendar className="w-3.5 h-3.5" />
              90 jours
            </Button>
          </div>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white h-8">
            <Download className="w-3.5 h-3.5" />
            Télécharger
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#a78bfa"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return `${value}`;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillAmount)"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
