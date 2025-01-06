export const PILOT_TYPES = [
  { id: 'joe', label: 'Joe Flight', color: 'bg-orange-500' },
  { id: 'sean', label: 'Sean Flight', color: 'bg-blue-500' },
  { id: 'other', label: 'Other', color: 'bg-gray-900' }
] as const;

export type PilotType = typeof PILOT_TYPES[number]['id'];

export const getPilotColor = (pilotType: PilotType): string => {
  return PILOT_TYPES.find(p => p.id === pilotType)?.color || 'bg-gray-900';
};