export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          flight_type: string
          pilot_type: string
          title: string
          start_time: string
          end_time: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          flight_type: string
          pilot_type: string
          title: string
          start_time: string
          end_time: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          flight_type?: string
          pilot_type?: string
          title?: string
          start_time?: string
          end_time?: string
          notes?: string | null
          created_at?: string
        }
      }
      // ... other tables remain the same
    }
  }
}