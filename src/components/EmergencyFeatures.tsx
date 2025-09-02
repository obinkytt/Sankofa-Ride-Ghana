import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, Shield, MapPin, Users, Clock } from "lucide-react";
import { Ride } from "@/types";

interface EmergencyFeaturesProps {
  onClose: () => void;
  activeRide?: Ride | null;
}

export default function EmergencyFeatures({ onClose, activeRide }: EmergencyFeaturesProps) {
  const [emergencyContacts] = useState([
    { id: 1, name: "Emergency Services", number: "911", type: "emergency" },
    { id: 2, name: "Sankofa Ride Support", number: "(612) 555-RIDE", type: "support" },
    { id: 3, name: "Mom", number: "(612) 555-0123", type: "personal" },
    { id: 4, name: "Partner", number: "(612) 555-0456", type: "personal" }
  ]);

  const [safetyFeatures] = useState([
    {
      id: 1,
      title: "Share Trip Details",
      description: "Share your ride details with trusted contacts",
      icon: Users,
      active: true
    },
    {
      id: 2,
      title: "Real-time Tracking",
      description: "Allow contacts to track your ride in real-time",
      icon: MapPin,
      active: true
    },
    {
      id: 3,
      title: "Safety Timer",
      description: "Set a timer for expected arrival",
      icon: Clock,
      active: false
    },
    {
      id: 4,
      title: "Route Monitoring",
      description: "Get alerts if your ride goes off the expected route",
      icon: Shield,
      active: true
    }
  ]);

  const handleEmergencyCall = (number: string) => {
    // In a real app, this would initiate a call
    alert(`Calling ${number}...`);
  };

  const handleShareLocation = () => {
    // In a real app, this would share location with emergency contacts
    alert("Location shared with emergency contacts");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Safety & Emergency</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emergency Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Emergency Assistance</h3>
            </div>
            <p className="text-red-700 text-sm mb-4">
              If you're in immediate danger, call 911. For ride-related issues, contact Sankofa Ride support.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleEmergencyCall("911")}
                className="flex-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShareLocation}
                className="flex-1"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Share Location
              </Button>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="space-y-3">
            <h3 className="font-semibold">Emergency Contacts</h3>
            <div className="space-y-2">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      contact.type === "emergency" ? "bg-red-100" :
                      contact.type === "support" ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <Phone className={`w-4 h-4 ${
                        contact.type === "emergency" ? "text-red-600" :
                        contact.type === "support" ? "text-blue-600" : "text-gray-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.number}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEmergencyCall(contact.number)}
                  >
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Features */}
          <div className="space-y-3">
            <h3 className="font-semibold">Safety Features</h3>
            <div className="space-y-3">
              {safetyFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <Badge variant={feature.active ? "default" : "secondary"}>
                      {feature.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Ride Safety */}
          {activeRide && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Current Ride Safety</h3>
              <div className="space-y-2 text-sm text-green-700">
                <p>• Trip details shared with 2 contacts</p>
                <p>• Real-time tracking enabled</p>
                <p>• Driver: John Anderson (4.8★)</p>
                <p>• Vehicle: Honda Accord (MN-ABC123)</p>
                <p>• Expected arrival: 12 minutes</p>
              </div>
            </div>
          )}

          {/* Minnesota-specific Emergency Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Minnesota Emergency Resources</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• Minnesota State Patrol: 651-201-7000</p>
              <p>• Minneapolis Police (Non-Emergency): 311</p>
              <p>• St. Paul Police (Non-Emergency): 651-291-1111</p>
              <p>• Minnesota Crisis Text Line: Text HOME to 741741</p>
              <p>• Minnesota Department of Transportation: 511</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
