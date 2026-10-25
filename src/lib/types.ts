// Core types for the Travel Planner application

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  shortDescription: string;
  image: string;
  estimatedCost: { min: number; max: number; currency: string };
  idealDuration: string;
  bestSeason: string;
  type: DestinationType[];
  topAttractions: string[];
  localCuisine: string[];
  transportInfo: string;
  travelTips: string[];
  culture: string;
  coordinates: { lat: number; lng: number };
}

export type DestinationType = 
  | 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' 
  | 'nature' | 'historical' | 'romantic' | 'wildlife' | 'spiritual';

export type TravelStyle = 
  | 'budget' | 'adventure' | 'relaxation' | 'luxury' 
  | 'family' | 'solo' | 'romantic' | 'cultural';

export type Interest = 
  | 'nature' | 'beaches' | 'mountains' | 'history' | 'temples' 
  | 'food' | 'shopping' | 'nightlife' | 'wildlife' | 'photography';

export type AccommodationType = 
  | 'hotel' | 'hostel' | 'resort' | 'homestay' | 'airbnb' | 'camping';

export type TransportMode = 
  | 'flight' | 'train' | 'bus' | 'car' | 'mixed';

export interface TripPreferences {
  startingLocation: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travellers: number;
  budget: number;
  currency: string;
  travelStyle: TravelStyle;
  interests: Interest[];
  transport: TransportMode;
  accommodation: AccommodationType;
  dietaryPreferences: string;
  accessibilityNeeds: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  estimatedCost: number;
  location: string;
  coordinates?: { lat: number; lng: number };
  type: 'attraction' | 'food' | 'transport' | 'shopping' | 'rest';
  tips?: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  meals: {
    breakfast?: { name: string; cuisine: string; estimatedCost: number; location: string };
    lunch?: { name: string; cuisine: string; estimatedCost: number; location: string };
    dinner?: { name: string; cuisine: string; estimatedCost: number; location: string };
  };
  transportationCost: number;
  tips: string[];
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  activities: number;
  shopping: number;
  miscellaneous: number;
  total: number;
  perPerson: number;
  remaining: number;
  savingSuggestions: string[];
}

export interface Trip {
  id: string;
  userId: string;
  preferences: TripPreferences;
  itinerary: ItineraryDay[];
  budget: BudgetBreakdown;
  destination: string;
  status: 'planned' | 'ongoing' | 'completed' | 'draft';
  createdAt: string;
  updatedAt: string;
  shareId?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'toiletries' | 'electronics' | 'documents' | 'medicines' | 'misc';
  packed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tripContext?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: {
    defaultCurrency: string;
    preferredStyles: TravelStyle[];
    dietaryPreferences: string;
  };
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  description: string;
}
