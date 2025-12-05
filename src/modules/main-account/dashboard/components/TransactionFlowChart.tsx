'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  ChartLegend,
  ChartLegendContent,
} from '@/shared/ui/chart';
import { Calendar, ArrowDown3 } from 'iconsax-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/lib/utils';

const chartData = [
  { date: '01/12', incoming: 2500000, outgoing: 1800000 },
  { date: '02/12', incoming: 3200000, outgoing: 2100000 },
  { date: '03/12', incoming: 1800000, outgoing: 1500000 },
  { date: '04/12', incoming: 2900000, outgoing: 2400000 },
  { date: '05/12', incoming: 3500000, outgoing: 1900000 },
  { date: '06/12', incoming: 2200000, outgoing: 2600000 },
  { date: '07/12', incoming: 4100000, outgoing: 2800000 },
  { date: '08/12', incoming: 3800000, outgoing: 2200000 },
  { date: '09/12', incoming: 2700000, outgoing: 3100000 },
  { date: '10/12', incoming: 5200000, outgoing: 2500000 },
  { date: '11/12', incoming: 2900000, outgoing: 2700000 },
  { date: '12/12', incoming: 3400000, outgoing: 1800000 },
  { date: '13/12', incoming: 4500000, outgoing: 3200000 },
  { date: '14/12', incoming: 3100000, outgoing: 2400000 },
  { date: '15/12', incoming: 2800000, outgoing: 2900000 },
  { date: '16/12', incoming: 4200000, outgoing: 2100000 },
  { date: '17/12', incoming: 3900000, outgoing: 2800000 },
  { date: '18/12', incoming: 4800000, outgoing: 3400000 },
  { date: '19/12', incoming: 3300000, outgoing: 2600000 },
  { date: '20/12', incoming: 5100000, outgoing: 3100000 },
  { date: '21/12', incoming: 3700000, outgoing: 2300000 },
  { date: '22/12', incoming: 4400000, outgoing: 2900000 },
  { date: '23/12', incoming: 3900000, outgoing: 3200000 },
  { date: '24/12', incoming: 4700000, outgoing: 2700000 },
  { date: '25/12', incoming: 3200000, outgoing: 2500000 },
  { date: '26/12', incoming: 5300000, outgoing: 3300000 },
  { date: '27/12', incoming: 4100000, outgoing: 2800000 },
  { date: '28/12', incoming: 4600000, outgoing: 3100000 },
  { date: '29/12', incoming: 3800000, outgoing: 2400000 },
  { date: '30/12', incoming: 5500000, outgoing: 3600000 },
];

const chartConfig = {
  incoming: {
    label: 'Entrants',
    color: '#10b981',
  },
  outgoing: {
    label: 'Sortants',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

interface TransactionFlowChartProps {
  className?: string;
}

export const TransactionFlowChart = ({ className }: TransactionFlowChartProps) => {
  const [timeRange, setTimeRange] = React.useState('30d');

  const filteredData = React.useMemo(() => {
    if (timeRange === '7d') {
      return chartData.slice(-7);
    } else if (timeRange === '30d') {
      return chartData.slice(-30);
    }
    return chartData;
  }, [timeRange]);

  const totalIncoming = React.useMemo(
    () => filteredData.reduce((sum, item) => sum + item.incoming, 0),
    [filteredData]
  );

  const totalOutgoing = React.useMemo(
    () => filteredData.reduce((sum, item) => sum + item.outgoing, 0),
    [filteredData]
  );

  const netFlow = totalIncoming - totalOutgoing;

  return (
    <Card className={cn("col-span-full pt-0", className)}>
      <CardHeader className="flex flex-col gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 gap-2">
          <CardTitle className="text-lg">Flux de Transactions</CardTitle>
          <div className="flex flex-wrap items-baseline gap-4">
            <div>
              <CardDescription className="text-xs text-muted-foreground">Total Entrant</CardDescription>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                +{totalIncoming.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            <div>
              <CardDescription className="text-xs text-muted-foreground">Total Sortant</CardDescription>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                -{totalOutgoing.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            <div>
              <CardDescription className="text-xs text-muted-foreground">Flux Net</CardDescription>
              <p className={cn(
                "text-xl font-bold",
                netFlow >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              )}>
                {netFlow >= 0 ? '+' : ''}{netFlow.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
            <Button
              variant={timeRange === '7d' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn('gap-2 h-8 text-xs', timeRange === '7d' && 'bg-white shadow-sm dark:bg-slate-950')}
              onClick={() => setTimeRange('7d')}
            >
              <Calendar size={14} variant="Bulk" color="currentColor" />
              7 jours
            </Button>
            <Button
              variant={timeRange === '30d' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn('gap-2 h-8 text-xs', timeRange === '30d' && 'bg-white shadow-sm dark:bg-slate-950')}
              onClick={() => setTimeRange('30d')}
            >
              <Calendar size={14} variant="Bulk" color="currentColor" />
              30 jours
            </Button>
          </div>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-8">
            <ArrowDown3 size={14} variant="Bulk" color="currentColor" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncoming" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#10b981"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOutgoing" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  indicator="dot"
                  formatter={(value) => `${Number(value).toLocaleString('fr-FR')} FCFA`}
                />
              }
            />
            <Area
              dataKey="incoming"
              type="monotone"
              fill="url(#fillIncoming)"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Area
              dataKey="outgoing"
              type="monotone"
              fill="url(#fillOutgoing)"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <ChartLegend content={ChartLegendContent as any} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
