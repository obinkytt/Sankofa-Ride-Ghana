import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Car, 
  DollarSign, 
  BarChart3, 
  Shield, 
  MapPin, 
  Search,
  Download,
  AlertTriangle,
  Clock,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
  Edit
} from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - in real app, this would come from your database
  const stats = {
    totalUsers: 1247,
    activeDrivers: 89,
    totalRides: 3456,
    revenue: 45678.90,
    emergencyReports: 3,
    pendingVerifications: 12
  };

  const recentRides = [
    { id: "R001", rider: "John Doe", driver: "Jane Smith", status: "completed", amount: 25.50, time: "2 hours ago" },
    { id: "R002", rider: "Mike Johnson", driver: "Bob Wilson", status: "in-progress", amount: 18.75, time: "30 min ago" },
    { id: "R003", rider: "Sarah Davis", driver: "Tom Brown", status: "cancelled", amount: 0, time: "1 hour ago" },
    { id: "R004", rider: "Lisa Wilson", driver: "Amy Johnson", status: "completed", amount: 32.25, time: "3 hours ago" },
  ];

  const users = [
    { id: "U001", name: "John Doe", email: "john@email.com", role: "rider", status: "active", joinDate: "2024-01-15", rides: 23 },
    { id: "U002", name: "Jane Smith", email: "jane@email.com", role: "driver", status: "active", joinDate: "2024-02-01", rides: 156 },
    { id: "U003", name: "Mike Johnson", email: "mike@email.com", role: "rider", status: "suspended", joinDate: "2024-01-20", rides: 8 },
    { id: "U004", name: "Bob Wilson", email: "bob@email.com", role: "driver", status: "pending", joinDate: "2024-03-10", rides: 0 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      cancelled: "bg-gray-100 text-gray-800"
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>Sankofa Ride Admin Panel</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="rides">
                <Car className="w-4 h-4 mr-2" />
                Rides
              </TabsTrigger>
              <TabsTrigger value="finance">
                <DollarSign className="w-4 h-4 mr-2" />
                Finance
              </TabsTrigger>
              <TabsTrigger value="emergency">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency
              </TabsTrigger>
              <TabsTrigger value="locations">
                <MapPin className="w-4 h-4 mr-2" />
                Locations
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.activeDrivers}</p>
                      </div>
                      <Car className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Rides</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalRides.toLocaleString()}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +15% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-3xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +22% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Emergency Reports</p>
                        <p className="text-3xl font-bold text-red-600">{stats.emergencyReports}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Requires attention
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
                        <p className="text-3xl font-bold text-orange-600">{stats.pendingVerifications}</p>
                      </div>
                      <UserCheck className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-orange-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Awaiting review
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRides.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{ride.id}</p>
                            <p className="text-sm text-gray-600">{ride.rider} → {ride.driver}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusBadge(ride.status)}>
                            {ride.status}
                          </Badge>
                          <p className="font-medium">${ride.amount}</p>
                          <p className="text-sm text-gray-500">{ride.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Users
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{user.role}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getStatusBadge(user.status)}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.rides}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.joinDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <UserX className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs would be implemented similarly */}
            <TabsContent value="rides" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ride Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Comprehensive ride tracking and management tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Revenue analytics and financial reporting tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Emergency response and safety management tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Minnesota service area and destination management tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
