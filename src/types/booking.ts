export interface Booking {
  id: string;
  title: string;
  pilot_id: string;
  start_time: string;
  end_time: string;
  notes: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export interface BookingFormData {
  title: string;
  pilotId: string;
  startDate: Date;
  endDate: Date;
  notes: string;
}

export interface BookingSubmitData {
  title: string;
  pilot_id: string;
  start_time: string;
  end_time: string;
  notes: string | null;
}