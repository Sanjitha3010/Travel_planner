/**
 * Travel Planner — Vanilla JavaScript Logic
 * Features:
 *  - Destinations database & dynamic Explore rendering
 *  - Interactive Trip Planning Form & Validation
 *  - Dynamic Day-by-Day Itinerary Generator (Morning, Afternoon, Evening)
 *  - Automatic Budget Calculator & Breakdown in INR (₹)
 *  - LocalStorage Persistence for "My Trip"
 *  - Print / Save as PDF handler
 *  - Regenerate, Edit, and Clear trip interactions
 */

// ==========================================================================
// 1. Destinations Database
// ==========================================================================
const DESTINATIONS_DATA = [
  {
    id: 'ooty',
    name: 'Ooty',
    location: 'Tamil Nadu, India',
    category: 'mountains',
    title: 'The Queen of Hill Stations',
    description: 'Nestled in the Nilgiri Hills with sprawling tea plantations, colonial charm, cool mountain breezes, and the iconic toy train.',
    bestTime: 'October to March',
    budgetRange: '₹12,000 - ₹22,000 / person',
    baseCosts: { transport: 3500, hotelPerNight: 2800, foodPerDay: 900, activityPerDay: 700 },
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    tags: ['Hill Station', 'Tea Gardens', 'Nature'],
    popular: true,
    spots: ['Doddabetta Peak', 'Botanical Gardens', 'Pykara Lake & Falls', 'Nilgiri Mountain Railway', 'Rose Garden', 'Avalanche Lake', 'Tea Factory & Museum'],
    curatedDays: [
      {
        theme: 'Arrival, Colonial Heritage & Botanical Splendor',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Nilgiri Mountain Toy Train & Arrival', desc: 'Arrive via the UNESCO heritage toy train journey through misty tunnels, bridges, and lush Nilgiri pine hills.', place: 'Nilgiri Mountain Railway Station' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Stroll Through Government Botanical Gardens', desc: 'Walk among 1,000+ exotic floral species, manicured Italian terraces, and the 20-million-year-old fossil tree trunk.', place: 'Botanical Gardens, Vannarapettai' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Boating on Ooty Lake & Homemade Chocolates', desc: 'Enjoy peaceful paddle boating on Ooty Lake, followed by tasting fresh fudge and homemade artisan chocolates on Commercial Road.', place: 'Ooty Lake & Commercial Road' }
      },
      {
        theme: 'Panoramic Peaks, Tea Terraces & Forest Waterfalls',
        morning: { time: '08:30 AM - 12:00 PM', title: 'Sunrise Views from Doddabetta Peak', desc: 'Head to the highest vantage point in the Nilgiris (2,637 m) for breathtaking panoramic valley vistas with the telescope house.', place: 'Doddabetta Peak Viewpoint' },
        afternoon: { time: '01:00 PM - 04:30 PM', title: 'Tea Plantation Walk & Factory Experience', desc: 'Learn the craft of CTC and orthodox tea making, sample fragrant Nilgiri green tea, and hike among emerald slope estates.', place: 'Dodabetta Tea Factory & Museum' },
        evening: { time: '05:00 PM - 08:00 PM', title: 'Pykara Lake Boating & Sunset Cascades', desc: 'Catch the golden hour speedboat ride across the tranquil Pykara reservoir and walk down to Pykara waterfalls.', place: 'Pykara Dam & Lake' }
      },
      {
        theme: 'Untouched Wilderness & Serene Lakes',
        morning: { time: '08:00 AM - 12:30 PM', title: 'Eco-Safari at Avalanche Lake', desc: 'Trek through pristine shola grasslands, trout-filled streams, and cloud-draped pine woods inside the biosphere reserve.', place: 'Avalanche Forest Reserve' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Emerald Lake & Village Stroll', desc: 'Relax by the tranquil waters of Emerald Lake away from crowds; picnic on scenic grassy banks amidst tea hills.', place: 'Emerald Lake, Silent Valley' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Rose Garden & Warm Bonfire Dinner', desc: 'Admire South Asia’s largest rose collection featuring 20,000+ varieties, followed by a warm Nilgiri dinner by the fireplace.', place: 'Government Rose Garden' }
      }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    location: 'Goa, India',
    category: 'beaches',
    title: 'Sun, Sand & Portuguese Charm',
    description: 'Golden sandy beaches, vibrant seaside shacks, historic UNESCO churches, spice plantations, and unforgettable crimson sunsets.',
    bestTime: 'November to February',
    budgetRange: '₹14,000 - ₹28,000 / person',
    baseCosts: { transport: 4200, hotelPerNight: 3400, foodPerDay: 1200, activityPerDay: 900 },
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tags: ['Beaches', 'Nightlife', 'Seafood', 'Heritage'],
    popular: true,
    spots: ['Baga & Calangute Beach', 'Fort Aguada', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Anjuna Flea Market', 'Mandovi River Cruise', 'Palolem Beach'],
    curatedDays: [
      {
        theme: 'North Goa Coastal Vibes & Fort Sunset',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Check-in & Calangute Beach Stroll', desc: 'Dip your feet into the Arabian Sea waves, relax on sun loungers, and enjoy fresh coconut water under coconut palms.', place: 'Calangute Beach' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Seaside Shack Lunch & Water Sports', desc: 'Savor Goan fish curry, prawn balchao, and try thrilling parasailing or jet skiing at Baga beach.', place: 'Baga Beach Water Sports Center' },
        evening: { time: '05:15 PM - 08:30 PM', title: '17th Century Fort Aguada & Lighthouse Sunset', desc: 'Explore the Portuguese coastal fortress with panoramic ocean views, followed by live music at a beachside bistro.', place: 'Fort Aguada, Sinquerim' }
      },
      {
        theme: 'Latin Quarters, Old Goa Churches & Sunset Cruise',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Old Goa UNESCO World Heritage Churches', desc: 'Marvel at baroque architecture inside Basilica of Bom Jesus (relics of St. Francis Xavier) and Se Cathedral.', place: 'Old Goa Heritage Complex' },
        afternoon: { time: '01:00 PM - 04:00 PM', title: 'Walk Through Fontainhas Latin Quarter', desc: 'Photowalk along pastel yellow and indigo Portuguese villas, antique wooden balconies, and boutique cafes in Panaji.', place: 'Fontainhas, Panaji' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Mandovi River Sunset Cruise & Folk Dance', desc: 'Board an evening cruise featuring Goan Dekhnni and Fugdi folk dance performances as the sun sets over the estuary.', place: 'Mandovi River Jetty' }
      },
      {
        theme: 'Cascading Waterfalls & Spice Plantation Fragrance',
        morning: { time: '07:30 AM - 12:30 PM', title: 'Jeep Safari to Dudhsagar Waterfalls', desc: 'Adventurous 4x4 off-road ride through Bhagwan Mahavir Wildlife Sanctuary to the thunderous 4-tiered milky waterfall.', place: 'Dudhsagar Falls' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Traditional Spice Plantation Tour & Buffet', desc: 'Guided aroma walk identifying cardamoms, cinnamon, peri-peri, followed by a buffet lunch served on banana leaves.', place: 'Sahakari Spice Farm, Ponda' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Sunset at Anjuna Beach & Flea Market', desc: 'Browse bohemian jewelry, handcrafted leather goods, and enjoy chilled beverages watching the red sun sink into the sea.', place: 'Anjuna Beach' }
      }
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    location: 'Himachal Pradesh, India',
    category: 'mountains',
    title: 'Himalayan Wonderland & Snow Valley',
    description: 'Dramatic snow-capped peaks, gushing Beas River, pine forests, hot sulfur springs, and thrilling adventure sports in Solang Valley.',
    bestTime: 'October to June',
    budgetRange: '₹15,000 - ₹30,000 / person',
    baseCosts: { transport: 4500, hotelPerNight: 3200, foodPerDay: 1000, activityPerDay: 1100 },
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Snow', 'Rivers'],
    popular: true,
    spots: ['Solang Valley', 'Hadimba Temple', 'Rohtang Pass', 'Jogini Waterfalls', 'Old Manali Cafes', 'Vashisht Hot Springs', 'Atal Tunnel'],
    curatedDays: [
      {
        theme: 'Cedar Forests, Ancient Shrines & Cafe Culture',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Cedar Forest Walk & 1553 Hadimba Temple', desc: 'Visit the four-tiered wooden pagoda temple set within centuries-old giant deodar cedar woodlands of Dhungri.', place: 'Hadimba Devi Temple' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Riverside Walk & Old Manali Bohemian Cafes', desc: 'Sample wood-fired trout pizza, apple strudel, and local Himachal Siddu in cozy alpine riverside cafes.', place: 'Old Manali Village & Manu Temple' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Vashisht Hot Springs & Mall Road Shopping', desc: 'Dip into natural mineral hot springs with therapeutic waters, then browse Kullu shawls and woolens on Mall Road.', place: 'Vashisht Village & Mall Road' }
      },
      {
        theme: 'Solang Valley Thrills & High Mountain Tunnel',
        morning: { time: '08:30 AM - 01:00 PM', title: 'Solang Valley Adventure & Paragliding', desc: 'Experience tandem paragliding over alpine meadows, ATV rides, zorbing, and ropeway cable car rides.', place: 'Solang Adventure Valley' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Atal Tunnel Drive to Sissu Waterfall', desc: 'Drive through the world-famous 9 km engineering marvel under Rohtang Pass to witness the dramatic cliffs of Lahaul Valley.', place: 'Atal Tunnel & Sissu Falls' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Riverfront Sunset by Beas River', desc: 'Listen to the roaring glacial currents of the Beas River, sip hot ginger tea, and stargaze under crystal-clear skies.', place: 'Beas River Banks' }
      },
      {
        theme: 'Trek to Cascades & Scenic Mountain Hamlets',
        morning: { time: '08:30 AM - 12:30 PM', title: 'Scenic Trek to Jogini Waterfalls', desc: 'A gentle mountain trek through apple orchards and pine groves ending at the breathtaking spray of Jogini falls.', place: 'Jogini Falls Trail' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Naggar Castle & Roerich Art Gallery', desc: 'Explore the 500-year-old timber and stone fortress overlooking the Beas valley and Nicholas Roerich estate.', place: 'Naggar Castle' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Traditional Himachali Dham Feast & Campfire', desc: 'Relish an authentic multi-course Himachali festive dinner featuring Madra and Babru around a warm crackling hearth.', place: 'Traditional Manali Haven' }
      }
    ]
  },
  {
    id: 'munnar',
    name: 'Munnar',
    location: 'Kerala, India',
    category: 'nature',
    title: 'Emerald Tea Hills & Misty Valleys',
    description: 'Endless rolling hills cloaked in tea carpets, endangered Nilgiri Tahr wildlife, cascading waterfalls, and serene mountain dams in God’s Own Country.',
    bestTime: 'September to March',
    budgetRange: '₹13,000 - ₹24,000 / person',
    baseCosts: { transport: 3800, hotelPerNight: 3000, foodPerDay: 950, activityPerDay: 750 },
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea Gardens', 'Nature', 'Waterfalls', 'Wildlife'],
    popular: true,
    spots: ['Eravikulam National Park', 'Mattupetty Dam', 'Tea Museum', 'Top Station', 'Echo Point', 'Kundala Lake', 'Attukad Waterfalls'],
    curatedDays: [
      {
        theme: 'Endangered Wildlife & Legacy of Tea',
        morning: { time: '08:00 AM - 12:00 PM', title: 'Eravikulam National Park Safari', desc: 'Board the forest eco-coach to spot the rare Nilgiri Tahr mountain goat on the slopes of Anamudi (South India’s tallest peak).', place: 'Eravikulam National Park, Rajamalai' },
        afternoon: { time: '01:00 PM - 04:00 PM', title: 'KDHP Tea Museum & Processing Demo', desc: 'Step back to the 1880s at South India’s premier tea museum; witness tea tasting and orthodox rolling machinery in action.', place: 'Tata Tea Museum, Nallathanni' },
        evening: { time: '05:00 PM - 08:00 PM', title: 'Blossom Hydel Park Stroll & Kerala Spices', desc: 'Walk among landscaped flower beds and river trails, then shop for authentic cardamom, black pepper, and clove oils.', place: 'Blossom Park & Spice Markets' }
      },
      {
        theme: 'Scenic Dams, Echo Valleys & Lake Boating',
        morning: { time: '08:30 AM - 12:00 PM', title: 'Mattupetty Dam Speedboat Ride', desc: 'Cruise across the deep blue reservoir surrounded by undulating green hills where wild elephants frequently come to drink.', place: 'Mattupetty Dam & Lake' },
        afternoon: { time: '12:45 PM - 03:45 PM', title: 'Echo Point & Kundala Arch Dam Pedal Boating', desc: 'Call out to test natural valley acoustic echoes, followed by pedal boating on the historic arch dam reservoir.', place: 'Echo Point & Kundala Lake' },
        evening: { time: '04:30 PM - 07:30 PM', title: 'Top Station Panoramic Cloud Viewpoint', desc: 'Reach the historic Tamil Nadu border station (1,700 m) where clouds drift right beneath your feet across the Western Ghats.', place: 'Top Station Viewpoint' }
      },
      {
        theme: 'Cascading Waterfalls & Traditional Kathakali',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Attukad & Lakkam Waterfalls Excursion', desc: 'Hike through jungle paths down to Attukad waterfalls rushing through dense forest boulders and ravines.', place: 'Attukad Waterfalls' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Organic Spice & Ayurvedic Herb Plantation', desc: 'Guided sensory walk identifying vanilla pods, nutmeg, cocoa, and cinnamon bark with organic farm sampling.', place: 'Highland Spice Plantation' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Live Kathakali & Kalaripayattu Martial Art Show', desc: 'Watch Kerala’s ancient martial arts with fiery weapon maneuvers and mesmerizing Kathakali classical dance facial expressions.', place: 'Punarjani Traditional Village' }
      }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    location: 'Rajasthan, India',
    category: 'culture',
    title: 'The Pink City of Maharajas & Fortresses',
    description: 'Imposing hilltop fortresses, ornate royal palaces, vibrant bazaars filled with block prints and gemstones, and grand Rajasthani hospitality.',
    bestTime: 'October to March',
    budgetRange: '₹11,000 - ₹25,000 / person',
    baseCosts: { transport: 3200, hotelPerNight: 2900, foodPerDay: 850, activityPerDay: 800 },
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Forts', 'Palaces', 'Culture', 'Shopping'],
    popular: true,
    spots: ['Amber Fort & Palace', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort', 'Chokhi Dhani', 'Johari Bazaar'],
    curatedDays: [
      {
        theme: 'Crown Forts & Palace of Mirrors',
        morning: { time: '08:30 AM - 12:30 PM', title: 'Grand Amber Fort & Sheesh Mahal', desc: 'Ascend to the hilltop citadel, marvel at the intricate mirror mosaics of Sheesh Mahal, and gaze across Maota Lake.', place: 'Amer Fort, Devisinghpura' },
        afternoon: { time: '01:30 PM - 04:00 PM', title: 'Jal Mahal Photo Stop & City Palace Tour', desc: 'Photograph the floating water palace, then tour the Maharaja’s royal residence, armoury, and Peacock Courtyard.', place: 'City Palace, Gangori Bazaar' },
        evening: { time: '05:00 PM - 08:30 PM', title: 'Nahargarh Fort Sunset & City Skyline', desc: 'Watch golden twilight sweep across the entire Pink City from the ramparts of Nahargarh, sipping spiced kulhad chai.', place: 'Nahargarh Fort Viewpoint' }
      },
      {
        theme: 'Wind Palaces, Astronomical Wonders & Bazaars',
        morning: { time: '09:00 AM - 11:30 AM', title: 'Hawa Mahal Facade & Jantar Mantar Sundial', desc: 'Admire the 953 honeycombed jharokha windows of Hawa Mahal and the world’s largest stone astronomical observatory.', place: 'Hawa Mahal & Jantar Mantar' },
        afternoon: { time: '12:30 PM - 04:30 PM', title: 'Bazaars of Johari & Bapu Bazaar Shopping', desc: 'Shop for authentic Jaipuri quilts (razai), blue pottery, handcrafted juttis, bandhej dupattas, and silver jewelry.', place: 'Johari & Bapu Bazaar' },
        evening: { time: '05:30 PM - 09:30 PM', title: 'Chokhi Dhani Ethnic Cultural Village & Dal Baati', desc: 'Camel rides, puppet shows, fire dancers, followed by a grand traditional Rajasthani feast of Dal Baati Churma with pure ghee.', place: 'Chokhi Dhani Resort Village' }
      },
      {
        theme: 'Royal Stepwells & Textile Printing Heritage',
        morning: { time: '08:30 AM - 12:00 PM', title: 'Panna Meena Ka Kund Stepwell & Jaigarh Fort', desc: 'Photograph the symmetrical geometric staircases of the 16th-century stepwell, then inspect Jaivana, the world’s largest wheeled cannon.', place: 'Panna Meena Kund & Jaigarh' },
        afternoon: { time: '01:00 PM - 04:00 PM', title: 'Bagru Block Printing Workshop', desc: 'Try your hand at traditional wooden block-printing on natural indigo cotton with master artisans in Sanganer.', place: 'Anokhi Museum & Sanganer Studios' },
        evening: { time: '05:00 PM - 08:00 PM', title: 'Albert Hall Museum & Lit-up Heritage Walk', desc: 'Witness Indo-Saracenic architectural treasures and pigeon swarms at Albert Hall museum lit beautifully in vibrant night colors.', place: 'Ram Niwas Garden, Albert Hall' }
      }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    location: 'Indonesia',
    category: 'international',
    title: 'Island of the Gods & Tropical Temples',
    description: 'Emerald jungle terraces in Ubud, cliffside sea temples, sacred waterfalls, pristine surf beaches, and spiritual wellness sanctuaries.',
    bestTime: 'April to October',
    budgetRange: '₹45,000 - ₹85,000 / person',
    baseCosts: { transport: 18000, hotelPerNight: 5500, foodPerDay: 2200, activityPerDay: 2000 },
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tropical', 'Temples', 'Beaches', 'Culture'],
    popular: true,
    spots: ['Ubud Sacred Monkey Forest', 'Tegalalang Rice Terraces', 'Tanah Lot Temple', 'Uluwatu Cliff Temple', 'Kecak Fire Dance', 'Mount Batur', 'Seminyak Beach'],
    curatedDays: [
      {
        theme: 'Ubud Jungle Sanctuary & Emerald Terraces',
        morning: { time: '08:30 AM - 12:00 PM', title: 'Sacred Monkey Forest & Ubud Art Market', desc: 'Walk under ancient banyan roots surrounded by playful long-tailed macaques, then explore handmade woven rattan bags.', place: 'Sacred Monkey Forest Sanctuary, Ubud' },
        afternoon: { time: '01:00 PM - 04:30 PM', title: 'Tegalalang Rice Terraces & Jungle Swing', desc: 'Wander along the world-heritage Subak irrigation rice steps and glide over the valley on the iconic Bali giant swing.', place: 'Tegalalang Rice Terraces' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Tanah Lot Sunset Sea Temple', desc: 'Witness crashing Indian Ocean waves surrounding the sacred rock offshore temple silhouetted against glowing purple sunset skies.', place: 'Tanah Lot Temple, Tabanan' }
      },
      {
        theme: 'Cliffside Temples, Surf Coasts & Kecak Dance',
        morning: { time: '09:00 AM - 12:30 PM', title: 'Padang Padang & Melasti Beach Relaxation', desc: 'Swim in crystal turquoise waters hidden between limestone cliffs; watch world-class surfers carve peeling barrel waves.', place: 'Melasti Beach, Ungasan' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Uluwatu Cliff Walk (70m Above Indian Ocean)', desc: 'Stroll along the dramatic clifftop pathways guarding the sacred shrine, with sweeping ocean horizons.', place: 'Pura Luhur Uluwatu' },
        evening: { time: '05:45 PM - 08:30 PM', title: 'Uluwatu Amphitheater Kecak Fire Dance & Seafood', desc: 'Experience 50+ chanting performers reenacting the Ramayana at sunset, followed by a candlelit beachfront grilled seafood dinner on Jimbaran Bay.', place: 'Jimbaran Bay Seafood Shacks' }
      },
      {
        theme: 'Sacred Water Purifications & Hidden Waterfalls',
        morning: { time: '08:00 AM - 12:00 PM', title: 'Tirta Empul Holy Spring Cleansing Ritual', desc: 'Participate in the ancient Melukat spiritual purification ritual under 12 sculpted stone spouts of sacred spring waters.', place: 'Tirta Empul Temple, Tampaksiring' },
        afternoon: { time: '01:00 PM - 04:00 PM', title: 'Tibumana / Tegenungan Waterfall Dip', desc: 'Hike through jungle canyon trails to swim in the cool, refreshing pools of secluded jungle cascades.', place: 'Tibumana Waterfall' },
        evening: { time: '05:30 PM - 09:00 PM', title: 'Sunset at Seminyak Beach Club', desc: 'Relax on colorful beanbags on the sand with chilled mocktails, listening to chillout acoustic sunset tunes.', place: 'Seminyak Beachfront' }
      }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    location: 'Ladakh, India',
    category: 'mountains',
    title: 'Land of High Passes & Pangong Lake',
    description: 'High-altitude desert wonderland featuring turquoise alpine lakes, fluttering prayer flags, Tibetan monasteries, and the world’s highest motorable roads.',
    bestTime: 'May to September',
    budgetRange: '₹28,000 - ₹50,000 / person',
    baseCosts: { transport: 9500, hotelPerNight: 4000, foodPerDay: 1100, activityPerDay: 1300 },
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Lakes', 'Monasteries'],
    popular: false,
    spots: ['Pangong Tso', 'Khardung La Pass', 'Nubra Valley', 'Thiksey Monastery', 'Magnetic Hill', 'Leh Palace', 'Shanti Stupa'],
    curatedDays: [
      {
        theme: 'Leh Acclimatization & Monastic Serenity',
        morning: { time: '09:00 AM - 12:00 PM', title: 'Leh Acclimatization & Old Market Walk', desc: 'Rest and gently stroll the cobblestone lanes of Leh main bazaar sampling Tibetan butter tea and apricot jam.', place: 'Leh Main Bazaar' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Thiksey Monastery & Maitreya Buddha', desc: 'Visit the 12-story monastery resembling the Potala Palace and admire the 49-foot Maitreya Buddha statue.', place: 'Thiksey Monastery' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Sunset from Shanti Stupa', desc: 'Climb up to the white-domed Buddhist stupa for 360-degree views of Leh valley and the snow-crested Stok Kangri range.', place: 'Shanti Stupa, Changspa' }
      },
      {
        theme: 'Khardung La Pass & Nubra Valley Dunes',
        morning: { time: '07:30 AM - 12:30 PM', title: 'Ascent to Khardung La Pass (17,982 ft)', desc: 'Conquer one of the world’s highest motorable passes with breathtaking views of the Karakoram range.', place: 'Khardung La Pass' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Diskit Monastery & Giant Buddha', desc: 'Stand before the monumental 106-foot statue of Maitreya Buddha overlooking the Shyok River basin.', place: 'Diskit Monastery, Nubra' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Double-Humped Bactrian Camel Ride on Hunder Dunes', desc: 'Ride rare double-humped camels across white sand dunes nestled between snow-clad Himalayan peaks.', place: 'Hunder Sand Dunes' }
      },
      {
        theme: 'Color-Shifting Waters of Pangong Lake',
        morning: { time: '07:00 AM - 12:30 PM', title: 'Scenic Drive via Chang La Pass (17,590 ft)', desc: 'Traverse wild mountain plateaus, spotting Himalayan marmots and grazing herds of yaks along the route.', place: 'Chang La Pass Trail' },
        afternoon: { time: '01:00 PM - 04:30 PM', title: 'Pangong Tso Exploration & Photo Walk', desc: 'Marvel at the magical salt lake that shifts colors from azure blue to emerald green, stretching 134 km into Tibet.', place: 'Pangong Tso Banks' },
        evening: { time: '05:30 PM - 09:00 PM', title: 'Milky Way Stargazing from Alpine Campsite', desc: 'Sit around a warming camp heater under one of the world’s clearest unpolluted night skies witnessing the galaxy.', place: 'Spangmik Campsite' }
      }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    location: 'Uttar Pradesh, India',
    category: 'culture',
    title: 'The Spiritual Heart & Eternal Ghats',
    description: 'One of the world’s oldest living cities on the sacred banks of the Ganges, famed for soul-stirring Ganga Aarti, dawn boat rides, and ancient silk lanes.',
    bestTime: 'October to March',
    budgetRange: '₹9,000 - ₹18,000 / person',
    baseCosts: { transport: 2600, hotelPerNight: 2200, foodPerDay: 700, activityPerDay: 600 },
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tags: ['Temples', 'Heritage', 'Culture', 'Spiritual'],
    popular: false,
    spots: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Assi Ghat', 'Sarnath', 'Manikarnika Ghat', 'Ganga Boat Ride', 'Banarasi Silk Weavers'],
    curatedDays: [
      {
        theme: 'Sunrise on Mother Ganga & Evening Aarti',
        morning: { time: '05:30 AM - 09:30 AM', title: 'Sunrise Rowing Boat Ride along 84 Ghats', desc: 'Float past centuries-old palatial ghats as morning rays illuminate holy rituals, chanting, and temple bells.', place: 'Assi to Dashashwamedh Ghat' },
        afternoon: { time: '11:00 AM - 03:30 PM', title: 'Kashi Vishwanath Corridor & Banarasi Chaat', desc: 'Darshan at the sacred Jyotirlinga, followed by mouthwatering Tamatar Chaat, Malaiyyo, and sweet lassi.', place: 'Kashi Vishwanath Temple' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Grand Ganga Aarti at Dashashwamedh Ghat', desc: 'Witness young priests lifting massive brass multi-tiered fire lamps in synchronized devotion accompanied by conch shells.', place: 'Dashashwamedh Ghat' }
      },
      {
        theme: 'Buddha’s First Sermon & Master Silk Weavers',
        morning: { time: '08:30 AM - 12:30 PM', title: 'Sarnath Excursion & Dhamek Stupa', desc: 'Visit the deer park where Lord Buddha preached his first sermon after enlightenment and view the Ashoka Lion Capital.', place: 'Sarnath Archaeological Site' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Banarasi Silk Weaving Heritage Walk', desc: 'Visit generational handloom weavers in the winding galis to see pure gold zari thread craftsmanship on sarees.', place: 'Madanpura Weavers Colony' },
        evening: { time: '05:30 PM - 08:30 PM', title: 'Subah-e-Banaras Cultural Music & Stroll', desc: 'Listen to classical sitar and shehnai recitals along Assi ghat and enjoy a famous Banarasi Paan.', place: 'Assi Ghat Promenade' }
      }
    ]
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    location: 'Andaman & Nicobar Islands, India',
    category: 'beaches',
    title: 'Turquoise Waters & Coral Wonderland',
    description: 'Pristine white sand archipelagos, crystal-clear scuba diving, bio-luminescent night waters, historic Cellular Jail, and lush tropical mangroves.',
    bestTime: 'October to May',
    budgetRange: '₹30,000 - ₹55,000 / person',
    baseCosts: { transport: 12000, hotelPerNight: 4200, foodPerDay: 1300, activityPerDay: 1800 },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    tags: ['Beaches', 'Scuba Diving', 'Islands', 'Nature'],
    popular: false,
    spots: ['Radhanagar Beach', 'Cellular Jail', 'Elephant Beach', 'Ross Island', 'Kalapathar Beach', 'Scuba Diving Sites', 'Baratang Limestone Caves'],
    curatedDays: [
      {
        theme: 'Freedom Struggle History & Port Blair Welcome',
        morning: { time: '09:00 AM - 12:00 PM', title: 'Corbyn’s Cove Beach & Port Blair Arrival', desc: 'Settle into your coastal hotel and walk along palm-fringed Corbyn’s Cove beach.', place: 'Corbyn’s Cove, Port Blair' },
        afternoon: { time: '01:30 PM - 04:30 PM', title: 'Cellular Jail Historical Tour', desc: 'Walk through the solitary confinement wings that housed India’s freedom fighters and learn about Veer Savarkar.', place: 'National Memorial Cellular Jail' },
        evening: { time: '05:30 PM - 08:00 PM', title: 'Cellular Jail Sound & Light Show', desc: 'Moving historical light and sound narration bringing the tales of national sacrifice vividly to life.', place: 'Cellular Jail Grounds' }
      },
      {
        theme: 'Asia’s Best Beach & Havelock Island Ferry',
        morning: { time: '07:30 AM - 11:30 AM', title: 'Cruise Ferry to Havelock (Swaraj Dweep)', desc: 'Speed across turquoise waters on a luxury catamaran cruise with flying fish leaping across waves.', place: 'Havelock Ferry Terminal' },
        afternoon: { time: '01:00 PM - 04:00 PM', title: 'Elephant Beach Coral Snorkeling', desc: 'Snorkel among colorful parrotfish, clownfish, and sea turtles in vibrant shallow coral gardens.', place: 'Elephant Beach' },
        evening: { time: '04:45 PM - 07:30 PM', title: 'Sunset at Radhanagar Beach (Beach No. 7)', desc: 'Stroll on powder-white sand voted Asia’s finest beach as fiery colors mirror across the vast Andaman Sea.', place: 'Radhanagar Beach' }
      }
    ]
  }
];

// Fallback dynamic activity pool for custom destinations & diverse interests
const GENERIC_ACTIVITIES = {
  Nature: [
    { title: 'Eco-Trail & Botanical Reserve Exploration', desc: 'Walk under verdant native tree canopies, birdwatch, and observe flora native to the region.', place: 'Local Nature Sanctuary & Green Trails' },
    { title: 'Lakefront Picnic & Waterfront Stroll', desc: 'Unwind by the tranquil local lake or riverbank with scenic hillside viewpoints.', place: 'Scenic Waterfront Promenade' },
    { title: 'Sunset Viewpoint & Ridge Walk', desc: 'Hike to the premier sunset lookout for sweeping panoramic skyline and valley views.', place: 'Panoramic Hilltop Lookout' }
  ],
  Beaches: [
    { title: 'Morning Waves & Coastline Stroll', desc: 'Walk barefoot on soft sand, listen to the roaring surf, and enjoy fresh coconut water.', place: 'Central Coastline Beach' },
    { title: 'Water Sports & Beach Shack Lunch', desc: 'Try exciting water activities like jet-skiing or kayaking, then feast on fresh seafood.', place: 'Water Sports Beach Club' },
    { title: 'Sunset Beach Gathering & Starlight Dining', desc: 'Watch golden hour reflections on the ocean waves, followed by open-air beachfront dining.', place: 'Beachside Promenade' }
  ],
  Mountains: [
    { title: 'Mountain Pass View & Alpine Trek', desc: 'Breathe crisp mountain air on an invigorating trail with sweeping peaks and wildflowers.', place: 'Alpine Ridge Trek' },
    { title: 'Cable Car Ropeway & Mountain Hamlet Lunch', desc: 'Take a scenic aerial ropeway across valleys and taste authentic local hillside specialties.', place: 'Mountain Viewpoint Station' },
    { title: 'Cozy Fireside Evening with Local Delicacies', desc: 'Gather around a warm fireplace with hot beverages and warm traditional stews.', place: 'Alpine Village Lounge' }
  ],
  'Historical Places': [
    { title: 'Ancient Fortress & Citadel Tour', desc: 'Explore historic stone battlements, royal gates, and ancient architecture with local guides.', place: 'Historic Fort & Citadel' },
    { title: 'Museum & Royal Artifacts Exhibition', desc: 'Discover centuries-old weaponry, antique manuscripts, and royal paintings of the region.', place: 'State Heritage Museum' },
    { title: 'Heritage Night Walk & Illuminated Monuments', desc: 'Walk through illuminated historic avenues and photograph stunning monument architecture.', place: 'Historic Old Town Square' }
  ],
  Temples: [
    { title: 'Morning Temple Rituals & Sanctum Darshan', desc: 'Experience the serenity of dawn prayers, Vedic chants, and incense in iconic shrines.', place: 'Sacred Ancient Temple' },
    { title: 'Spiritual Meditation & Temple Architecture', desc: 'Admire intricate stone carvings, temple ponds, and enjoy quiet moments of contemplation.', place: 'Heritage Shrine Complex' },
    { title: 'Evening Deepam Aarti & Sacred Chants', desc: 'Witness the uplifting glow of oil lamps, bronze bells, and musical evening prayer rituals.', place: 'Riverfront Temple Ghat' }
  ],
  Food: [
    { title: 'Traditional Breakfast & Local Specialty Tasting', desc: 'Savor regional breakfast delicacies, artisanal breads, and signature hot beverages.', place: 'Famous Local Heritage Eatery' },
    { title: 'Culinary Food Trail & Spice Sampling', desc: 'Taste signature regional lunch thalis, aromatic curries, and time-honored recipes.', place: 'Culinary Market Street' },
    { title: 'Night Street Food Bazaar & Sweet Treats', desc: 'Sample famous street snacks, sizzling delicacies, and regional dessert specialties.', place: 'Night Food Bazaar' }
  ],
  Shopping: [
    { title: 'Artisan Handicraft & Textile Workshop', desc: 'Watch local craftsmen create handwoven textiles, pottery, and regional carvings.', place: 'Artisan Craft Village' },
    { title: 'Old City Bazaars & Souvenir Treasure Hunt', desc: 'Bargain for authentic spices, traditional apparel, jewelry, and unique memorabilia.', place: 'Main Heritage Bazaar' },
    { title: 'Modern Boutiques & Evening Gift Shopping', desc: 'Browse contemporary design shops, handmade cosmetics, and local treats to bring home.', place: 'Downtown Shopping Arcade' }
  ]
};

// Travel tips templates
const GENERAL_TRAVEL_TIPS = [
  { icon: '🎒', title: 'Smart Packing', text: 'Keep lightweight layers, comfortable walking shoes, a reusable water bottle, and a quick-dry towel handy.' },
  { icon: '🚗', title: 'Local Commute', text: 'Pre-book reliable local cabs or rent two-wheelers for mountain/beach flexibility; negotiate autos in advance.' },
  { icon: '💳', title: 'Payments & Cash', text: 'UPI / digital payments work widely, but keep emergency INR cash handy for remote viewpoints and entry tickets.' },
  { icon: '🌤️', title: 'Weather & Timings', text: 'Start early around 8:30 AM to beat tourist crowds and afternoon heat at top attractions and viewpoints.' },
  { icon: '🍽️', title: 'Food & Hydration', text: 'Always prefer busy local eateries with high turnover for the freshest regional cuisines and authentic flavors.' },
  { icon: '🌿', title: 'Eco-Conscious Travel', text: 'Avoid single-use plastics, respect sacred shrine codes (modest dress), and preserve local nature spots.' }
];

// LocalStorage key
const STORAGE_KEY = 'travel_planner_saved_trip_v1';

// Global state for currently active trip
let currentTripPlan = null;

// ==========================================================================
// 2. Initialization & DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupDateDefaults();
  setupTravellersStepper();
  renderPopularDestinations();
  renderExploreDestinations(DESTINATIONS_DATA);
  setupExploreFilters();
  setupFormHandlers();
  setupActionButtons();
  loadSavedTripFromStorage();
});

// ==========================================================================
// 3. Navigation & Mobile Menu Setup
// ==========================================================================
function setupNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  // Active section spy on scroll
  window.addEventListener('scroll', () => {
    const sections = ['home', 'popular', 'explore', 'plan', 'my-trip'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      }
    });
  });
}

// ==========================================================================
// 4. Date Inputs Defaults & Validation Setup
// ==========================================================================
function setupDateDefaults() {
  const departureInput = document.getElementById('departureDate');
  const returnInput = document.getElementById('returnDate');

  if (!departureInput || !returnInput) return;

  const today = new Date();
  const todayStr = formatDateForInput(today);
  
  // Tomorrow as default departure
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateForInput(tomorrow);

  // 5 days later as default return
  const defaultReturn = new Date(tomorrow);
  defaultReturn.setDate(defaultReturn.getDate() + 4);
  const defaultReturnStr = formatDateForInput(defaultReturn);

  departureInput.min = todayStr;
  departureInput.value = tomorrowStr;

  returnInput.min = tomorrowStr;
  returnInput.value = defaultReturnStr;

  // Whenever departure changes, update return min and ensure return >= departure
  departureInput.addEventListener('change', () => {
    returnInput.min = departureInput.value;
    if (returnInput.value && returnInput.value < departureInput.value) {
      const newReturn = new Date(departureInput.value);
      newReturn.setDate(newReturn.getDate() + 3);
      returnInput.value = formatDateForInput(newReturn);
    }
  });
}

function formatDateForInput(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Travellers stepper (+ / - buttons)
function setupTravellersStepper() {
  const travellersInput = document.getElementById('travellers');
  const incBtn = document.getElementById('incrementTravellers');
  const decBtn = document.getElementById('decrementTravellers');

  if (!travellersInput || !incBtn || !decBtn) return;

  incBtn.addEventListener('click', () => {
    let val = parseInt(travellersInput.value, 10) || 1;
    if (val < 30) {
      travellersInput.value = val + 1;
    }
  });

  decBtn.addEventListener('click', () => {
    let val = parseInt(travellersInput.value, 10) || 1;
    if (val > 1) {
      travellersInput.value = val - 1;
    }
  });
}

// ==========================================================================
// 5. Popular Destinations Rendering (Hero / Preview Section)
// ==========================================================================
function renderPopularDestinations() {
  const popularContainer = document.getElementById('popularGrid');
  if (!popularContainer) return;

  const popularList = DESTINATIONS_DATA.filter(d => d.popular);
  popularContainer.innerHTML = popularList.map(dest => `
    <div class="popular-card" data-destination="${escapeHtml(dest.name)}">
      <div class="popular-card-image-wrap">
        <img 
          src="${dest.image}" 
          alt="${escapeHtml(dest.name)}" 
          class="popular-card-image"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'"
        >
        <span class="popular-category-tag">${escapeHtml(dest.tags[0] || 'Popular')}</span>
      </div>
      <div class="popular-card-content">
        <h3 class="popular-card-title">${escapeHtml(dest.name)}</h3>
        <p class="popular-card-desc">${escapeHtml(dest.description)}</p>
        <div class="popular-card-meta">
          <div class="popular-budget-box">
            <span class="popular-budget-label">Est. Budget</span>
            <span class="popular-budget-val">${dest.budgetRange.split('/')[0].trim()}</span>
          </div>
          <div class="popular-timing-val">
            <span>🗓️ ${escapeHtml(dest.bestTime)}</span>
          </div>
        </div>
        <button type="button" class="plan-trip-card-btn" onclick="quickSelectDestination('${escapeJsString(dest.name)}')">
          <span>Plan This Trip</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 6. Explore Destinations Rendering & Filtering (Section 8)
// ==========================================================================
function renderExploreDestinations(destinations) {
  const grid = document.getElementById('destinationsGrid');
  const emptyBox = document.getElementById('noDestinationsFound');
  if (!grid) return;

  if (destinations.length === 0) {
    grid.innerHTML = '';
    if (emptyBox) emptyBox.style.display = 'block';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';

  grid.innerHTML = destinations.map(dest => `
    <div class="popular-card" data-id="${dest.id}">
      <div class="popular-card-image-wrap">
        <img 
          src="${dest.image}" 
          alt="${escapeHtml(dest.name)}" 
          class="popular-card-image"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'"
        >
        <span class="popular-category-tag">${escapeHtml(dest.tags[0] || 'Must Visit')}</span>
      </div>
      <div class="popular-card-content">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 0.25rem;">
          <h3 class="popular-card-title">${escapeHtml(dest.name)}</h3>
          <small style="color:var(--navy-600); font-weight:600;">${escapeHtml(dest.location)}</small>
        </div>
        <p class="popular-card-desc">${escapeHtml(dest.description)}</p>
        
        <div class="popular-card-meta">
          <div class="popular-budget-box">
            <span class="popular-budget-label">Est. Budget</span>
            <span class="popular-budget-val">${dest.budgetRange.split('/')[0].trim()}</span>
          </div>
          <div class="popular-timing-val">
            <span>🗓️ ${escapeHtml(dest.bestTime)}</span>
          </div>
        </div>

        <button type="button" class="plan-trip-card-btn" onclick="quickSelectDestination('${escapeJsString(dest.name)}')">
          <span>Plan This Trip</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `).join('');
}

function setupExploreFilters() {
  const searchInput = document.getElementById('destinationSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.filter-pill');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let filtered = DESTINATIONS_DATA;

    // Filter by Category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    renderExploreDestinations(filtered);
  }

  // Pill click handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentCategory = pill.dataset.category;
      applyFilters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      applyFilters();
    });
  }

  // Clear button handler
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        applyFilters();
      }
    });
  }
}

// Quick Select Destination from any card or button (Section 8 requirement)
window.quickSelectDestination = function(destinationName) {
  const destinationInput = document.getElementById('destination');
  const planSection = document.getElementById('plan');

  if (destinationInput) {
    destinationInput.value = destinationName;
    destinationInput.classList.remove('input-error');
    
    // Clear any previous error message for destination
    const destError = document.getElementById('destinationError');
    if (destError) destError.classList.remove('visible');

    // Trigger pulse effect
    destinationInput.classList.add('field-highlight');
    setTimeout(() => {
      destinationInput.classList.remove('field-highlight');
    }, 1000);
  }

  // Scroll to plan form
  if (planSection) {
    planSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Show friendly toast feedback
  showToast(`Selected "${destinationName}"! Complete your travel details below.`, 'info');
};

// ==========================================================================
// 7. Trip Planning Form Validation & Submission (Section 4)
// ==========================================================================
function setupFormHandlers() {
  const form = document.getElementById('tripForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateAndGeneratePlan();
  });

  // Real-time error clearance on input
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      const errElem = document.getElementById(`${input.id}Error`);
      if (errElem) errElem.classList.remove('visible');
    });
  });
}

function validateAndGeneratePlan() {
  const startLocationInput = document.getElementById('startLocation');
  const destinationInput = document.getElementById('destination');
  const departureDateInput = document.getElementById('departureDate');
  const returnDateInput = document.getElementById('returnDate');
  const travellersInput = document.getElementById('travellers');
  const budgetInput = document.getElementById('budget');
  const travelTypeRadios = document.querySelectorAll('input[name="travelType"]:checked');
  const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
  const globalAlert = document.getElementById('formGlobalAlert');

  // Reset errors
  let isValid = true;
  clearAllErrors();

  const startLocation = startLocationInput.value.trim();
  const destination = destinationInput.value.trim();
  const departureDate = departureDateInput.value;
  const returnDate = returnDateInput.value;
  const travellers = parseInt(travellersInput.value, 10);
  const budget = parseFloat(budgetInput.value);
  const travelType = travelTypeRadios.length > 0 ? travelTypeRadios[0].value : '';
  const selectedInterests = Array.from(interestCheckboxes).map(cb => cb.value);

  // 1. Starting Location
  if (!startLocation) {
    showFieldError('startLocation', 'Please enter your starting location.');
    isValid = false;
  }

  // 2. Destination
  if (!destination) {
    showFieldError('destination', 'Please enter or select a travel destination.');
    isValid = false;
  }

  // 3. Departure Date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!departureDate) {
    showFieldError('departureDate', 'Please pick a departure date.');
    isValid = false;
  } else {
    const depDateObj = new Date(departureDate);
    if (depDateObj < today) {
      showFieldError('departureDate', 'Departure date cannot be in the past.');
      isValid = false;
    }
  }

  // 4. Return Date
  if (!returnDate) {
    showFieldError('returnDate', 'Please pick a return date.');
    isValid = false;
  } else if (departureDate) {
    const depDateObj = new Date(departureDate);
    const retDateObj = new Date(returnDate);
    if (retDateObj < depDateObj) {
      showFieldError('returnDate', 'Return date must be on or after the departure date.');
      isValid = false;
    }
  }

  // 5. Travellers
  if (isNaN(travellers) || travellers < 1) {
    showFieldError('travellers', 'Please specify at least 1 traveller.');
    isValid = false;
  }

  // 6. Budget
  if (isNaN(budget) || budget < 1000) {
    showFieldError('budget', 'Please enter a valid budget of at least ₹1,000.');
    isValid = false;
  }

  // 7. Travel Type
  if (!travelType) {
    showFieldError('travelType', 'Please select a travel type.');
    isValid = false;
  }

  // 8. Interests
  if (selectedInterests.length === 0) {
    showFieldError('interests', 'Please select at least one interest.');
    isValid = false;
  }

  if (!isValid) {
    if (globalAlert) {
      globalAlert.className = 'form-global-alert error';
      globalAlert.innerHTML = '⚠️ Please correct the highlighted fields above before generating your travel plan.';
      globalAlert.style.display = 'flex';
      globalAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Hide global alert if valid
  if (globalAlert) globalAlert.style.display = 'none';

  // Calculate duration in days
  const dep = new Date(departureDate);
  const ret = new Date(returnDate);
  const diffTime = Math.abs(ret - dep);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to make it inclusive (e.g. Nov 1 to Nov 5 = 5 days)

  // Package trip parameters
  const tripData = {
    id: 'trip_' + Date.now(),
    startLocation,
    destination,
    departureDate,
    returnDate,
    durationDays: Math.max(1, diffDays),
    travellers,
    budget,
    travelType,
    interests: selectedInterests,
    createdAt: new Date().toISOString()
  };

  // Generate Itinerary and Budget
  generateItineraryAndBudget(tripData);

  // Save to localStorage
  saveTripToStorage(tripData);

  // Scroll smoothly to My Trip
  const myTripSection = document.getElementById('my-trip');
  if (myTripSection) {
    setTimeout(() => {
      myTripSection.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  showToast(`Itinerary generated for ${destination}! Check your plan below.`, 'success');
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElem = document.getElementById(`${fieldId}Error`);
  if (input) input.classList.add('input-error');
  if (errorElem) {
    errorElem.textContent = message;
    errorElem.classList.add('visible');
  }
}

function clearAllErrors() {
  const errorMsgs = document.querySelectorAll('.form-error-msg');
  errorMsgs.forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });

  const inputs = document.querySelectorAll('.input-error');
  inputs.forEach(el => el.classList.remove('input-error'));
}

// ==========================================================================
// 8. Itinerary & Budget Generator (Sections 5 & 6)
// ==========================================================================
function generateItineraryAndBudget(tripData) {
  currentTripPlan = tripData;

  // Reveal Active Trip Container & Hide Empty State
  const emptyState = document.getElementById('tripEmptyState');
  const activeContent = document.getElementById('tripActiveContent');
  if (emptyState) emptyState.style.display = 'none';
  if (activeContent) activeContent.style.display = 'block';

  // 1. Populate Overview Card
  populateTripOverview(tripData);

  // 2. Calculate and Populate Budget Breakdown (Section 6)
  calculateAndRenderBudget(tripData);

  // 3. Generate Day-by-Day Itinerary Schedule (Section 5)
  renderDayByDayItinerary(tripData);

  // 4. Render Traveler Tips
  renderTravelTips(tripData);
}

// 8.1 Overview Card Population
function populateTripOverview(trip) {
  document.getElementById('overviewStart').textContent = trip.startLocation;
  document.getElementById('overviewDest').textContent = trip.destination;
  document.getElementById('overviewTripHeading').textContent = `${trip.durationDays} Days in ${trip.destination}`;

  // Format readable dates
  const depFormatted = formatReadableDate(trip.departureDate);
  const retFormatted = formatReadableDate(trip.returnDate);
  const nights = Math.max(0, trip.durationDays - 1);

  document.getElementById('overviewDates').textContent = `📅 ${depFormatted} — ${retFormatted}`;
  document.getElementById('overviewDuration').textContent = `⏱️ ${trip.durationDays} Days / ${nights} Nights`;
  document.getElementById('overviewTravellers').textContent = `👥 ${trip.travellers} ${trip.travellers === 1 ? 'Traveller' : 'Travellers'}`;
  document.getElementById('overviewType').textContent = `🧳 ${trip.travelType} Style`;

  // Interests tags
  const tagsContainer = document.getElementById('overviewInterestsTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = trip.interests.map(i => `<span class="interest-tag-pill">${escapeHtml(i)}</span>`).join('');
  }

  // Update print timestamp
  const printStamp = document.getElementById('printDateStamp');
  if (printStamp) {
    printStamp.textContent = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

// 8.2 Budget Calculator (Section 6)
function calculateAndRenderBudget(trip) {
  // Check if destination matches any known curated destination
  const matchedDest = findDestinationMatch(trip.destination);

  // Base daily and transport costs
  let baseTransport = 3500;
  let baseHotelPerNight = 2800;
  let baseFoodPerDay = 900;
  let baseActivityPerDay = 800;

  if (matchedDest) {
    baseTransport = matchedDest.baseCosts.transport;
    baseHotelPerNight = matchedDest.baseCosts.hotelPerNight;
    baseFoodPerDay = matchedDest.baseCosts.foodPerDay;
    baseActivityPerDay = matchedDest.baseCosts.activityPerDay;
  }

  // Travel Type Multipliers
  let styleMultiplier = 1.0;
  switch (trip.travelType) {
    case 'Adventure': styleMultiplier = 1.1; break;
    case 'Relaxation': styleMultiplier = 1.05; break;
    case 'Family': styleMultiplier = 1.15; break;
    case 'Solo': styleMultiplier = 0.85; break;
    case 'Romantic': styleMultiplier = 1.35; break;
    case 'Cultural': styleMultiplier = 1.0; break;
  }

  const days = trip.durationDays;
  const nights = Math.max(1, days - 1);
  const travellers = trip.travellers;
  
  // Rooms needed: for solo/couple 1 room, for family/groups ceil(travellers / 2)
  const roomsCount = Math.ceil(travellers / 2);

  // Cost calculations:
  // Transportation: (Intercity base * travellers) + (Daily local commute * days * roomsCount)
  const localCabPerDay = 900;
  const totalTransport = Math.round((baseTransport * travellers + localCabPerDay * days * roomsCount) * (styleMultiplier * 0.95));

  // Accommodation: room cost * nights * rooms count
  const totalAccommodation = Math.round(baseHotelPerNight * nights * roomsCount * styleMultiplier);

  // Food: food per person per day * travellers * days
  const totalFood = Math.round(baseFoodPerDay * days * travellers * styleMultiplier);

  // Activities: activity tickets * days * travellers * interest count weighting
  const interestWeight = 1 + (trip.interests.length - 1) * 0.08;
  const totalActivities = Math.round(baseActivityPerDay * days * travellers * styleMultiplier * interestWeight);

  // Total Estimated Budget
  const totalEstimatedCost = totalTransport + totalAccommodation + totalFood + totalActivities;

  // Render to DOM
  document.getElementById('budgetTravellerCount').textContent = travellers;
  document.getElementById('budgetDayCount').textContent = days;
  document.getElementById('budgetTotalCost').textContent = formatINR(totalEstimatedCost);
  document.getElementById('budgetUserTarget').textContent = `Your Budget: ${formatINR(trip.budget)}`;

  document.getElementById('costTransport').textContent = formatINR(totalTransport);
  document.getElementById('costAccommodation').textContent = formatINR(totalAccommodation);
  document.getElementById('costFood').textContent = formatINR(totalFood);
  document.getElementById('costActivities').textContent = formatINR(totalActivities);

  // Update visual cost bars
  const pTransport = Math.min(100, Math.round((totalTransport / totalEstimatedCost) * 100));
  const pStay = Math.min(100, Math.round((totalAccommodation / totalEstimatedCost) * 100));
  const pFood = Math.min(100, Math.round((totalFood / totalEstimatedCost) * 100));
  const pAct = Math.min(100, Math.round((totalActivities / totalEstimatedCost) * 100));

  document.getElementById('barTransport').style.width = `${pTransport}%`;
  document.getElementById('barAccommodation').style.width = `${pStay}%`;
  document.getElementById('barFood').style.width = `${pFood}%`;
  document.getElementById('barActivities').style.width = `${pAct}%`;

  // Compare with user's entered budget
  const comparisonAlert = document.getElementById('budgetComparisonAlert');
  if (comparisonAlert) {
    if (totalEstimatedCost > trip.budget) {
      const difference = totalEstimatedCost - trip.budget;
      comparisonAlert.className = 'budget-comparison-alert alert-warning';
      comparisonAlert.innerHTML = `
        <span class="alert-icon">⚠️</span>
        <div class="alert-body">
          <strong>Estimated Cost Exceeds Your Entered Budget by ${formatINR(difference)}</strong>
          <p>
            Your estimated expense is <strong>${formatINR(totalEstimatedCost)}</strong> compared to your budget of <strong>${formatINR(trip.budget)}</strong>.
            <br>
            💡 <strong>Money-Saving Suggestions:</strong> To reduce expenses, consider selecting cozy budget homestays or hostels, traveling during mid-week or shoulder seasons, opting for train/bus transfers instead of private cabs, and picking free scenic trails over ticketed adventure activities.
          </p>
        </div>
      `;
    } else {
      const savings = trip.budget - totalEstimatedCost;
      comparisonAlert.className = 'budget-comparison-alert alert-success';
      comparisonAlert.innerHTML = `
        <span class="alert-icon">🎉</span>
        <div class="alert-body">
          <strong>Great News! Your Trip is Comfortably Within Budget</strong>
          <p>
            Your estimated expense is <strong>${formatINR(totalEstimatedCost)}</strong>, leaving a healthy buffer of <strong>${formatINR(savings)}</strong> from your budget of <strong>${formatINR(trip.budget)}</strong>.
            <br>
            ✨ You have plenty of room for special artisan shopping, souvenir keepsakes, fine dining upgrades, or spontaneous local adventures!
          </p>
        </div>
      `;
    }
  }
}

// 8.3 Day-by-Day Itinerary Schedule (Section 5)
function renderDayByDayItinerary(trip) {
  const container = document.getElementById('itineraryDaysContainer');
  if (!container) return;

  const matchedDest = findDestinationMatch(trip.destination);
  const daysCount = trip.durationDays;
  const daysHtml = [];

  for (let dayNum = 1; dayNum <= daysCount; dayNum++) {
    const dayData = buildDaySchedule(dayNum, daysCount, matchedDest, trip);
    
    daysHtml.push(`
      <div class="day-card" id="dayCard_${dayNum}">
        <div class="day-card-header">
          <div class="day-title-wrap">
            <span class="day-number-badge">${dayNum}</span>
            <div>
              <h4>Day ${dayNum}: ${escapeHtml(dayData.theme)}</h4>
            </div>
          </div>
          <span class="day-theme-pill">${dayNum === 1 ? 'Arrival Day' : dayNum === daysCount ? 'Departure Day' : 'Sightseeing & Fun'}</span>
        </div>

        <div class="day-slots-grid">
          <!-- Morning Slot -->
          <div class="slot-item morning">
            <div class="slot-header">
              <span class="slot-name">Morning</span>
              <span class="slot-time-badge">${escapeHtml(dayData.morning.time)}</span>
            </div>
            <h5 class="slot-activity-title">${escapeHtml(dayData.morning.title)}</h5>
            <p class="slot-activity-desc">${escapeHtml(dayData.morning.desc)}</p>
            <div class="slot-place">
              <span>📍</span>
              <strong>${escapeHtml(dayData.morning.place)}</strong>
            </div>
          </div>

          <!-- Afternoon Slot -->
          <div class="slot-item afternoon">
            <div class="slot-header">
              <span class="slot-name">Afternoon</span>
              <span class="slot-time-badge">${escapeHtml(dayData.afternoon.time)}</span>
            </div>
            <h5 class="slot-activity-title">${escapeHtml(dayData.afternoon.title)}</h5>
            <p class="slot-activity-desc">${escapeHtml(dayData.afternoon.desc)}</p>
            <div class="slot-place">
              <span>📍</span>
              <strong>${escapeHtml(dayData.afternoon.place)}</strong>
            </div>
          </div>

          <!-- Evening Slot -->
          <div class="slot-item evening">
            <div class="slot-header">
              <span class="slot-name">Evening</span>
              <span class="slot-time-badge">${escapeHtml(dayData.evening.time)}</span>
            </div>
            <h5 class="slot-activity-title">${escapeHtml(dayData.evening.title)}</h5>
            <p class="slot-activity-desc">${escapeHtml(dayData.evening.desc)}</p>
            <div class="slot-place">
              <span>📍</span>
              <strong>${escapeHtml(dayData.evening.place)}</strong>
            </div>
          </div>
        </div>

        <div class="day-card-footer">
          <span class="footer-spots-label">Suggested Spots to Visit:</span>
          ${dayData.spots.map(s => `<span class="spot-pill">📌 ${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `);
  }

  container.innerHTML = daysHtml.join('');
}

// Helper to construct a single day schedule
function buildDaySchedule(dayNum, totalDays, matchedDest, trip) {
  // Check if we have curated days for this destination
  if (matchedDest && matchedDest.curatedDays && matchedDest.curatedDays.length > 0) {
    const cycleIndex = (dayNum - 1) % matchedDest.curatedDays.length;
    const curatedDay = matchedDest.curatedDays[cycleIndex];

    // Pick 2-3 spots
    const spotsCount = matchedDest.spots ? matchedDest.spots.length : 0;
    const daySpots = [];
    if (spotsCount > 0) {
      const s1 = matchedDest.spots[(dayNum * 2 - 2) % spotsCount];
      const s2 = matchedDest.spots[(dayNum * 2 - 1) % spotsCount];
      const s3 = matchedDest.spots[(dayNum * 2) % spotsCount];
      daySpots.push(s1, s2, s3);
    }

    return {
      theme: curatedDay.theme,
      morning: curatedDay.morning,
      afternoon: curatedDay.afternoon,
      evening: curatedDay.evening,
      spots: daySpots.filter(Boolean)
    };
  }

  // Otherwise, construct dynamic day from user's interests & destination name
  const destName = trip.destination;
  const primaryInterest = trip.interests[(dayNum - 1) % trip.interests.length] || 'Nature';
  const secondaryInterest = trip.interests[dayNum % trip.interests.length] || 'Food';

  const primaryPool = GENERIC_ACTIVITIES[primaryInterest] || GENERIC_ACTIVITIES.Nature;
  const secondaryPool = GENERIC_ACTIVITIES[secondaryInterest] || GENERIC_ACTIVITIES.Food;

  const actMorning = primaryPool[0] || { title: `Explore ${destName} Highlights`, desc: `Morning guided exploration of top natural and heritage landmarks around ${destName}.`, place: `${destName} Central Heritage Zone` };
  const actAfternoon = secondaryPool[1] || { title: `Local Cuisine & Scenic Leisure`, desc: `Taste signature culinary specialties and take in relaxed landscape viewpoints in ${destName}.`, place: `${destName} Riverside or Promenade` };
  const actEvening = primaryPool[2] || { title: `Sunset Views & Evening Bazaars`, desc: `Golden twilight stroll followed by shopping for regional handicrafts and souvenirs.`, place: `${destName} Evening Bazaar` };

  return {
    theme: `${primaryInterest} & ${secondaryInterest} Discoveries in ${destName}`,
    morning: {
      time: '09:00 AM - 12:30 PM',
      title: actMorning.title,
      desc: actMorning.desc,
      place: `${destName} • ${actMorning.place}`
    },
    afternoon: {
      time: '01:30 PM - 04:30 PM',
      title: actAfternoon.title,
      desc: actAfternoon.desc,
      place: `${destName} • ${actAfternoon.place}`
    },
    evening: {
      time: '05:30 PM - 08:30 PM',
      title: actEvening.title,
      desc: actEvening.desc,
      place: `${destName} • ${actEvening.place}`
    },
    spots: [
      `${destName} Historic Core`,
      `${primaryInterest} Highlight Point`,
      `Local Art & Food Quarter`
    ]
  };
}

// 8.4 Render Travel Tips
function renderTravelTips(trip) {
  const tipsGrid = document.getElementById('travelTipsGrid');
  if (!tipsGrid) return;

  const matched = findDestinationMatch(trip.destination);
  const bestTimeNotice = matched ? matched.bestTime : 'October to March (typical high season)';

  const dynamicTips = [
    {
      icon: '🗓️',
      title: 'Best Timing & Season',
      text: `For ${trip.destination}, the ideal window is ${bestTimeNotice}. You are scheduled for ${formatReadableDate(trip.departureDate)}, perfect for ${trip.travelType.toLowerCase()} travel.`
    },
    {
      icon: '🧳',
      title: `${trip.travelType} Style Advice`,
      text: `Traveling as a ${trip.travelType.toLowerCase()} group with ${trip.travellers} person(s). Keep shared itineraries synced and allocate buffer hours between morning and afternoon slots.`
    },
    ...GENERAL_TRAVEL_TIPS.slice(0, 4)
  ];

  tipsGrid.innerHTML = dynamicTips.map(tip => `
    <div class="tip-box">
      <h5>${tip.icon} ${escapeHtml(tip.title)}</h5>
      <p>${escapeHtml(tip.text)}</p>
    </div>
  `).join('');
}

// ==========================================================================
// 9. Action Buttons Setup (Edit, Regenerate, Print/PDF, Clear) (Section 7)
// ==========================================================================
function setupActionButtons() {
  const editBtn = document.getElementById('editTripBtn');
  const regenBtn = document.getElementById('regenerateTripBtn');
  const printBtn = document.getElementById('printTripBtn');
  const clearBtn = document.getElementById('clearTripBtn');

  // 1. Edit Trip Details
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const planSection = document.getElementById('plan');
      if (planSection) {
        planSection.scrollIntoView({ behavior: 'smooth' });
        const startInput = document.getElementById('startLocation');
        if (startInput) startInput.focus();
      }
      showToast('Modify any details in the form above and click Generate!', 'info');
    });
  }

  // 2. Regenerate Itinerary (re-rolls activity variations)
  if (regenBtn) {
    regenBtn.addEventListener('click', () => {
      if (!currentTripPlan) return;

      // Add a slight spin/loading feel
      regenBtn.style.opacity = '0.6';
      regenBtn.disabled = true;

      setTimeout(() => {
        // Reverse or shift interests order slightly to yield fresh day themes
        if (currentTripPlan.interests.length > 1) {
          const first = currentTripPlan.interests.shift();
          currentTripPlan.interests.push(first);
        }

        // Re-generate
        generateItineraryAndBudget(currentTripPlan);
        saveTripToStorage(currentTripPlan);

        regenBtn.style.opacity = '1';
        regenBtn.disabled = false;

        showToast('Itinerary regenerated with alternative activities!', 'success');
      }, 350);
    });
  }

  // 3. Print or Save as PDF using window.print()
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Trigger native browser print which uses our @media print stylesheet
      window.print();
    });
  }

  // 4. Clear Current Plan
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your current travel plan?')) {
        clearCurrentTrip();
        showToast('Trip plan cleared successfully.', 'info');
      }
    });
  }
}

