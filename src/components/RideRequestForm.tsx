
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Star } from "lucide-react";
import { Ride } from "@/types";

interface RideRequestFormProps {
  onRideRequest: (ride: Ride) => void;
}

export default function RideRequestForm({ onRideRequest }: RideRequestFormProps) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedRideType, setSelectedRideType] = useState("standard");

  const rideTypes = [
    { id: "standard", name: "Standard", price: "25.00", time: "5-10 min", description: "Affordable rides for 1-4 passengers" },
    { id: "premium", name: "Premium", price: "40.00", time: "5-10 min", description: "Higher-end vehicles with extra comfort" },
    { id: "xl", name: "XL", price: "50.00", time: "8-15 min", description: "Larger vehicles for up to 6 passengers" },
    { id: "airport", name: "Airport", price: "65.00", time: "20-35 min", description: "Direct service to Kotoka International Airport" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) return;

    setIsRequesting(true);
    
    setTimeout(() => {
      const selectedType = rideTypes.find(type => type.id === selectedRideType);
      const newRide = {
        id: Date.now(),
        pickup,
        destination,
        status: "requested",
        rideType: selectedType?.name || "Standard",
        estimatedFare: "₵" + (selectedType?.price || "25.00"),
        estimatedTime: selectedType?.time || "5-10 min"
      };
      
      onRideRequest(newRide);
      setIsRequesting(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span>Request a Ride</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>Pickup Location</span>
            </Label>
            <Input
              id="pickup"
              placeholder="Enter pickup address in Ghana"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              disabled={isRequesting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Destination</span>
            </Label>
            <Input
              id="destination"
              placeholder="Where are you going in Ghana?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={isRequesting}
            />
          </div>

          {pickup && destination && (
            <div className="space-y-3">
              <Label>Choose Ride Type</Label>
              <div className="space-y-2">
                {rideTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedRideType === type.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRideType(type.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${selectedRideType === type.id ? "bg-blue-500" : "bg-gray-300"}`}></div>
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">₵{type.price}</div>
                        <div className="text-xs text-gray-500">{type.time}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 ml-5">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!pickup || !destination || isRequesting}
            size="lg"
          >
            {isRequesting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Finding Driver...
              </>
            ) : (
              "Request Ride"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t">
          <h4 className="font-semibold text-sm mb-3">Quick Destinations</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Home", "Work", "Kotoka Airport", "Accra Mall"].map((place) => (
              <Button
                key={place}
                variant="outline"
                size="sm"
                onClick={() => setDestination(place)}
                disabled={isRequesting}
              >
                {place}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-orange-800">
            <Star className="w-4 h-4" />
            <span className="font-medium">Rainy Season Advisory:</span>
          </div>
          <p className="text-xs text-orange-700 mt-1">
            Heavy rains expected this afternoon. Allow extra time for pickup and consider our Premium service for better road handling during storms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}