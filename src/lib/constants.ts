export const APP_NAME = 'Travel Planner';

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
];

export const TRAVEL_STYLES: { value: string; label: string; icon: string; description: string }[] = [
  { value: 'budget', label: 'Budget', icon: '💰', description: 'Save more, explore more' },
  { value: 'adventure', label: 'Adventure', icon: '🏔️', description: 'Thrilling experiences' },
  { value: 'relaxation', label: 'Relaxation', icon: '🏖️', description: 'Unwind and rejuvenate' },
  { value: 'luxury', label: 'Luxury', icon: '✨', description: 'Premium experiences' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Fun for all ages' },
  { value: 'solo', label: 'Solo', icon: '🎒', description: 'Self-discovery journey' },
  { value: 'romantic', label: 'Romantic', icon: '❤️', description: 'Couples getaway' },
  { value: 'cultural', label: 'Cultural', icon: '🏛️', description: 'Immerse in local culture' },
];

export const INTERESTS: { value: string; label: string; icon: string }[] = [
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'beaches', label: 'Beaches', icon: '🏖️' },
  { value: 'mountains', label: 'Mountains', icon: '⛰️' },
  { value: 'history', label: 'History', icon: '🏛️' },
  { value: 'temples', label: 'Temples', icon: '🛕' },
  { value: 'food', label: 'Food', icon: '🍜' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { value: 'wildlife', label: 'Wildlife', icon: '🦁' },
  { value: 'photography', label: 'Photography', icon: '📸' },
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore Destinations' },
  { href: '/plan', label: 'Plan a Trip' },
  { href: '/trips', label: 'My Trips' },
  { href: '/about', label: 'About' },
];

export const BUDGET_CATEGORIES = [
  { key: 'transportation', label: 'Transportation', icon: '✈️', color: '#3B82F6' },
  { key: 'accommodation', label: 'Accommodation', icon: '🏨', color: '#8B5CF6' },
  { key: 'food', label: 'Food & Drinks', icon: '🍽️', color: '#F59E0B' },
  { key: 'activities', label: 'Activities', icon: '🎯', color: '#10B981' },
  { key: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { key: 'miscellaneous', label: 'Miscellaneous', icon: '📦', color: '#6B7280' },
];
