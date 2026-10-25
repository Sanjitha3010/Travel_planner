import { TripPreferences, ItineraryDay, BudgetBreakdown, Activity } from './types';
import { generateId, getDaysBetween, getDateRange } from './utils';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface AIResponse {
  itinerary: ItineraryDay[];
  budget: BudgetBreakdown;
}

export async function generateItinerary(preferences: TripPreferences): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('Gemini API key not configured, using sample itinerary');
    return generateSampleItinerary(preferences);
  }

  try {
    const days = getDaysBetween(preferences.departureDate, preferences.returnDate);
    const prompt = buildItineraryPrompt(preferences, days);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return generateSampleItinerary(preferences);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return generateSampleItinerary(preferences);
    }

    const parsed = JSON.parse(text);
    return transformAIResponse(parsed, preferences);
  } catch (error) {
    console.error('AI generation error:', error);
    return generateSampleItinerary(preferences);
  }
}

function buildItineraryPrompt(preferences: TripPreferences, days: number): string {
  return `You are a professional travel planner AI. Create a detailed ${days}-day travel itinerary based on these preferences:

Destination: ${preferences.destination}
Starting from: ${preferences.startingLocation}
Dates: ${preferences.departureDate} to ${preferences.returnDate}
Travellers: ${preferences.travellers}
Total Budget: ${preferences.budget} ${preferences.currency}
Travel Style: ${preferences.travelStyle}
Interests: ${preferences.interests.join(', ')}
Transport: ${preferences.transport}
Accommodation: ${preferences.accommodation}
Dietary Preferences: ${preferences.dietaryPreferences || 'None specified'}
Accessibility: ${preferences.accessibilityNeeds || 'None specified'}

Return a JSON object with this structure:
{
  "itinerary": [
    {
      "dayNumber": 1,
      "title": "Arrival and Exploration",
      "activities": [
        {
          "name": "Activity name",
          "description": "Brief description",
          "duration": "2 hours",
          "estimatedCost": 500,
          "location": "Specific location",
          "type": "attraction",
          "tips": "Helpful tip",
          "timeSlot": "morning"
        }
      ],
      "meals": {
        "breakfast": { "name": "Restaurant Name", "cuisine": "Type", "estimatedCost": 300, "location": "Area" },
        "lunch": { "name": "Restaurant Name", "cuisine": "Type", "estimatedCost": 500, "location": "Area" },
        "dinner": { "name": "Restaurant Name", "cuisine": "Type", "estimatedCost": 700, "location": "Area" }
      },
      "transportationCost": 200,
      "tips": ["Tip 1", "Tip 2"]
    }
  ],
  "budget": {
    "transportation": 5000,
    "accommodation": 10000,
    "food": 8000,
    "activities": 5000,
    "shopping": 3000,
    "miscellaneous": 2000,
    "savingSuggestions": ["Suggestion 1", "Suggestion 2"]
  }
}

Requirements:
- Make the itinerary realistic with proper time management
- Avoid unnecessary backtracking
- Respect the budget constraint
- Include local food recommendations matching dietary preferences
- All costs should be in ${preferences.currency}
- Include practical travel tips
- Balance activities based on the travel style
- Focus on the specified interests`;
}

function transformAIResponse(parsed: any, preferences: TripPreferences): AIResponse {
  const dates = getDateRange(preferences.departureDate, parsed.itinerary?.length || 1);
  
  const itinerary: ItineraryDay[] = (parsed.itinerary || []).map((day: any, index: number) => ({
    id: generateId(),
    dayNumber: day.dayNumber || index + 1,
    date: dates[index] || preferences.departureDate,
    title: day.title || `Day ${index + 1}`,
    activities: (day.activities || []).map((act: any) => ({
      id: generateId(),
      name: act.name || 'Activity',
      description: act.description || '',
      duration: act.duration || '1 hour',
      estimatedCost: act.estimatedCost || 0,
      location: act.location || preferences.destination,
      type: act.type || 'attraction',
      tips: act.tips || '',
      timeSlot: act.timeSlot || 'morning',
    })),
    meals: day.meals || {},
    transportationCost: day.transportationCost || 0,
    tips: day.tips || [],
  }));

  const budget = parsed.budget || {};
  const total = (budget.transportation || 0) + (budget.accommodation || 0) + 
                (budget.food || 0) + (budget.activities || 0) + 
                (budget.shopping || 0) + (budget.miscellaneous || 0);

  return {
    itinerary,
    budget: {
      transportation: budget.transportation || 0,
      accommodation: budget.accommodation || 0,
      food: budget.food || 0,
      activities: budget.activities || 0,
      shopping: budget.shopping || 0,
      miscellaneous: budget.miscellaneous || 0,
      total,
      perPerson: Math.round(total / preferences.travellers),
      remaining: preferences.budget - total,
      savingSuggestions: budget.savingSuggestions || [],
    },
  };
}

