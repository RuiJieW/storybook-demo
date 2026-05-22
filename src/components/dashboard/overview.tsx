"use client"

import type { ComponentType } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { featureCardSurfaces } from "@/lib/design"
import { cn } from "@/lib/utils"

type StatCard = {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: ComponentType<{ className?: string }>
}

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    trend: "up",
    icon: DollarSignIcon,
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    change: "+180.1% from last month",
    trend: "up",
    icon: UsersIcon,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    trend: "up",
    icon: ShoppingCartIcon,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "-4% from last hour",
    trend: "down",
    icon: TrendingUpIcon,
  },
]

const chartData = [
  { month: "Jan", revenue: 1860 },
  { month: "Feb", revenue: 3050 },
  { month: "Mar", revenue: 2370 },
  { month: "Apr", revenue: 2780 },
  { month: "May", revenue: 3890 },
  { month: "Jun", revenue: 4200 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type OrderStatus = "completed" | "processing" | "pending"

type RecentOrder = {
  id: string
  customer: string
  email: string
  status: OrderStatus
  amount: string
}

const recentOrders: RecentOrder[] = [
  {
    id: "ORD-001",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "completed",
    amount: "$1,999.00",
  },
  {
    id: "ORD-002",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "processing",
    amount: "$39.00",
  },
  {
    id: "ORD-003",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "completed",
    amount: "$299.00",
  },
  {
    id: "ORD-004",
    customer: "William Kim",
    email: "will@email.com",
    status: "pending",
    amount: "$99.00",
  },
  {
    id: "ORD-005",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    status: "completed",
    amount: "$450.00",
  },
]

const statusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "outline"
> = {
  completed: "default",
  processing: "secondary",
  pending: "outline",
}

export function DashboardOverview() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6 md:gap-12 md:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Go to market with unique data
          </h1>
          <p className="text-base text-muted-foreground">
            Store performance, revenue trends, and recent activity on your cream
            canvas.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline">Export</Button>
          <Button>View report</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const accent = featureCardSurfaces[index % featureCardSurfaces.length]
          return (
            <div
              key={stat.title}
              className={cn(
                "flex flex-col gap-4 rounded-xl p-6 md:p-8",
                accent.surface,
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-semibold", accent.muted)}>
                  {stat.title}
                </span>
                <stat.icon className={cn("size-4", accent.icon)} />
              </div>
              <div>
                <div className="text-3xl font-medium tracking-tight">
                  {stat.value}
                </div>
                <p
                  className={cn(
                    "mt-2 flex items-center gap-1 text-xs",
                    accent.muted,
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpIcon className="size-3 text-green-600" />
                  ) : (
                    <ArrowDownIcon className="size-3 text-destructive" />
                  )}
                  {stat.change}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="rounded-xl lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>
              Monthly revenue for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-70 w-full"
            >
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                  <p className="truncate text-sm font-semibold">
                    {order.customer}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {order.email}
                  </p>
                </div>
                <div className="text-sm font-semibold">{order.amount}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of your most recent transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold">{order.id}</TableCell>
                  <TableCell>
                    <div>{order.customer}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {order.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-border bg-muted p-8 md:p-12 lg:p-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Turn your growth ideas into reality today
          </h2>
          <p className="text-base text-muted-foreground">
            Start enriching your pipeline with warm, playful data workflows.
          </p>
          <Button size="lg" className="mt-2">
            Try free
          </Button>
        </div>
      </div>
    </div>
  )
}