function clearCurrentTrip() {
  currentTripPlan = null;
  localStorage.removeItem(STORAGE_KEY);

  const emptyState = document.getElementById('tripEmptyState');
  const activeContent = document.getElementById('tripActiveContent');
  if (emptyState) emptyState.style.display = 'block';
  if (activeContent) activeContent.style.display = 'none';

  // Clear Form fields
  const form = document.getElementById('tripForm');
  if (form) form.reset();

  setupDateDefaults();
}

// ==========================================================================
// 10. LocalStorage Persistence (Section 7)
// ==========================================================================
function saveTripToStorage(tripData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tripData));
  } catch (err) {
    console.warn('Unable to persist trip to localStorage:', err);
  }
}

function loadSavedTripFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsedTrip = JSON.parse(saved);
    if (parsedTrip && parsedTrip.destination && parsedTrip.durationDays) {
      // Populate form fields with saved data
      populateFormFromSavedTrip(parsedTrip);

      // Render the saved trip
      generateItineraryAndBudget(parsedTrip);

      showToast(`Welcome back! Restored your trip to ${parsedTrip.destination}.`, 'info');
    }
  } catch (err) {
    console.warn('Error reading trip from localStorage:', err);
  }
}

function populateFormFromSavedTrip(trip) {
  const startLocationInput = document.getElementById('startLocation');
  const destinationInput = document.getElementById('destination');
  const departureDateInput = document.getElementById('departureDate');
  const returnDateInput = document.getElementById('returnDate');
  const travellersInput = document.getElementById('travellers');
  const budgetInput = document.getElementById('budget');

  if (startLocationInput) startLocationInput.value = trip.startLocation || '';
  if (destinationInput) destinationInput.value = trip.destination || '';
  if (departureDateInput) departureDateInput.value = trip.departureDate || '';
  if (returnDateInput) returnDateInput.value = trip.returnDate || '';
  if (travellersInput) travellersInput.value = trip.travellers || 2;
  if (budgetInput) budgetInput.value = trip.budget || '';

  // Travel Type Radio
  if (trip.travelType) {
    const radio = document.querySelector(`input[name="travelType"][value="${trip.travelType}"]`);
    if (radio) radio.checked = true;
  }

  // Interests Checkboxes
  if (Array.isArray(trip.interests)) {
    const allCheckboxes = document.querySelectorAll('input[name="interests"]');
    allCheckboxes.forEach(cb => {
      cb.checked = trip.interests.includes(cb.value);
    });
  }
}

// ==========================================================================
// 11. Helper Utilities
// ==========================================================================
function findDestinationMatch(queryName) {
  if (!queryName) return null;
  const q = queryName.toLowerCase().trim();
  return DESTINATIONS_DATA.find(d => 
    d.name.toLowerCase() === q ||
    d.id.toLowerCase() === q ||
    q.includes(d.name.toLowerCase()) ||
    d.name.toLowerCase().includes(q)
  ) || null;
}

function formatINR(number) {
  if (isNaN(number)) return '₹0';
  return '₹' + Math.round(number).toLocaleString('en-IN');
}

function formatReadableDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJsString(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4000);
}

