
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { Ride } from "@/types";

interface RideSchedulerProps {
  onScheduleRide: (ride: Ride) => void;
}

export default function RideScheduler({ onScheduleRide }: RideSchedulerProps) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [rideType, setRideType] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  const [scheduledRides] = useState([
    {
      id: 1,
      pickup: "East Legon",
      destination: "Kotoka International Airport",
      date: "Dec 28, 2024",
      time: "6:00 AM",
      type: "Airport",
      fare: "₵65.00",
      status: "confirmed"
    },
    {
      id: 2,
      pickup: "Osu Oxford Street",
      destination: "Accra Mall",
      date: "Dec 30, 2024",
      time: "2:30 PM",
      type: "Standard",
      fare: "₵28.50",
      status: "pending"
    }
  ]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination || !date || !time) return;

    setIsScheduling(true);
    
    setTimeout(() => {
      const newRide = {
        id: Date.now(),
        pickup,
        destination,
        date: format(date, "MMM dd, yyyy"),
        time,
        type: rideType || "Standard",
        status: "scheduled",
        fare: "₵" + (Math.random() * 40 + 15).toFixed(2)
      };
      
      onScheduleRide(newRide);
      setIsScheduling(false);
      setPickup("");
      setDestination("");
      setDate(undefined);
      setTime("");
      setRideType("");
    }, 1500);
  };

  const timeSlots = [
    "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>Schedule a Ride</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  placeholder="Enter pickup address in Ghana"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  disabled={isScheduling}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Where are you going in Ghana?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={isScheduling}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      disabled={isScheduling}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={time} onValueChange={setTime} disabled={isScheduling}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ride Type</Label>
                <Select value={rideType} onValueChange={setRideType} disabled={isScheduling}>
                  <SelectTrigger>
                    <SelectValue placeholder="Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Airport">Airport</SelectItem>
                    <SelectItem value="XL">XL (6 seats)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!pickup || !destination || !date || !time || isScheduling}
              size="lg"
            >
              {isScheduling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Ride
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span>Scheduled Rides</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledRides.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No scheduled rides</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledRides.map((ride) => (
                <div key={ride.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant={ride.status === "confirmed" ? "default" : "secondary"}>
                        {ride.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{ride.type}</span>
                    </div>
                    <span className="font-semibold text-green-600">{ride.fare}</span>
                  </div>

                  <div className="space-y-2 mb-3">
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

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{ride.date} at {ride.time}</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Cancel</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
