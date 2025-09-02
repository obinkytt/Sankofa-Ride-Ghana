import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, DollarSign } from "lucide-react";
import { rideService } from "@/services/rideService";
import { Ride } from "@/types";
import { useState, useEffect } from "react";

interface RideHistoryProps {
  userRole?: "rider" | "driver" | "admin";
}

export default function RideHistory({ userRole }: RideHistoryProps) {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const { data: rideData, error } = await rideService.getRides(userRole);
        if (error) {
          console.error("Failed to fetch ride history:", error);
          setRides([]);
        } else {
          setRides(rideData || []);
        }
      } catch (error) {
        console.error("Failed to fetch ride history:", error);
        setRides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [userRole]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span>Recent Rides</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="text-gray-600">Loading...</span>
            </div>
          ) : (
            rides.map((ride) => (
              <div key={ride.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{ride.date}</span>
                  <Badge 
                    variant={ride.status === "completed" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {ride.status}
                  </Badge>
                </div>

                <div className="space-y-1 mb-3">
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

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    {userRole === "rider" && ride.driver && (
                      <span className="text-gray-600">Driver: {ride.driver}</span>
                    )}
                    {userRole === "driver" && ride.rider && (
                      <span className="text-gray-600">Rider: {ride.rider}</span>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{ride.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 font-medium text-green-600">
                    <DollarSign className="w-3 h-3" />
                    <span>{ride.fare.replace("$", "₵")}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}