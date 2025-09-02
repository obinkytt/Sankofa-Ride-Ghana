import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Phone, MessageCircle, Star, Navigation, Clock, User } from "lucide-react";
import { Ride } from "@/types";

interface RideTrackingProps {
  ride: Ride;
  userRole?: "rider" | "driver" | "admin";
  onCancel: () => void;
  onComplete: () => void;
}

export default function RideTracking({ ride, userRole, onCancel, onComplete }: RideTrackingProps) {
  const [rideStatus, setRideStatus] = useState("driver_assigned");
  const [estimatedArrival, setEstimatedArrival] = useState("12 minutes");
  const [currentStep, setCurrentStep] = useState(1);

  const driverInfo = {
    name: "John Anderson",
    rating: 4.8,
    vehicle: "Honda Accord",
    licensePlate: "MN-ABC123",
    phone: "(612) 555-0123"
  };

  const riderInfo = {
    name: "Sarah Johnson",
    rating: 4.9,
    phone: "(612) 555-0456"
  };

  const statusSteps = [
    { id: 1, label: "Driver Assigned", status: "completed" },
    { id: 2, label: "Driver En Route", status: currentStep >= 2 ? "completed" : "pending" },
    { id: 3, label: "Driver Arrived", status: currentStep >= 3 ? "completed" : "pending" },
    { id: 4, label: "In Transit", status: currentStep >= 4 ? "completed" : "pending" },
    { id: 5, label: "Arrived", status: currentStep >= 5 ? "completed" : "pending" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
        
        switch (currentStep) {
          case 1:
            setRideStatus("driver_enroute");
            setEstimatedArrival("2 min");
            break;
          case 2:
            setRideStatus("driver_arrived");
            setEstimatedArrival("Arrived");
            break;
          case 3:
            setRideStatus("in_transit");
            setEstimatedArrival("12 min to destination");
            break;
          case 4:
            setRideStatus("completed");
            setEstimatedArrival("Arrived");
            break;
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "active": return "bg-blue-500";
      default: return "bg-gray-300";
    }
  };

  const contactPerson = userRole === "rider" ? driverInfo : riderInfo;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              <span>Live Tracking</span>
            </span>
            <Badge variant="default" className="animate-pulse">
              {rideStatus === "completed" ? "Completed" : "Active"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                {userRole === "rider" ? "Your driver" : "Passenger"} 
                {rideStatus === "completed" ? " has arrived!" : " is on the way"}
              </span>
              <div className="flex items-center space-x-1 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{estimatedArrival}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 bg-blue-100">
                <User className="w-6 h-6 text-blue-600" />
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{contactPerson.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{contactPerson.rating}</span>
                  {userRole === "rider" && (
                    <>
                      <span>•</span>
                      <span>{driverInfo.vehicle}</span>
                      <span>•</span>
                      <span>{driverInfo.licensePlate}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Trip Progress</h4>
            <div className="space-y-3">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)}`}></div>
                  <span className={`text-sm ${step.status === "completed" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                    {step.label}
                  </span>
                  {step.status === "completed" && index < statusSteps.length - 1 && (
                    <div className="flex-1 h-px bg-green-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">From:</span>
              <span className="font-medium">{ride.pickup}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{ride.destination}</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            {rideStatus !== "completed" && (
              <Button variant="destructive" size="sm" onClick={onCancel} className="flex-1">
                Cancel Ride
              </Button>
            )}
            {rideStatus === "completed" && (
              <Button onClick={onComplete} className="flex-1">
                Rate & Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
