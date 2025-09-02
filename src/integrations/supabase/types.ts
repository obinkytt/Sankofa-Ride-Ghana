export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          role: string
          rating: number | null
          total_rides: number | null
          phone: string | null
          address: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          role?: string | null
          rating?: number | null
          total_rides?: number | null
          phone?: string | null
          address?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          role?: string | null
          rating?: number | null
          total_rides?: number | null
          phone?: string | null
          address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "rides"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "rides"
            referencedColumns: ["rider_id"]
          }
        ]
      }
      rides: {
        Row: {
          id: number
          created_at: string | null
          rider_id: string | null
          driver_id: string | null
          pickup_location_text: string
          destination_location_text: string
          status: Database["public"]["Enums"]["ride_status"] | null
          fare: number | null
          scheduled_time: string | null
          estimated_fare: number | null
          ride_type: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          rider_id?: string | null
          driver_id?: string | null
          pickup_location_text: string
          destination_location_text: string
          status?: Database["public"]["Enums"]["ride_status"] | null
          fare?: number | null
          scheduled_time?: string | null
          estimated_fare?: number | null
          ride_type?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          rider_id?: string | null
          driver_id?: string | null
          pickup_location_text?: string
          destination_location_text?: string
          status?: Database["public"]["Enums"]["ride_status"] | null
          fare?: number | null
          scheduled_time?: string | null
          estimated_fare?: number | null
          ride_type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ride_status: "requested" | "accepted" | "driver_arrived" | "in_transit" | "completed" | "cancelled" | "scheduled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
