export type SquawkPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type SquawkStatus = 'OPEN' | 'CLOSED';

export interface Squawk {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: SquawkPriority;
  status: SquawkStatus;
  reported_by: string;
  resolution?: string | null;
  resolved_by?: string | null;
  resolved_at?: string | null;
  attachment_url?: string | null;
  profiles: {
    full_name: string;
  };
}

export interface CreateSquawkData {
  title: string;
  description: string;
  date: string;
  priority: SquawkPriority;
  reported_by: string;
  attachment_url?: string | null;
}

export interface UpdateSquawkData {
  id: string;
  title: string;
  description: string;
  priority: SquawkPriority;
  attachment_url?: string | null;
}

export interface ResolveSquawkData {
  id: string;
  resolution: string;
  resolved_by: string;
}