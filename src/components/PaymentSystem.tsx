
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, Receipt, TrendingUp, Calendar, Download, Smartphone, Banknote, Wallet, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface PaymentSystemProps {
  userRole: "rider" | "driver" | "admin";
  onClose: () => void;
}

interface PaymentMethod {
  id: string;
  type: "mobile_money" | "credit_card" | "bank_card" | "cash";
  provider: string;
  details: string;
  isDefault: boolean;
  status: "active" | "pending" | "expired";
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "cancelled";
  method: string;
  paymentType: "mobile_money" | "credit_card" | "bank_card" | "cash";
  rideId?: string;
}

export default function PaymentSystem({ userRole, onClose }: PaymentSystemProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState<"mobile_money" | "credit_card" | "bank_card">("mobile_money");
  const [processingPayment, setProcessingPayment] = useState(false);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "mtn-1",
      type: "mobile_money",
      provider: "MTN Mobile Money",
      details: "*233 24 123 4567",
      isDefault: true,
      status: "active"
    },
    {
      id: "voda-1",
      type: "mobile_money",
      provider: "Vodafone Cash",
      details: "*233 20 987 6543",
      isDefault: false,
      status: "active"
    },
    {
      id: "visa-1",
      type: "credit_card",
      provider: "Visa",
      details: "**** **** **** 4532",
      isDefault: false,
      status: "active"
    },
    {
      id: "gcb-1",
      type: "bank_card",
      provider: "GCB Bank",
      details: "**** **** **** 7890",
      isDefault: false,
      status: "active"
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "txn-1",
      date: "Dec 27, 2024",
      description: "Ride to Kotoka International Airport",
      amount: userRole === "rider" ? -45.00 : 45.00,
      status: "completed",
      method: "MTN Mobile Money (*233 24 123 4567)",
      paymentType: "mobile_money",
      rideId: "ride-001"
    },
    {
      id: "txn-2",
      date: "Dec 26, 2024",
      description: "Ride to Accra Mall",
      amount: userRole === "rider" ? -18.50 : 18.50,
      status: "completed",
      method: "Vodafone Cash (*233 20 987 6543)",
      paymentType: "mobile_money",
      rideId: "ride-002"
    },
    {
      id: "txn-3",
      date: "Dec 25, 2024",
      description: "Ride to Osu Oxford Street",
      amount: userRole === "rider" ? -25.00 : 25.00,
      status: "completed",
      method: "Cash Payment",
      paymentType: "cash",
      rideId: "ride-003"
    },
    {
      id: "txn-4",
      date: "Dec 24, 2024",
      description: "Ride to University of Ghana",
      amount: userRole === "rider" ? -15.75 : 15.75,
      status: "pending",
      method: "Visa Card (**** 4532)",
      paymentType: "credit_card",
      rideId: "ride-004"
    }
  ]);

  const [driverEarnings] = useState({
    today: 156.75,
    thisWeek: 847.50,
    thisMonth: 3247.80,
    totalEarnings: 12847.65,
    pendingPayout: 423.25,
    nextPayoutDate: "Monday, Jan 1st",
    mobileMoneyBalance: 234.50,
    cashBalance: 89.25
  });

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "mobile_money":
        return <Smartphone className="w-5 h-5 text-green-600" />;
      case "credit_card":
      case "bank_card":
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case "cash":
        return <Banknote className="w-5 h-5 text-orange-600" />;
      default:
        return <Wallet className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleAddPaymentMethod = async () => {
    setProcessingPayment(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessingPayment(false);
    setShowAddPayment(false);
    // Show success message
  };

  const AddPaymentMethodForm = () => (
    <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Add New Payment Method</h4>
        <Button variant="ghost" size="sm" onClick={() => setShowAddPayment(false)}>×</Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Payment Type</Label>
          <Select value={newPaymentType} onValueChange={(value: any) => setNewPaymentType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile_money">Mobile Money</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="bank_card">Bank Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {newPaymentType === "mobile_money" && (
          <div className="space-y-3">
            <div>
              <Label>Mobile Money Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                  <SelectItem value="airtel">AirtelTigo Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="233 24 XXX XXXX" />
            </div>
            <div>
              <Label>Account Name</Label>
              <Input placeholder="Account holder name" />
            </div>
          </div>
        )}

        {(newPaymentType === "credit_card" || newPaymentType === "bank_card") && (
          <div className="space-y-3">
            <div>
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input placeholder="123" />
              </div>
            </div>
            <div>
              <Label>Cardholder Name</Label>
              <Input placeholder="John Doe" />
            </div>
            {newPaymentType === "bank_card" && (
              <div>
                <Label>Issuing Bank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gcb">GCB Bank</SelectItem>
                    <SelectItem value="ecobank">Ecobank Ghana</SelectItem>
                    <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                    <SelectItem value="absa">Absa Bank Ghana</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    <SelectItem value="cal">CAL Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={handleAddPaymentMethod} 
          disabled={processingPayment}
          className="w-full"
        >
          {processingPayment ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Add Payment Method"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <span>{userRole === "rider" ? "Payment Gateway" : "Earnings & Payouts"}</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue={userRole === "rider" ? "payment-methods" : "earnings"} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value={userRole === "rider" ? "payment-methods" : "earnings"}>
                {userRole === "rider" ? "Payment Methods" : "Earnings"}
              </TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Payment Methods Tab - For Riders */}
            {userRole === "rider" && (
              <TabsContent value="payment-methods" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Your Payment Methods</h3>
                  <Button onClick={() => setShowAddPayment(true)} className="bg-green-600 hover:bg-green-700">
                    <Wallet className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>

                {showAddPayment && <AddPaymentMethodForm />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPaymentMethod === method.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`} onClick={() => setSelectedPaymentMethod(method.id)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getPaymentIcon(method.type)}
                            <div>
                              <p className="font-semibold">{method.provider}</p>
                              <p className="text-sm text-gray-600">{method.details}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.isDefault && (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                Default
                              </Badge>
                            )}
                            <Badge 
                              variant={method.status === "active" ? "default" : "secondary"}
                              className={method.status === "active" ? "bg-blue-100 text-blue-800" : ""}
                            >
                              {method.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            {method.isDefault ? "Remove Default" : "Set as Default"}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Cash Payment Info */}
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Banknote className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Cash Payment</h4>
                        <p className="text-sm text-orange-700">Pay directly to your driver</p>
                      </div>
                    </div>
                    <p className="text-sm text-orange-600">
                      Cash payments are accepted by most drivers. You can select this option when requesting a ride.
                    </p>
                  </CardContent>
                </Card>

                {/* Payment Credits */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-800">Ride Credits</h4>
                      <span className="text-2xl font-bold text-green-600">GH₵ 50.00</span>
                    </div>
                    <p className="text-sm text-green-700 mb-3">Available balance for your rides</p>
                    <Button variant="outline" size="sm" className="bg-white hover:bg-green-50">
                      Add Credits
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Earnings Tab - For Drivers */}
            {userRole === "driver" && (
              <TabsContent value="earnings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">GH₵ {driverEarnings.today}</div>
                      <div className="text-sm opacity-90">Today's Earnings</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">GH₵ {driverEarnings.thisWeek}</div>
                      <div className="text-sm opacity-90">This Week</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">GH₵ {driverEarnings.thisMonth}</div>
                      <div className="text-sm opacity-90">This Month</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">GH₵ {driverEarnings.totalEarnings}</div>
                      <div className="text-sm opacity-90">Total Earnings</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Method Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Smartphone className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold">Mobile Money</h4>
                      </div>
                      <div className="text-2xl font-bold text-green-600">GH₵ {driverEarnings.mobileMoneyBalance}</div>
                      <p className="text-sm text-gray-600">Ready for payout</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Banknote className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold">Cash Collected</h4>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">GH₵ {driverEarnings.cashBalance}</div>
                      <p className="text-sm text-gray-600">In your possession</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold">Next Payout</h4>
                      </div>
                      <div className="text-lg font-bold text-blue-600">GH₵ {driverEarnings.pendingPayout}</div>
                      <p className="text-sm text-gray-600">{driverEarnings.nextPayoutDate}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payout Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payout Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Mobile Money Payout</span>
                          </div>
                          <Button variant="outline" size="sm">Change</Button>
                        </div>
                        <p className="text-sm text-gray-600">MTN Mobile Money</p>
                        <p className="text-sm text-gray-600">*233 24 123 4567</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Payout Schedule</span>
                          </div>
                          <Button variant="outline" size="sm">Change</Button>
                        </div>
                        <p className="text-sm text-gray-600">Weekly (Mondays)</p>
                        <p className="text-sm text-gray-600">Auto-payout enabled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Transaction History</h3>
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                      <SelectItem value="credit_card">Credit Cards</SelectItem>
                      <SelectItem value="bank_card">Bank Cards</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getPaymentIcon(transaction.paymentType)}
                            {getStatusIcon(transaction.status)}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                            <p className="text-xs text-gray-500">{transaction.method}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            transaction.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {transaction.amount > 0 ? "+" : ""}GH₵ {Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <Badge 
                            variant={
                              transaction.status === "completed" ? "default" : 
                              transaction.status === "pending" ? "secondary" : "destructive"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Payment Analytics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Methods Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Mobile Money</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Banknote className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">Cash</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-8 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Cards</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-3 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">December 2024</span>
                      <span className="font-semibold">GH₵ {userRole === "rider" ? "345.75" : "3,247.80"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">November 2024</span>
                      <span className="font-semibold">GH₵ {userRole === "rider" ? "289.50" : "2,891.45"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">October 2024</span>
                      <span className="font-semibold">GH₵ {userRole === "rider" ? "267.25" : "2,654.20"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h3 className="text-xl font-semibold">Payment Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Transaction PIN</p>
                        <p className="text-sm text-gray-600">Required for payments above GH₵ 100</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-sm text-gray-600">SMS alerts for all transactions</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Auto-Payment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Default Payment Method</p>
                        <p className="text-sm text-gray-600">MTN Mobile Money</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-Pay Limit</p>
                        <p className="text-sm text-gray-600">GH₵ 200 per transaction</p>
                      </div>
                      <Button variant="outline" size="sm">Adjust</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
