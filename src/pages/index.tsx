
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Navigation, Bell, Settings, Calendar, History, DollarSign, Shield, CreditCard, User, Car, Clock, Send, MapIcon } from "lucide-react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import RideRequestForm from "@/components/RideRequestForm";
import DriverDashboard from "@/components/DriverDashboard";
import RideHistory from "@/components/RideHistory";
import UserProfile from "@/components/UserProfile";
import RideScheduler from "@/components/RideScheduler";
import NotificationCenter from "@/components/NotificationCenter";
import RideTracking from "@/components/RideTracking";
import PaymentSystem from "@/components/PaymentSystem";
import EmergencyFeatures from "@/components/EmergencyFeatures";
import GhanaLocations from "@/components/GhanaLocations";
import DeploymentHelper from "@/components/DeploymentHelper";
import AdminPanel from "@/components/AdminPanel";
import { Ride } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";
import AuthForm from "@/components/AuthForm";
import TestAuthFlow from "@/components/TestAuthFlow";

export default function HomePage() {
  const { session, userRole, loading } = useAuth();
  const isAuthenticated = !!session;

  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showDeploymentHelper, setShowDeploymentHelper] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("ride");
  const [showAuth, setShowAuth] = useState(false);
  const [authRole, setAuthRole] = useState<"rider" | "driver">("rider");

  const handleLogout = async () => {
    try {
      console.log("Testing logout - Current session:", session?.user?.email);
      console.log("Testing logout - Current role:", userRole);
      
      await authService.signOut();
      
      // Reset all local state after logout
      setActiveRide(null);
      setShowProfile(false);
      setShowNotifications(false);
      setShowPayments(false);
      setShowEmergency(false);
      setShowLocations(false);
      setShowAdminPanel(false);
      setActiveTab("ride");
      setShowAuth(false);
      
      console.log("Logout completed successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleRideRequest = (ride: Ride) => {
    setActiveRide(ride);
    setActiveTab("tracking");
  };

  const handleScheduleRide = (ride: Ride) => {
    console.log("Ride scheduled:", ride);
  };

  const handleLocationSelect = (location: string) => {
    console.log("Location selected:", location);
  };

  const handleRoleSelection = (role: "rider" | "driver") => {
    setAuthRole(role);
    setShowAuth(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Sankofa Ride...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not authenticated and not showing auth
  if (!isAuthenticated && !showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Sankofa Ride</h1>
                </div>
                <span className="text-sm text-gray-500">Ghana's Ride Share</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => setShowAuth(true)}>
                  Login
                </Button>
                <Button 
                  onClick={() => setShowAuth(true)}
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sankofa Ride
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-4">
              Ghana's Premier Ride-Sharing Service
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Connecting communities across Accra, Kumasi, Tamale and beyond
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Rider Card */}
            <Card 
              className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0"
              onClick={() => handleRoleSelection("rider")}
            >
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  I need a ride
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Request a ride and get picked up by a verified driver in Ghana
                </p>
                <Button 
                  className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-full text-lg font-medium"
                  onClick={() => handleRoleSelection("rider")}
                >
                  Continue as Rider
                </Button>
              </CardContent>
            </Card>

            {/* Driver Card */}
            <Card 
              className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0"
              onClick={() => handleRoleSelection("driver")}
            >
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  I want to drive
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Start earning by giving rides to people across Ghana
                </p>
                <Button 
                  className="w-full h-12 bg-white text-black border-2 border-gray-200 hover:bg-gray-50 rounded-full text-lg font-medium"
                  onClick={() => handleRoleSelection("driver")}
                >
                  Continue as Driver
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Nationwide Coverage</h4>
              <p className="text-gray-600">
                Serving Accra, Kumasi, Tamale, Cape Coast, and all major cities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 Service</h4>
              <p className="text-gray-600">
                Available around the clock, rain or shine across Ghana
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Safe & Reliable</h4>
              <p className="text-gray-600">
                Background-checked drivers and real-time tracking
              </p>
            </div>
          </div>

          {/* Popular Destinations */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Popular Ghana Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <h5 className="font-semibold text-gray-900">Kotoka Airport</h5>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <h5 className="font-semibold text-gray-900">Accra Mall</h5>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <h5 className="font-semibold text-gray-900">Independence Arch</h5>
                </div>
                <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <h5 className="font-semibold text-gray-900">University of Ghana</h5>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show auth form if selected
  if (showAuth && !isAuthenticated) {
    return <AuthForm initialRole={authRole} onBack={() => setShowAuth(false)} />;
  }

  const getTitle = () => {
    if (userRole === "admin") return "Admin Dashboard";
    if (userRole === "rider") return "Your Rides";
    return "Driver Hub";
  };

  const getDescription = () => {
    if (userRole === "admin") return "Manage users, monitor rides, and oversee platform operations";
    if (userRole === "rider") return "Request rides, schedule trips, and track your journey";
    return "Manage ride requests and track your earnings";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
        userRole={userRole}
        onAdminClick={() => setShowAdminPanel(true)}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {getTitle()}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {getDescription()}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowDeploymentHelper(true)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 px-4 py-2 text-sm md:text-base"
              >
                🚀 Fix Deployment
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowNotifications(true)}
                className="relative px-4 py-2"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowPayments(true)}
                className="px-4 py-2"
              >
                <CreditCard className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowEmergency(true)}
                className="px-4 py-2"
              >
                <Shield className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowProfile(true)}
                className="px-4 py-2"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView userRole={userRole} activeRide={activeRide} />
          </div>
          
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12 text-xs md:text-sm">
                <TabsTrigger value="ride" className="px-2">
                  {userRole === "rider" ? "Request" : "Requests"}
                </TabsTrigger>
                <TabsTrigger value="schedule" className="px-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="px-1">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Track</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="px-1">
                  <History className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ride" className="space-y-4 mt-4">
                {userRole === "rider" ? (
                  <>
                    <RideRequestForm onRideRequest={handleRideRequest} />
                    <Button 
                      variant="outline" 
                      className="w-full h-12 text-base"
                      onClick={() => setShowLocations(true)}
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Browse Ghana Destinations
                    </Button>
                  </>
                ) : (
                  <DriverDashboard onAcceptRide={setActiveRide} />
                )}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4 mt-4">
                <RideScheduler onScheduleRide={handleScheduleRide} />
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4 mt-4">
                {activeRide ? (
                  <RideTracking 
                    ride={activeRide} 
                    userRole={userRole} 
                    onCancel={() => setActiveRide(null)}
                    onComplete={() => {
                      setActiveRide(null);
                      setActiveTab("history");
                    }}
                  />
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Navigation className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-500 text-base">No active rides to track</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <RideHistory userRole={userRole} />
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-base"
                  onClick={() => setShowPayments(true)}
                >
                  <DollarSign className="w-5 h-5 mr-3" />
                  {userRole === "rider" ? "Payment & Billing" : "Earnings & Payouts"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-base"
                  onClick={() => setShowEmergency(true)}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Safety & Emergency
                </Button>
                {userRole === "rider" && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-base"
                    onClick={() => setShowLocations(true)}
                  >
                    <MapPin className="w-5 h-5 mr-3" />
                    Ghana Destinations
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      {showProfile && userRole && (
        <UserProfile 
          userRole={userRole} 
          onClose={() => setShowProfile(false)} 
        />
      )}

      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {showPayments && userRole && (
        <PaymentSystem 
          userRole={userRole}
          onClose={() => setShowPayments(false)} 
        />
      )}

      {showEmergency && (
        <EmergencyFeatures 
          onClose={() => setShowEmergency(false)}
          activeRide={activeRide}
        />
      )}

      {showDeploymentHelper && (
        <DeploymentHelper onClose={() => setShowDeploymentHelper(false)} />
      )}

      {showAdminPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Admin Panel & Authentication Testing</h2>
                <Button variant="ghost" onClick={() => setShowAdminPanel(false)}>
                  ✕
                </Button>
              </div>
              
              {/* Authentication Testing Section */}
              <div className="mb-8">
                <TestAuthFlow />
              </div>
              
              {/* Admin Panel */}
              <AdminPanel onClose={() => setShowAdminPanel(false)} />
            </div>
          </div>
        </div>
      )}

      {showLocations && (
        <GhanaLocations 
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowLocations(false)}
        />
      )}
    </div>
  );
}