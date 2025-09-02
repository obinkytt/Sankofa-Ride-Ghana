
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Clock, User, Star } from "lucide-react";
import { Ride } from "@/types";

interface DriverDashboardProps {
  onAcceptRide: (ride: Ride) => void;
}

export default function DriverDashboard({ onAcceptRide }: DriverDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequests] = useState([
    {
      id: 1,
      rider: "Akosua Mensah",
      rating: 4.8,
      pickup: "Ring Road East, Accra",
      destination: "University of Ghana, Legon",
      distance: "12.5 km",
      estimatedTime: "8 min",
      fare: "₵28.50",
      status: "requested"
    },
    {
      id: 2,
      rider: "Emmanuel Asante",
      rating: 4.9,
      pickup: "Osu Oxford Street",
      destination: "Accra Mall, Tetteh Quarshie",
      distance: "8.3 km",
      estimatedTime: "6 min",
      fare: "₵22.75",
      status: "requested"
    },
    {
      id: 3,
      rider: "Faridah Ibrahim",
      rating: 4.6,
      pickup: "Labadi Beach Hotel",
      destination: "Kotoka International Airport",
      distance: "15.2 km",
      estimatedTime: "12 min",
      fare: "₵45.25",
      status: "requested"
    }
  ]);

  const handleAcceptRide = (ride: Ride) => {
    onAcceptRide(ride);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Car className="w-5 h-5 text-green-600" />
              <span>Driver Status</span>
            </span>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              {isOnline ? "You're available for rides in Ghana" : "You're offline"}
            </span>
            <Button
              variant={isOnline ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-xs text-gray-600">Rides Today</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">₵186</div>
              <div className="text-xs text-gray-600">Earnings Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Ride Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isOnline ? (
            <div className="text-center py-8 text-gray-500">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Go online to see ride requests</p>
            </div>
          ) : rideRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No ride requests at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rideRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{request.rider}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{request.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {request.fare}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">{request.pickup}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Drop-off:</span>
                      <span className="font-medium">{request.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <span>{request.distance}</span>
                    <span>{request.estimatedTime} away</span>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => handleAcceptRide(request)}
                    size="sm"
                  >
                    Accept Ride
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
