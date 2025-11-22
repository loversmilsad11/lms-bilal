"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
export const description = "An interactive bar chart";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyEnrollmentsData = [
  { date: "2025-10-15", enrollments: 12 },
  { date: "2025-10-16", enrollments: 8 },
  { date: "2025-10-17", enrollments: 15 },
  { date: "2025-10-18", enrollments: 23 },
  { date: "2025-10-19", enrollments: 18 },
  { date: "2025-10-20", enrollments: 10 },
  { date: "2025-10-21", enrollments: 38 },
  { date: "2025-10-22", enrollments: 44 },
  { date: "2025-10-23", enrollments: 39 },
  { date: "2025-10-24", enrollments: 47 },
  { date: "2025-10-25", enrollments: 51 },
  { date: "2025-10-26", enrollments: 43 },
  { date: "2025-10-27", enrollments: 36 },
  { date: "2025-10-28", enrollments: 49 },
  { date: "2025-10-29", enrollments: 58 },
  { date: "2025-10-30", enrollments: 62 },
  { date: "2025-11-01", enrollments: 54 },
  { date: "2025-11-02", enrollments: 46 },
  { date: "2025-11-03", enrollments: 40 },
];

const chartConfig = {
  enrollments: {
    label: "Enrolments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data]
  );
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days: {totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days: {totalEnrollmentsNumber}{" "}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStart"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
