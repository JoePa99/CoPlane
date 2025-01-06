export interface FlightLog {
  id: string;
  date: string;
  pilot_id: string;
  departure_airport: string;
  arrival_airport: string;
  hobbs_start: number;
  hobbs_end: number;
  description: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export interface CreateFlightLogData {
  date: string;
  pilot_id: string;
  departure_airport: string;
  arrival_airport: string;
  hobbs_start: number;
  hobbs_end: number;
  description?: string | null;
}