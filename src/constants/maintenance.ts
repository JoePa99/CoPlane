export const MAINTENANCE_TYPES = [
  'Annual Inspection',
  'Oil Change',
  'Engine Inspection',
  'Avionics Check',
  'Propeller Service',
  'Landing Gear',
  'Other'
] as const;

export type MaintenanceType = typeof MAINTENANCE_TYPES[number];