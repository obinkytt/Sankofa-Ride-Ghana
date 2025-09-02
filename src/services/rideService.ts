
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type RideStatus = Database["public"]["Enums"]["ride_status"];

export interface RideRequest {
  pickup_location_text: string;
  destination_location_text: string;
  ride_type?: string;
  estimated_fare?: number;
  scheduled_time?: string;
}

export const rideService = {
  async createRide(rideData: RideRequest) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("rides")
      .insert([
        {
          ...rideData,
          rider_id: user.id,
          status: rideData.scheduled_time ? "scheduled" : "requested",
        },
      ])
      .select()
      .single();

    return { data, error };
  },

  async getRides(userId: string) {
    const { data, error } = await supabase
      .from("rides")
      .select(
        `
        *,
        rider:profiles!rides_rider_id_fkey(full_name, rating),
        driver:profiles!rides_driver_id_fkey(full_name, rating)
      `
      )
      .or(`rider_id.eq.${userId},driver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    return { data, error };
  },

  async getAvailableRides() {
    const { data, error } = await supabase
      .from("rides")
      .select(
        `
        *,
        rider:profiles!rides_rider_id_fkey(full_name, rating)
      `
      )
      .eq("status", "requested")
      .is("driver_id", null)
      .order("created_at", { ascending: true });

    return { data, error };
  },

  async acceptRide(rideId: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("rides")
      .update({
        driver_id: user.id,
        status: "accepted",
      })
      .eq("id", rideId)
      .select()
      .single();

    return { data, error };
  },

  async updateRideStatus(rideId: number, status: RideStatus) {
    const { data, error } = await supabase
      .from("rides")
      .update({ status })
      .eq("id", rideId)
      .select()
      .single();

    return { data, error };
  },

  async cancelRide(rideId: number) {
    const { data, error } = await supabase
      .from("rides")
      .update({ status: "cancelled" })
      .eq("id", rideId)
      .select()
      .single();

    return { data, error };
  },
};

export default rideService;
