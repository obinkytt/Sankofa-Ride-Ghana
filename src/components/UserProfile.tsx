import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Star, CreditCard, Shield, Car } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface UserProfileProps {
  userRole: "rider" | "driver" | "admin";
  onClose: () => void;
}

export default function UserProfile({ userRole, onClose }: UserProfileProps) {
  const { user, profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        email: user?.email || "",
        address: profile.address || "",
      });
    }
  }, [profile, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      await refreshProfile();
      setIsEditing(false);
    }
  };

  const [driverInfo] = useState({
    vehicle: "2020 Honda Accord",
    licensePlate: "MN-ABC123",
    licenseNumber: "D123456789",
    insurance: "State Farm - Policy #SF789456",
    backgroundCheck: "Verified",
    earnings: "$2,847.50"
  });

  if (!profile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">Loading profile...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Settings</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              {userRole === "driver" && <TabsTrigger value="vehicle">Vehicle</TabsTrigger>}
              {userRole === "rider" && <TabsTrigger value="preferences">Preferences</TabsTrigger>}
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-20 h-20 bg-blue-100">
                  <User className="w-10 h-10 text-blue-600" />
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.full_name}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{profile.rating || 0} rating</span>
                    <Badge variant="outline">{profile.total_rides || 0} rides</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Member since {new Date(profile.updated_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Methods</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4532</p>
                        <p className="text-sm text-gray-600">Expires 12/26</p>
                      </div>
                    </div>
                    <Badge variant="default">Primary</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 8901</p>
                        <p className="text-sm text-gray-600">Expires 08/27</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add New Payment Method
                </Button>

                {userRole === "driver" && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Earnings Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">This Week</p>
                        <p className="font-bold text-green-600">{driverInfo.earnings}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Payout</p>
                        <p className="font-medium">Monday, Jan 1st</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {userRole === "driver" && (
              <TabsContent value="vehicle" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Car className="w-5 h-5" />
                    <span>Vehicle Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vehicle</Label>
                      <Input value={driverInfo.vehicle} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>License Plate</Label>
                      <Input value={driverInfo.licensePlate} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Driver's License</Label>
                      <Input value={driverInfo.licenseNumber} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Insurance</Label>
                      <Input value={driverInfo.insurance} disabled />
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Verification Status</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Background Check</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehicle Inspection</span>
                        <Badge variant="default">Verified</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {userRole === "rider" && (
              <TabsContent value="preferences" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ride Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Music Preference</p>
                        <p className="text-sm text-gray-600">Let drivers know your music preference</p>
                      </div>
                      <Badge variant="outline">Pop/Rock</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Temperature</p>
                        <p className="text-sm text-gray-600">Preferred cabin temperature</p>
                      </div>
                      <Badge variant="outline">Cool</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Conversation</p>
                        <p className="text-sm text-gray-600">Chat preference during rides</p>
                      </div>
                      <Badge variant="outline">Quiet</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Saved Locations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Home</p>
                            <p className="text-sm text-gray-600">1234 Nicollet Mall, Minneapolis</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-medium">Work</p>
                            <p className="text-sm text-gray-600">800 Nicollet Mall, Minneapolis</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Add New Location</Button>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
