"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Eye, 
  MoreHorizontal,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

// Mock payment data - replace with actual data source
const mockPayments = [
  {
    id: 1,
    transactionId: "TXN-001",
    orderId: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    amount: 299.99,
    status: "completed",
    method: "credit_card",
    cardLast4: "4242",
    cardBrand: "Visa",
    processingFee: 8.99,
    netAmount: 291.00,
    paymentDate: new Date("2024-01-15T10:30:00"),
    gateway: "Stripe"
  },
  {
    id: 2,
    transactionId: "TXN-002",
    orderId: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    amount: 1299.99,
    status: "pending",
    method: "bank_transfer",
    cardLast4: null,
    cardBrand: null,
    processingFee: 5.00,
    netAmount: 1294.99,
    paymentDate: new Date("2024-01-14T14:20:00"),
    gateway: "PayPal"
  },
  {
    id: 3,
    transactionId: "TXN-003",
    orderId: "ORD-003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    amount: 599.99,
    status: "failed",
    method: "credit_card",
    cardLast4: "1234",
    cardBrand: "Mastercard",
    processingFee: 0,
    netAmount: 0,
    paymentDate: new Date("2024-01-13T09:15:00"),
    gateway: "Stripe"
  },
  {
    id: 4,
    transactionId: "TXN-004",
    orderId: "ORD-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    amount: 199.99,
    status: "refunded",
    method: "paypal",
    cardLast4: null,
    cardBrand: null,
    processingFee: -5.99,
    netAmount: 194.00,
    paymentDate: new Date("2024-01-12T16:45:00"),
    gateway: "PayPal"
  },
  {
    id: 5,
    transactionId: "TXN-005",
    orderId: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david@example.com",
    amount: 799.99,
    status: "processing",
    method: "credit_card",
    cardLast4: "5678",
    cardBrand: "American Express",
    processingFee: 23.99,
    netAmount: 776.00,
    paymentDate: new Date("2024-01-11T11:30:00"),
    gateway: "Stripe"
  }
];

type Payment = typeof mockPayments[0];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredPayments = payments.filter((payment) =>
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefund = (paymentId: number) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId ? { ...payment, status: "refunded" } : payment
      )
    );
    toast.success("Refund processed successfully");
  };

  const handleRetry = (paymentId: number) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId ? { ...payment, status: "processing" } : payment
      )
    );
    toast.success("Payment retry initiated");
  };

  const openViewDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          label: "Completed", 
          variant: "default" as const, 
          icon: CheckCircle,
          color: "text-green-600"
        };
      case "pending":
        return { 
          label: "Pending", 
          variant: "secondary" as const, 
          icon: Clock,
          color: "text-yellow-600"
        };
      case "processing":
        return { 
          label: "Processing", 
          variant: "outline" as const, 
          icon: RefreshCw,
          color: "text-blue-600"
        };
      case "failed":
        return { 
          label: "Failed", 
          variant: "destructive" as const, 
          icon: XCircle,
          color: "text-red-600"
        };
      case "refunded":
        return { 
          label: "Refunded", 
          variant: "outline" as const, 
          icon: TrendingUp,
          color: "text-orange-600"
        };
      default:
        return { 
          label: status, 
          variant: "secondary" as const, 
          icon: AlertTriangle,
          color: "text-gray-600"
        };
    }
  };

  const getMethodInfo = (method: string) => {
    switch (method) {
      case "credit_card":
        return { label: "Credit Card", icon: CreditCard };
      case "paypal":
        return { label: "PayPal", icon: DollarSign };
      case "bank_transfer":
        return { label: "Bank Transfer", icon: TrendingUp };
      default:
        return { label: method, icon: CreditCard };
    }
  };

  const getPaymentStats = () => {
    const total = payments.length;
    const completed = payments.filter(p => p.status === "completed").length;
    const pending = payments.filter(p => p.status === "pending").length;
    const failed = payments.filter(p => p.status === "failed").length;
    const totalRevenue = payments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalFees = payments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.processingFee, 0);
    const netRevenue = payments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.netAmount, 0);

    return { total, completed, pending, failed, totalRevenue, totalFees, netRevenue };
  };

  const stats = getPaymentStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Track and manage payment transactions.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(stats.netRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Fees</p>
                <p className="text-2xl font-bold">{formatPrice(stats.totalFees)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const statusInfo = getStatusInfo(payment.status);
                const methodInfo = getMethodInfo(payment.method);
                const StatusIcon = statusInfo.icon;
                const MethodIcon = methodInfo.icon;
                
                return (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.transactionId}</div>
                        <div className="text-sm text-muted-foreground">
                          Order: {payment.orderId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MethodIcon className="h-4 w-4" />
                        <div>
                          <div className="text-sm font-medium">{methodInfo.label}</div>
                          {payment.cardLast4 && (
                            <div className="text-xs text-muted-foreground">
                              {payment.cardBrand} •••• {payment.cardLast4}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatPrice(payment.amount)}</div>
                        {payment.status === "completed" && (
                          <div className="text-xs text-muted-foreground">
                            Net: {formatPrice(payment.netAmount)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{formatDate(payment.paymentDate)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openViewDialog(payment)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {payment.status === "completed" && (
                            <DropdownMenuItem 
                              onClick={() => handleRefund(payment.id)}
                              className="text-orange-600"
                            >
                              <TrendingUp className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
                          {payment.status === "failed" && (
                            <DropdownMenuItem onClick={() => handleRetry(payment.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No payments found</h3>
              {searchTerm ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search terms
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Payment transactions will appear here
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete transaction information and payment details.
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Transaction ID</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.transactionId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Order ID</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.orderId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusInfo(selectedPayment.status).variant}>
                      {getStatusInfo(selectedPayment.status).label}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gateway</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.gateway}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Customer</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.customerName}</p>
                  <p className="text-xs text-muted-foreground">{selectedPayment.customerEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Date</Label>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedPayment.paymentDate)}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Payment Method</Label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{getMethodInfo(selectedPayment.method).label}</span>
                  {selectedPayment.cardLast4 && (
                    <span className="text-sm text-muted-foreground">
                      - {selectedPayment.cardBrand} ending in {selectedPayment.cardLast4}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm">Amount</span>
                  <span className="text-sm font-medium">{formatPrice(selectedPayment.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Processing Fee</span>
                  <span className="text-sm">{formatPrice(selectedPayment.processingFee)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Net Amount</span>
                  <span>{formatPrice(selectedPayment.netAmount)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;
