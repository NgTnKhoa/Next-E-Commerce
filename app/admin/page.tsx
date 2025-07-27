"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  ShoppingCart,
  CreditCard,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard
const dashboardStats = {
  revenue: {
    total: 45231.89,
    change: 20.1,
    trend: "up" as const
  },
  orders: {
    total: 1234,
    change: 15.3,
    trend: "up" as const
  },
  users: {
    total: 2543,
    change: 8.7,
    trend: "up" as const
  },
  products: {
    total: 156,
    change: -2.4,
    trend: "down" as const
  }
};

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    status: "completed",
    amount: 299.99,
    date: new Date("2024-01-15T10:30:00")
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    status: "processing",
    amount: 1299.99,
    date: new Date("2024-01-15T09:15:00")
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    status: "shipped",
    amount: 599.99,
    date: new Date("2024-01-15T08:45:00")
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    status: "pending",
    amount: 199.99,
    date: new Date("2024-01-15T07:20:00")
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    status: "failed",
    amount: 799.99,
    date: new Date("2024-01-15T06:10:00")
  }
];

const topProducts = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    sales: 234,
    revenue: 23400,
    image: "/product/smartphone/iphone-13-pro/iphone-13-pro-1.jpg"
  },
  {
    id: 2,
    name: "Apple MacBook Pro",
    sales: 89,
    revenue: 178000,
    image: "/product/laptop/apple-macbook-pro/apple-macbook-pro-1.jpg"
  },
  {
    id: 3,
    name: "Wireless Mouse",
    sales: 567,
    revenue: 113400,
    image: "/product/accessory/wireless-mouse/wireless-mouse-1.jpg"
  },
  {
    id: 4,
    name: "Apple iPad Air",
    sales: 123,
    revenue: 73800,
    image: "/product/tablet/apple-ipad-air/apple-ipad-air-1.jpg"
  },
  {
    id: 5,
    name: "Apple Watch Series 7",
    sales: 234,
    revenue: 93600,
    image: "/product/wearable/apple-watch-series-7/apple-watch-series-7-1.jpg"
  }
];

const Dashboard = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", variant: "default" as const, icon: CheckCircle };
      case "processing":
        return { label: "Processing", variant: "secondary" as const, icon: Clock };
      case "shipped":
        return { label: "Shipped", variant: "outline" as const, icon: Package };
      case "pending":
        return { label: "Pending", variant: "secondary" as const, icon: Clock };
      case "failed":
        return { label: "Failed", variant: "destructive" as const, icon: AlertTriangle };
      default:
        return { label: status, variant: "secondary" as const, icon: Clock };
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    trend, 
    icon: Icon, 
    href 
  }: {
    title: string;
    value: string | number;
    change: number;
    trend: "up" | "down";
    icon: any;
    href: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
        <Link href={href}>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Details
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your e-commerce admin dashboard.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatPrice(dashboardStats.revenue.total)}
          change={dashboardStats.revenue.change}
          trend={dashboardStats.revenue.trend}
          icon={DollarSign}
          href="/admin/payments"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.orders.total.toLocaleString()}
          change={dashboardStats.orders.change}
          trend={dashboardStats.orders.trend}
          icon={ShoppingCart}
          href="/admin/orders"
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.users.total.toLocaleString()}
          change={dashboardStats.users.change}
          trend={dashboardStats.users.trend}
          icon={Users}
          href="/admin/users"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.products.total.toLocaleString()}
          change={Math.abs(dashboardStats.products.change)}
          trend={dashboardStats.products.trend}
          icon={Package}
          href="/admin/products"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground">Latest customer orders and their status</p>
            </div>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(order.date)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.amount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <p className="text-sm text-muted-foreground">Best selling products this month</p>
            </div>
            <Link href="/admin/products">
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover border"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-product.jpg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(product.revenue)}</div>
                    <div className="text-xs text-muted-foreground">revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Common administrative tasks and shortcuts
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/products">
              <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-2">
                <Package className="h-6 w-6" />
                <span className="text-sm">Add Product</span>
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Manage Categories</span>
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm">View Orders</span>
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Manage Users</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Website</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment Gateway</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-muted-foreground">Degraded</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Images</span>
                <span>2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database</span>
                <span>450 MB / 2 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '22.5%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs text-muted-foreground">New order received</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Product updated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-xs text-muted-foreground">Low stock alert</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-xs text-muted-foreground">New user registered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
