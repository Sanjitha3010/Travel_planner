import { Destination } from './types';

export const destinations: Destination[] = [
  {
    id: 'ooty',
    name: 'Ooty',
    country: 'India',
    region: 'Tamil Nadu',
    description: 'Known as the "Queen of Hill Stations," Ooty is a picturesque town nestled in the Nilgiri Hills of Tamil Nadu. With its lush tea gardens, serene lakes, botanical gardens, and misty mountains, it offers a perfect escape from the heat. The Nilgiri Mountain Railway, a UNESCO World Heritage Site, is a must-experience attraction.',
    shortDescription: 'Queen of Hill Stations in the Nilgiri Hills',
    image: 'https://images.unsplash.com/photo-1585136917228-c1e74860bae7?w=800&q=80',
    estimatedCost: { min: 5000, max: 15000, currency: 'INR' },
    idealDuration: '3-4 days',
    bestSeason: 'October to June',
    type: ['nature', 'mountain'],
    topAttractions: ['Botanical Gardens', 'Ooty Lake', 'Doddabetta Peak', 'Tea Gardens', 'Nilgiri Mountain Railway', 'Rose Garden', 'Pykara Waterfalls'],
    localCuisine: ['Filter Coffee', 'Homemade Chocolates', 'Varkey Biscuits', 'South Indian Thali', 'Nilgiri Tea'],
    transportInfo: 'Nearest airport is Coimbatore (88 km). Well connected by road and the famous toy train from Mettupalayam.',
    travelTips: ['Carry warm clothing even in summer', 'Book toy train tickets in advance', 'Visit Botanical Gardens early morning', 'Try local chocolate shops in the main market'],
    culture: 'Home to the Toda tribe, one of the oldest indigenous groups in India. The region has a unique blend of colonial British and South Indian culture.',
    coordinates: { lat: 11.4102, lng: 76.6950 },
  },
  {
    id: 'munnar',
    name: 'Munnar',
    country: 'India',
    region: 'Kerala',
    description: 'Munnar is a breathtaking hill station in Kerala, famous for its sprawling tea plantations, exotic wildlife, and mist-covered mountains. Located at the confluence of three mountain streams, it offers stunning views, trekking trails, and a chance to spot the rare Neelakurinji flowers that bloom once every 12 years.',
    shortDescription: 'Tea garden paradise in God\'s Own Country',
    image: 'https://images.unsplash.com/photo-1597584283810-a0741b2a0a63?w=800&q=80',
    estimatedCost: { min: 6000, max: 18000, currency: 'INR' },
    idealDuration: '3-5 days',
    bestSeason: 'September to May',
    type: ['nature', 'mountain', 'adventure'],
    topAttractions: ['Eravikulam National Park', 'Tea Museum', 'Mattupetty Dam', 'Top Station', 'Attukal Waterfalls', 'Echo Point', 'Anamudi Peak'],
    localCuisine: ['Kerala Sadya', 'Appam with Stew', 'Fish Curry', 'Puttu and Kadala', 'Fresh Tea'],
    transportInfo: 'Nearest airport is Cochin International Airport (110 km). Regular bus services from Kochi and other cities.',
    travelTips: ['Best visited during monsoon for lush greenery', 'Carry rain gear', 'Visit tea plantations for fresh tea tasting', 'Book jeep safaris in advance for Eravikulam'],
    culture: 'Rich in Kerala\'s traditional arts and culture. The region is known for spice plantations and Ayurvedic traditions.',
    coordinates: { lat: 10.0889, lng: 77.0595 },
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    region: 'Goa',
    description: 'India\'s smallest state is its biggest party destination. Goa offers a unique blend of Indian and Portuguese cultures, sun-kissed beaches, vibrant nightlife, historic churches, spice plantations, and water sports. From the lively shores of North Goa to the serene beaches of South Goa, there\'s something for every traveller.',
    shortDescription: 'Sun, sand, and the perfect beach getaway',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    estimatedCost: { min: 8000, max: 30000, currency: 'INR' },
    idealDuration: '4-7 days',
    bestSeason: 'November to February',
    type: ['beach', 'cultural', 'adventure'],
    topAttractions: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Fort Aguada', 'Anjuna Flea Market', 'Palolem Beach', 'Spice Plantations'],
    localCuisine: ['Fish Curry Rice', 'Bebinca', 'Vindaloo', 'Xacuti', 'Feni', 'Prawn Balchão'],
    transportInfo: 'Goa has Dabolim International Airport. Well connected by train (Madgaon and Vasco stations) and road.',
    travelTips: ['Rent a scooter for easy travel', 'Visit North Goa for nightlife, South Goa for peace', 'Try water sports at Calangute', 'Visit during off-season for budget travel'],
    culture: 'A fascinating blend of Indian and Portuguese heritage, with colorful churches, temples, and carnival celebrations.',
    coordinates: { lat: 15.2993, lng: 74.1240 },
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    region: 'Rajasthan',
    description: 'The Pink City of India, Jaipur is a vibrant city that seamlessly blends its rich historical legacy with modern life. Home to magnificent forts, opulent palaces, colorful bazaars, and delicious Rajasthani cuisine, Jaipur is a must-visit destination for anyone seeking to experience royal India.',
    shortDescription: 'The majestic Pink City of royal Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    estimatedCost: { min: 7000, max: 25000, currency: 'INR' },
    idealDuration: '3-5 days',
    bestSeason: 'October to March',
    type: ['historical', 'cultural', 'city'],
    topAttractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort', 'Jal Mahal', 'Albert Hall Museum'],
    localCuisine: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Pyaaz Kachori', 'Lassi'],
    transportInfo: 'Jaipur International Airport with domestic and some international flights. Major railway junction. 280 km from Delhi.',
    travelTips: ['Hire a guide at Amber Fort for the best experience', 'Visit forts early morning to avoid crowds', 'Bargain at local bazaars', 'Try a hot air balloon ride'],
    culture: 'Rich Rajput heritage with magnificent architecture, traditional arts like block printing, and vibrant festivals.',
    coordinates: { lat: 26.9124, lng: 75.7873 },
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    region: 'Himachal Pradesh',
    description: 'Nestled in the mountains of Himachal Pradesh, Manali is a popular hill station at the northern end of the Kullu Valley. Known for its adventure activities, ancient temples, stunning landscapes, and as a gateway to Leh-Ladakh, Manali attracts honeymooners, backpackers, and adventure enthusiasts alike.',
    shortDescription: 'Adventure paradise in the Himalayas',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    estimatedCost: { min: 8000, max: 25000, currency: 'INR' },
    idealDuration: '4-6 days',
    bestSeason: 'October to June',
    type: ['mountain', 'adventure', 'nature'],
    topAttractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali', 'Jogini Waterfalls', 'Great Himalayan National Park', 'Atal Tunnel'],
    localCuisine: ['Siddu', 'Trout Fish', 'Dham', 'Babru', 'Tibetan Momos'],
    transportInfo: 'Nearest airport is Bhuntar (50 km). Regular buses from Delhi (12-14 hours). Volvo buses are recommended.',
    travelTips: ['Book Rohtang Pass permits online in advance', 'Carry heavy woolens in winter', 'Try river rafting in Beas River', 'Visit Old Manali for cafes and culture'],
    culture: 'Blend of Hindu and Tibetan Buddhist traditions. Home to ancient wooden temples and local Kullu handicrafts.',
    coordinates: { lat: 32.2396, lng: 77.1887 },
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    description: 'Bali, the Island of Gods, is a tropical paradise that offers an enchanting blend of stunning beaches, terraced rice paddies, ancient temples, vibrant art scenes, and world-class surfing. From the cultural heart of Ubud to the party beaches of Kuta and the cliffside temples of Uluwatu, Bali has something for everyone.',
    shortDescription: 'Island of Gods — temples, beaches, and rice terraces',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    estimatedCost: { min: 40000, max: 120000, currency: 'INR' },
    idealDuration: '5-7 days',
    bestSeason: 'April to October',
    type: ['beach', 'cultural', 'nature', 'spiritual'],
    topAttractions: ['Tanah Lot Temple', 'Ubud Rice Terraces', 'Uluwatu Temple', 'Sacred Monkey Forest', 'Mount Batur', 'Seminyak Beach', 'Tirta Empul'],
    localCuisine: ['Nasi Goreng', 'Babi Guling', 'Sate Lilit', 'Bebek Betutu', 'Fresh Coconut'],
    transportInfo: 'Ngurah Rai International Airport with direct flights from major Indian cities. Local transport by scooter, private car, or Grab.',
    travelTips: ['Rent a scooter for flexibility', 'Respect temple dress codes', 'Visit Ubud for culture, Seminyak for beaches', 'Try a sunrise trek on Mount Batur'],
    culture: 'Unique Hindu-Balinese culture with colorful ceremonies, traditional dances like Kecak, and elaborate temple offerings.',
    coordinates: { lat: -8.3405, lng: 115.0920 },
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    description: 'Tokyo is a mesmerizing blend of ultramodern and traditional, where neon-lit skyscrapers stand alongside historic temples and tranquil gardens. From the bustling streets of Shibuya to the peaceful Meiji Shrine, from world-class sushi to quirky themed cafes, Tokyo offers an unforgettable cultural experience.',
    shortDescription: 'Where ancient tradition meets futuristic innovation',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    estimatedCost: { min: 80000, max: 200000, currency: 'INR' },
    idealDuration: '5-7 days',
    bestSeason: 'March to May, September to November',
    type: ['city', 'cultural', 'historical'],
    topAttractions: ['Senso-ji Temple', 'Shibuya Crossing', 'Meiji Shrine', 'Tokyo Tower', 'Tsukiji Outer Market', 'Akihabara', 'Shinjuku Gyoen'],
    localCuisine: ['Sushi', 'Ramen', 'Tempura', 'Wagyu Beef', 'Matcha Desserts', 'Takoyaki'],
    transportInfo: 'Narita and Haneda airports. Excellent public transport with JR Pass. Trains and subway cover the entire city.',
    travelTips: ['Get a JR Pass for unlimited train travel', 'Try conveyor belt sushi for budget dining', 'Visit Tsukiji market early morning', 'Learn basic Japanese phrases'],
    culture: 'A fascinating blend of ancient Japanese traditions and cutting-edge pop culture, from tea ceremonies to anime.',
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'The City of Light needs no introduction. Paris enchants visitors with its iconic landmarks, world-class museums, romantic ambiance, haute cuisine, and timeless elegance. Every corner reveals architectural beauty, from the Eiffel Tower to the charming lanes of Montmartre.',
    shortDescription: 'The City of Light — romance, art, and elegance',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    estimatedCost: { min: 100000, max: 300000, currency: 'INR' },
    idealDuration: '5-7 days',
    bestSeason: 'April to June, September to November',
    type: ['city', 'cultural', 'romantic', 'historical'],
    topAttractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre', 'Palace of Versailles', 'Seine River Cruise'],
    localCuisine: ['Croissants', 'French Onion Soup', 'Crêpes', 'Escargot', 'Macarons', 'Coq au Vin'],
    transportInfo: 'Charles de Gaulle and Orly airports. Excellent Metro system. TGV high-speed trains connect to other European cities.',
    travelTips: ['Buy a Paris Museum Pass for skip-the-line access', 'Visit the Louvre on Wednesday or Friday evenings', 'Walk along the Seine at sunset', 'Try local bakeries for authentic pastries'],
    culture: 'World capital of art, fashion, and gastronomy. Home to some of the finest museums, galleries, and culinary traditions.',
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function searchDestinations(query: string): Destination[] {
  const lower = query.toLowerCase();
  return destinations.filter(d =>
    d.name.toLowerCase().includes(lower) ||
    d.country.toLowerCase().includes(lower) ||
    d.region.toLowerCase().includes(lower) ||
    d.type.some(t => t.includes(lower))
  );
}

export function filterDestinations(filters: {
  country?: string;
  type?: string;
  maxBudget?: number;
  season?: string;
}): Destination[] {
  return destinations.filter(d => {
    if (filters.country && d.country.toLowerCase() !== filters.country.toLowerCase()) return false;
    if (filters.type && !d.type.includes(filters.type as any)) return false;
    if (filters.maxBudget && d.estimatedCost.min > filters.maxBudget) return false;
    if (filters.season && !d.bestSeason.toLowerCase().includes(filters.season.toLowerCase())) return false;
    return true;
  });
}
