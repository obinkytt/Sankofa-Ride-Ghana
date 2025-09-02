
export interface Ride {
  id: number | string;
  pickup: string;
  destination: string;
  status: string;
  rideType?: string;
  estimatedFare?: string;
  estimatedTime?: string;
  date?: string;
  time?: string;
  type?: string;
  fare?: string;
  driver?: string | null;
  rider?: string | null;
  rating?: number;
  distance?: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  category: string;
  rating: number;
  estimatedTime: string;
  fare: string;
  popular: boolean;
  weatherNote: string;
}