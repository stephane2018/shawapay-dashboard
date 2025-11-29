'use client';

import { TrendingUp } from 'iconsax-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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
  { day: 'Lundi', amount: 60000 },
  { day: 'Mardi', amount: 35000 },
  { day: 'Mercredi', amount: 75000 },
  { day: 'Jeudi', amount: 25000 },
  { day: 'Vendredi', amount: 28000 },
  { day: 'Samedi', amount: 0 },
  { day: 'Dimanche', amount: 70000 },
];

const chartConfig = {
  amount: {
    label: 'Montant',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

export const PaymentByDayChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quand suis-je payé le plus ?</CardTitle>
        <CardDescription>Il y a 30 jours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total payments for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
};
