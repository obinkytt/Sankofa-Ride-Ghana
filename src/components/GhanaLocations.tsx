
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, Navigation, Sun, Cloud } from "lucide-react";
import { Location } from "@/types";

interface GhanaLocationsProps {
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}

export default function GhanaLocations({ onLocationSelect, onClose }: GhanaLocationsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const locations = [
    {
      id: 1,
      name: "Kotoka International Airport (ACC)",
      address: "Airport City, Accra",
      category: "airport",
      rating: 4.3,
      estimatedTime: "20-35 min",
      fare: "₵45-65",
      popular: true,
      weatherNote: "Indoor pickup available during rains"
    },
    {
      id: 2,
      name: "Accra Mall",
      address: "Tetteh Quarshie Interchange, Accra",
      category: "shopping",
      rating: 4.5,
      estimatedTime: "15-25 min",
      fare: "₵25-40",
      popular: true,
      weatherNote: "Covered parking available"
    },
    {
      id: 3,
      name: "Independence Arch",
      address: "Independence Avenue, Accra",
      category: "tourism",
      rating: 4.4,
      estimatedTime: "10-20 min",
      fare: "₵15-25",
      popular: true,
      weatherNote: "Open area - check weather"
    },
    {
      id: 4,
      name: "University of Ghana - Legon",
      address: "University of Ghana, Legon, Accra",
      category: "education",
      rating: 4.6,
      estimatedTime: "25-35 min",
      fare: "₵30-45",
      popular: true,
      weatherNote: "Campus shuttle available"
    },
    {
      id: 5,
      name: "Kumasi Central Market (Kejetia)",
      address: "Central Kumasi, Ashanti Region",
      category: "shopping",
      rating: 4.2,
      estimatedTime: "180-240 min",
      fare: "₵180-250",
      popular: false,
      weatherNote: "Long distance - plan ahead"
    },
    {
      id: 6,
      name: "Cape Coast Castle",
      address: "Cape Coast, Central Region",
      category: "tourism",
      rating: 4.8,
      estimatedTime: "120-150 min",
      fare: "₵150-200",
      popular: false,
      weatherNote: "Coastal weather - carry umbrella"
    },
    {
      id: 7,
      name: "Labadi Beach",
      address: "La, Accra",
      category: "tourism",
      rating: 4.3,
      estimatedTime: "25-35 min",
      fare: "₵30-45",
      popular: true,
      weatherNote: "Best visited during dry season"
    },
    {
      id: 8,
      name: "National Theatre",
      address: "Victoriaborg, Accra",
      category: "entertainment",
      rating: 4.4,
      estimatedTime: "15-25 min",
      fare: "₵20-30",
      popular: false,
      weatherNote: "Event times may affect traffic"
    },
    {
      id: 9,
      name: "Osu Castle (Christiansborg)",
      address: "Osu, Accra",
      category: "tourism",
      rating: 4.5,
      estimatedTime: "20-30 min",
      fare: "₵25-35",
      popular: true,
      weatherNote: "Near ocean - sea breeze"
    },
    {
      id: 10,
      name: "Achimota Mall",
      address: "Achimota, Accra",
      category: "shopping",
      rating: 4.1,
      estimatedTime: "30-40 min",
      fare: "₵35-50",
      popular: false,
      weatherNote: "Indoor shopping - weather protected"
    },
    {
      id: 11,
      name: "Tamale Central Hospital",
      address: "Tamale, Northern Region",
      category: "medical",
      rating: 4.0,
      estimatedTime: "300-360 min",
      fare: "₵300-400",
      popular: false,
      weatherNote: "Long distance - check fuel stations"
    },
    {
      id: 12,
      name: "Elmina Castle",
      address: "Elmina, Central Region",
      category: "tourism",
      rating: 4.7,
      estimatedTime: "135-165 min",
      fare: "₵160-220",
      popular: false,
      weatherNote: "Historical site - guided tours available"
    }
  ];

  const categories = [
    { id: "all", name: "All Locations", count: locations.length },
    { id: "airport", name: "Airport", count: locations.filter(l => l.category === "airport").length },
    { id: "shopping", name: "Shopping", count: locations.filter(l => l.category === "shopping").length },
    { id: "entertainment", name: "Entertainment", count: locations.filter(l => l.category === "entertainment").length },
    { id: "education", name: "Education", count: locations.filter(l => l.category === "education").length },
    { id: "medical", name: "Medical", count: locations.filter(l => l.category === "medical").length },
    { id: "tourism", name: "Tourism", count: locations.filter(l => l.category === "tourism").length }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Popular Ghana Destinations</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <Input
              placeholder="Search destinations across Ghana..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{location.name}</h3>
                        {location.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{location.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{location.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-3 h-3" />
                          <span>{location.fare}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {location.weatherNote && (
                    <div className="bg-orange-50 border border-orange-200 rounded p-2 mt-3">
                      <div className="flex items-center space-x-2 text-sm text-orange-700">
                        <Sun className="w-3 h-3" />
                        <span className="font-medium">Travel Note:</span>
                        <span>{location.weatherNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Cloud className="w-4 h-4" />
              <span className="font-medium">Current Weather Advisory:</span>
            </div>
            <p className="text-sm text-gray-600">
              Temperature: 28°C | Partly cloudy with occasional showers expected. Carry an umbrella and allow extra travel time during the rainy season.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