export function generateSampleItinerary(preferences: TripPreferences): AIResponse {
  const days = Math.max(1, getDaysBetween(preferences.departureDate, preferences.returnDate));
  const dates = getDateRange(preferences.departureDate, days);
  const dailyBudget = Math.round(preferences.budget / days);
  const dest = preferences.destination || 'your destination';

  const sampleActivities: Record<string, Activity[]> = {
    morning: [
      { id: generateId(), name: `Explore ${dest} Old Town`, description: `Walk through the historic streets and markets of ${dest}, discovering local architecture and culture`, duration: '2-3 hours', estimatedCost: Math.round(dailyBudget * 0.05), location: `${dest} Old Town`, type: 'attraction', tips: 'Start early to avoid crowds and heat', timeSlot: 'morning' },
      { id: generateId(), name: `Visit ${dest} Heritage Site`, description: `Explore the most iconic landmark and learn about the rich history and heritage`, duration: '2 hours', estimatedCost: Math.round(dailyBudget * 0.08), location: `${dest} Main Heritage Area`, type: 'attraction', tips: 'Hire a local guide for detailed insights', timeSlot: 'morning' },
    ],
    afternoon: [
      { id: generateId(), name: `${dest} Nature Experience`, description: `Enjoy the natural beauty and scenic landscapes around ${dest}`, duration: '3 hours', estimatedCost: Math.round(dailyBudget * 0.1), location: `${dest} Scenic Area`, type: 'attraction', tips: 'Carry water and sunscreen', timeSlot: 'afternoon' },
      { id: generateId(), name: 'Local Market & Shopping', description: 'Browse local handicrafts, souvenirs, and traditional goods', duration: '2 hours', estimatedCost: Math.round(dailyBudget * 0.12), location: `${dest} Main Market`, type: 'shopping', tips: 'Bargaining is expected at local markets', timeSlot: 'afternoon' },
    ],
    evening: [
      { id: generateId(), name: `Sunset Point at ${dest}`, description: `Watch a stunning sunset from one of the best viewpoints in ${dest}`, duration: '1.5 hours', estimatedCost: Math.round(dailyBudget * 0.02), location: `${dest} Viewpoint`, type: 'attraction', tips: 'Arrive 30 minutes before sunset for the best spot', timeSlot: 'evening' },
      { id: generateId(), name: 'Cultural Evening Experience', description: 'Enjoy local cultural performances, music, and dance', duration: '2 hours', estimatedCost: Math.round(dailyBudget * 0.08), location: `${dest} Cultural Center`, type: 'attraction', tips: 'Check local event schedules', timeSlot: 'evening' },
    ],
  };

  const itinerary: ItineraryDay[] = dates.map((date, index) => {
    const isFirstDay = index === 0;
    const isLastDay = index === days - 1;
    
    let title: string;
    if (isFirstDay) title = `Arrival in ${dest} — Welcome & First Impressions`;
    else if (isLastDay) title = `Farewell ${dest} — Last Explorations & Departure`;
    else title = `Day ${index + 1} — Discovering ${dest}'s Hidden Gems`;

    const morningAct = sampleActivities.morning[index % sampleActivities.morning.length];
    const afternoonAct = sampleActivities.afternoon[index % sampleActivities.afternoon.length];
    const eveningAct = sampleActivities.evening[index % sampleActivities.evening.length];

    return {
      id: generateId(),
      dayNumber: index + 1,
      date,
      title,
      activities: [
        { ...morningAct, id: generateId() },
        { ...afternoonAct, id: generateId() },
        { ...eveningAct, id: generateId() },
      ],
      meals: {
        breakfast: { name: 'Local Breakfast Spot', cuisine: 'Local', estimatedCost: Math.round(dailyBudget * 0.06), location: `Near ${dest} Hotel` },
        lunch: { name: 'Popular Local Restaurant', cuisine: 'Regional', estimatedCost: Math.round(dailyBudget * 0.1), location: `${dest} Food Street` },
        dinner: { name: 'Recommended Dinner Place', cuisine: 'Local Specialty', estimatedCost: Math.round(dailyBudget * 0.12), location: `${dest} Main Area` },
      },
      transportationCost: Math.round(dailyBudget * 0.08),
      tips: isFirstDay 
        ? ['Arrive early and check into your accommodation', 'Exchange currency if needed', 'Get a local SIM card for connectivity']
        : isLastDay 
          ? ['Pack your bags the night before', 'Buy last-minute souvenirs', 'Keep buffer time for transport delays']
          : ['Start your day early to cover more attractions', 'Stay hydrated and carry snacks', 'Respect local customs and dress codes'],
    };
  });

  const transportBudget = Math.round(preferences.budget * 0.20);
  const accommodationBudget = Math.round(preferences.budget * 0.30);
  const foodBudget = Math.round(preferences.budget * 0.20);
  const activitiesBudget = Math.round(preferences.budget * 0.15);
  const shoppingBudget = Math.round(preferences.budget * 0.08);
  const miscBudget = Math.round(preferences.budget * 0.07);
  const total = transportBudget + accommodationBudget + foodBudget + activitiesBudget + shoppingBudget + miscBudget;

  return {
    itinerary,
    budget: {
      transportation: transportBudget,
      accommodation: accommodationBudget,
      food: foodBudget,
      activities: activitiesBudget,
      shopping: shoppingBudget,
      miscellaneous: miscBudget,
      total,
      perPerson: Math.round(total / preferences.travellers),
      remaining: preferences.budget - total,
      savingSuggestions: [
        'Consider staying in hostels or homestays to reduce accommodation costs',
        'Use public transportation instead of private cabs',
        'Eat at local street food stalls for authentic and affordable meals',
        'Visit free attractions like parks, temples, and local markets',
        'Book transportation and accommodation in advance for better deals',
        'Travel during off-season for lower prices',
      ],
    },
  };
}

