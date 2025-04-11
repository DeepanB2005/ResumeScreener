export const VALID_ICONS = [
  'skills',
  'experience',
  'education',
  'projects',
  'certifications',
  'languages',
  'achievements'
] as const;

export type IconName = typeof VALID_ICONS[number];

export const isValidIcon = (name: string): name is IconName => 
  VALID_ICONS.includes(name as IconName);

// Add default export
const IconProvider = {
  VALID_ICONS,
  isValidIcon,
};

export default IconProvider;