export async function chatWithAI(
  message: string,
  tripContext?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return generateSampleChatResponse(message);
  }

  try {
    const prompt = `You are a helpful AI travel assistant for a travel planning app called "Travel Planner". 
${tripContext ? `Current trip context: ${tripContext}` : ''}

User message: ${message}

Provide helpful, structured travel advice. Include practical tips, estimated costs, and specific recommendations. 
Format your response with clear sections and bullet points where appropriate.
Keep your response concise but informative.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      return generateSampleChatResponse(message);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || generateSampleChatResponse(message);
  } catch (error) {
    console.error('Chat AI error:', error);
    return generateSampleChatResponse(message);
  }
}

function generateSampleChatResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap') || lower.includes('save')) {
    return `💰 **Budget Tips for Your Trip**

Here are some ways to save on your trip:

• **Accommodation**: Consider homestays, hostels, or budget hotels. Booking in advance often gets better rates.
• **Food**: Eat at local eateries and street food stalls for authentic and affordable meals.
• **Transport**: Use public transportation, share cabs, or rent a scooter for short distances.
• **Activities**: Many attractions have free or discounted entry on certain days.
• **Shopping**: Visit local markets and practice polite bargaining.

*Note: These are general suggestions. Connect your Gemini API key for personalized budget advice.*`;
  }
  
  if (lower.includes('family') || lower.includes('kids') || lower.includes('children')) {
    return `👨‍👩‍👧‍👦 **Family-Friendly Travel Tips**

Here are some suggestions for traveling with family:

• **Accommodation**: Look for family rooms or serviced apartments with kitchens.
• **Activities**: Choose interactive museums, parks, and kid-friendly attractions.
• **Dining**: Opt for restaurants with children's menus and comfortable seating.
• **Schedule**: Don't pack too many activities — allow for rest and flexibility.
• **Safety**: Keep a first aid kit and necessary medications handy.

*Note: These are general suggestions. Connect your Gemini API key for personalized recommendations.*`;
  }

  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('vegetarian')) {
    return `🍽️ **Food & Dining Recommendations**

Here are some dining tips for your trip:

• **Local Cuisine**: Always try the local specialty dishes — they're freshest and most affordable.
• **Street Food**: Some of the best food experiences come from street vendors and local markets.
• **Vegetarian Options**: Most destinations have vegetarian restaurants. Look for local vegetarian thali options.
• **Budget Dining**: Lunch menus are often cheaper than dinner at the same restaurant.
• **Food Safety**: Drink bottled water and eat at popular, busy establishments.

*Note: These are general suggestions. Connect your Gemini API key for specific restaurant recommendations.*`;
  }

  return `🌍 **Travel Planner Assistant**

Thank you for your question! Here are some general tips:

• I can help you plan trips, suggest destinations, create itineraries, and manage budgets.
• For personalized AI-powered responses, add your Gemini API key in the environment variables.
• You can ask me about destinations, budget planning, food recommendations, and travel tips.

**Try asking me:**
- "Plan a 3-day trip to Goa under ₹15,000"
- "What are the best places to visit in Kerala?"
- "Suggest budget-friendly activities in Jaipur"
- "Help me reduce my travel expenses"

*Currently running with sample responses. Add your GEMINI_API_KEY for AI-powered answers.*`;
}
