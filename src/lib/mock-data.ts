import type { LucideIcon } from "lucide-react";
import {
	Building,
	Coffee,
	Drama,
	// Facebook,
	// Hash,
	// Instagram,
	Landmark,
	MapPin as MapPinIcon,
	MountainSnow,
	Route,
	Rss,
	ShoppingBag,
	Trees,
	// Twitter,
	Utensils,
	Waves,
} from "lucide-react"; // Added more icons for blog

export interface NearbyPlace {
	name: string;
	type: string;
	distance?: string;
	icon?: LucideIcon;
	images: string[];
	dataAiHint: string;
}

export interface Tour {
	name: string;
	description: string;
	icon?: LucideIcon;
	details?: string;
	image: string;
	dataAiHint: string;
}

export interface Hotel {
	id: string;
	name: string;
	location: string;
	pricePerNight: number;
	baseCurrency: "USD";
	amenities: string[];
	description: string;
	images: string[];
	gallery?: string[];
	rating: number;
	whatsappNumber: string;
	officialSiteUrl?: string;
	isStrategicPartner?: boolean;
	nearbyPlaces?: NearbyPlace[];
	availableTours?: Tour[];
}

const commonNearbyPlaceIcons: Record<string, LucideIcon> = {
	Restaurant: Utensils,
	Museum: Landmark,
	Park: Trees,
	"Shopping Mall": ShoppingBag,
	Cafe: Coffee,
	Theatre: Drama,
	Landmark: Landmark,
	"Business Center": Building,
	"Snorkeling Spot": Waves,
	"Ski Resort": MountainSnow,
	Default: MapPinIcon,
};

export const mockHotels: Hotel[] = [
	{
		id: "harmony-grand",
		name: "Harmony Grand Palace",
		location: "Paris, France",
		pricePerNight: 450,
		baseCurrency: "USD",
		amenities: [
			"Free WiFi",
			"Pool",
			"Spa",
			"Gym",
			"Restaurant",
			"Room Service",
			"Pet Friendly",
		],
		description:
			"Experience timeless elegance and modern luxury at the Harmony Grand Palace, located in the heart of Paris. Enjoy breathtaking views of the Eiffel Tower, exquisite dining, and world-class amenities.",
		images: ["https://placehold.co/400x300.png?text=Hotel+Main+1"],
		gallery: [
			"https://placehold.co/800x600.png?text=Gallery+1",
			"https://placehold.co/800x600.png?text=Gallery+2",
			"https://placehold.co/800x600.png?text=Gallery+3",
			"https://placehold.co/800x600.png?text=Gallery+4",
		],
		rating: 4.8,
		whatsappNumber: "593996146471",
		officialSiteUrl: "https://example.com/harmony-grand",
		isStrategicPartner: true,
		nearbyPlaces: [
			{
				name: "Louvre Museum",
				type: "Museum",
				distance: "15 min walk",
				icon: commonNearbyPlaceIcons.Museum,
				images: [
					"https://placehold.co/300x200.png?text=Louvre+1",
					"https://placehold.co/300x200.png?text=Louvre+2",
				],
				dataAiHint: "museum art",
			},
			{
				name: "Le Petit Café",
				type: "Cafe",
				distance: "5 min walk",
				icon: commonNearbyPlaceIcons.Cafe,
				images: ["https://placehold.co/300x200.png?text=Cafe+1"],
				dataAiHint: "cafe parisian",
			},
			{
				name: "Jardin des Tuileries",
				type: "Park",
				distance: "10 min walk",
				icon: commonNearbyPlaceIcons.Park,
				images: [
					"https://placehold.co/300x200.png?text=Park+1",
					"https://placehold.co/300x200.png?text=Park+2",
					"https://placehold.co/300x200.png?text=Park+3",
				],
				dataAiHint: "park garden",
			},
			{
				name: "Galeries Lafayette",
				type: "Shopping Mall",
				distance: "20 min walk",
				icon: commonNearbyPlaceIcons["Shopping Mall"],
				images: ["https://placehold.co/300x200.png?text=Mall+1"],
				dataAiHint: "shopping mall",
			},
		],
		availableTours: [
			{
				name: "City Highlights Tour",
				description:
					"Discover iconic Parisian landmarks with our guided city tour.",
				icon: Route,
				details: "Duration: 3 hours",
				image: "https://placehold.co/300x200.png?text=Tour+City",
				dataAiHint: "paris landmarks",
			},
			{
				name: "Seine River Cruise",
				description: "Enjoy a romantic cruise along the Seine River.",
				icon: Route,
				details: "Evening departures",
				image: "https://placehold.co/300x200.png?text=Tour+Seine",
				dataAiHint: "seine river boat",
			},
			{
				name: "Versailles Palace Visit",
				description:
					"Explore the magnificent Palace of Versailles and its gardens.",
				icon: Route,
				details: "Full day trip",
				image: "https://placehold.co/300x200.png?text=Tour+Versailles",
				dataAiHint: "palace versailles",
			},
		],
	},
	{
		id: "serene-shores-resort",
		name: "Serene Shores Resort",
		location: "Maldives",
		pricePerNight: 700,
		baseCurrency: "USD",
		amenities: [
			"Free WiFi",
			"Private Beach",
			"Pool",
			"Spa",
			"Water Sports",
			"Restaurant",
		],
		description:
			"Escape to paradise at Serene Shores Resort in the Maldives. Overwater bungalows, pristine beaches, and crystal-clear waters await you for an unforgettable tropical getaway.",
		images: ["https://placehold.co/400x300.png?text=Resort+Main+1"],
		gallery: [
			"https://placehold.co/800x600.png?text=Gallery+Resort+1",
			"https://placehold.co/800x600.png?text=Gallery+Resort+2",
		],
		rating: 4.9,
		whatsappNumber: "593996146471",
		officialSiteUrl: "https://example.com/serene-shores",
		isStrategicPartner: true,
		nearbyPlaces: [
			{
				name: "Coral Gardens",
				type: "Snorkeling Spot",
				distance: "Boat trip",
				icon: Waves,
				images: [
					"https://placehold.co/300x200.png?text=Coral+1",
					"https://placehold.co/300x200.png?text=Coral+2",
				],
				dataAiHint: "coral reef",
			},
			{
				name: "The Lagoon Restaurant",
				type: "Restaurant",
				distance: "On-site",
				icon: commonNearbyPlaceIcons.Restaurant,
				images: ["https://placehold.co/300x200.png?text=Lagoon+Rest+1"],
				dataAiHint: "restaurant beach",
			},
		],
		availableTours: [
			{
				name: "Dolphin Watching Excursion",
				description: "Witness playful dolphins in their natural habitat.",
				icon: Route,
				details: "Morning or Afternoon",
				image: "https://placehold.co/300x200.png?text=Tour+Dolphin",
				dataAiHint: "dolphins ocean",
			},
			{
				name: "Sunset Fishing Trip",
				description:
					"Try your hand at traditional Maldivian fishing as the sun sets.",
				icon: Route,
				details: "Includes equipment",
				image: "https://placehold.co/300x200.png?text=Tour+Fishing",
				dataAiHint: "fishing sunset",
			},
		],
	},
	{
		id: "urban-oasis-boutique",
		name: "Urban Oasis Boutique Hotel",
		location: "New York, USA",
		pricePerNight: 320,
		baseCurrency: "USD",
		amenities: ["Free WiFi", "Rooftop Bar", "Gym", "Concierge", "City Views"],
		description:
			"Discover a chic and stylish retreat in the bustling city of New York. Urban Oasis Boutique Hotel offers modern design, personalized service, and a prime location for exploring the Big Apple.",
		images: ["https://placehold.co/400x300.png?text=NY+Hotel+1"],
		gallery: [
			"https://placehold.co/800x600.png?text=Gallery+NY+1",
			"https://placehold.co/800x600.png?text=Gallery+NY+2",
		],
		rating: 4.5,
		whatsappNumber: "593996146471",
		officialSiteUrl: "https://example.com/urban-oasis",
		isStrategicPartner: false,
		nearbyPlaces: [
			{
				name: "Times Square",
				type: "Landmark",
				distance: "10 min walk",
				icon: commonNearbyPlaceIcons.Landmark,
				images: [
					"https://placehold.co/300x200.png?text=TimesSq+1",
					"https://placehold.co/300x200.png?text=TimesSq+2",
				],
				dataAiHint: "city square",
			},
			{
				name: "Broadway Theatre",
				type: "Theatre",
				distance: "5 min walk",
				icon: commonNearbyPlaceIcons.Theatre,
				images: ["https://placehold.co/300x200.png?text=Broadway+1"],
				dataAiHint: "theatre interior",
			},
			{
				name: "Central Park",
				type: "Park",
				distance: "20 min walk",
				icon: commonNearbyPlaceIcons.Park,
				images: [
					"https://placehold.co/300x200.png?text=CentralPark+1",
					"https://placehold.co/300x200.png?text=CentralPark+2",
				],
				dataAiHint: "park nature",
			},
		],
		availableTours: [
			{
				name: "Manhattan Walking Tour",
				description:
					"Explore the iconic sights of Manhattan on foot with a knowledgeable guide.",
				icon: Route,
				details: "Approx. 4 hours",
				image: "https://placehold.co/300x200.png?text=Tour+Manhattan",
				dataAiHint: "manhattan walking",
			},
		],
	},
	{
		id: "mountain-vista-lodge",
		name: "Mountain Vista Lodge",
		location: "Aspen, Colorado, USA",
		pricePerNight: 550,
		baseCurrency: "USD",
		amenities: [
			"Free WiFi",
			"Ski-in/Ski-out",
			"Hot Tub",
			"Fireplace",
			"Restaurant",
		],
		description:
			"Nestled in the majestic Rocky Mountains, Mountain Vista Lodge offers rustic charm and luxury. Perfect for ski enthusiasts and nature lovers, with cozy accommodations and stunning views.",
		images: ["https://placehold.co/400x300.png?text=Aspen+Hotel+1"],
		gallery: ["https://placehold.co/800x600.png?text=Gallery+Aspen+1"],
		rating: 4.7,
		whatsappNumber: "593996146471",
		officialSiteUrl: "https://example.com/mountain-vista",
		isStrategicPartner: false,
		nearbyPlaces: [
			{
				name: "Aspen Mountain Ski Resort",
				type: "Ski Resort",
				distance: "Ski-in/Ski-out",
				icon: commonNearbyPlaceIcons["Ski Resort"],
				images: ["https://placehold.co/300x200.png?text=AspenSki+1"],
				dataAiHint: "ski resort",
			},
			{
				name: "The Little Nell Restaurant",
				type: "Restaurant",
				distance: "5 min walk",
				icon: commonNearbyPlaceIcons.Restaurant,
				images: [
					"https://placehold.co/300x200.png?text=NellRest+1",
					"https://placehold.co/300x200.png?text=NellRest+2",
				],
				dataAiHint: "restaurant luxury",
			},
		],
		availableTours: [
			{
				name: "Guided Mountain Hike",
				description:
					"Experience the beauty of Aspen's trails with an expert guide.",
				icon: Route,
				details: "Half-day or Full-day options",
				image: "https://placehold.co/300x200.png?text=Tour+Hike",
				dataAiHint: "mountain hiking",
			},
		],
	},
];

export const allAmenities: string[] = Array.from(
	new Set(mockHotels.flatMap((hotel) => hotel.amenities)),
).sort();

export interface Destination {
	id: string;
	nameKey: string;
	name: string;
	image: string;
	countryKey: string;
	country: string;
	descriptionKey: string;
	description: string;
	tagKey: string;
	tag: string;
	dataAiHint: string;
	nearbyHotelsCount: number;
}

export const popularDestinationsData: Destination[] = [
	{
		id: "paris",
		nameKey: "destination_paris",
		name: "Paris",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_france",
		country: "France",
		descriptionKey: "destination_paris_desc",
		description:
			"The city of lights, romance, and art. Explore iconic landmarks and charming streets.",
		tagKey: "destination_paris_tag",
		tag: "Iconic City",
		dataAiHint: "Eiffel Tower city",
		nearbyHotelsCount: 150,
	},
	{
		id: "rome",
		nameKey: "destination_rome",
		name: "Rome",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_italy",
		country: "Italy",
		descriptionKey: "destination_rome_desc",
		description:
			"Ancient ruins, stunning art, and vibrant culture await in the Eternal City.",
		tagKey: "destination_rome_tag",
		tag: "Historical Hub",
		dataAiHint: "Colosseum ancient",
		nearbyHotelsCount: 200,
	},
	{
		id: "tokyo",
		nameKey: "destination_tokyo",
		name: "Tokyo",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_japan",
		country: "Japan",
		descriptionKey: "destination_tokyo_desc",
		description:
			"A dazzling metropolis where tradition meets futuristic innovation.",
		tagKey: "destination_tokyo_tag",
		tag: "Modern Metropolis",
		dataAiHint: "cityscape neon",
		nearbyHotelsCount: 300,
	},
	{
		id: "bali",
		nameKey: "destination_bali",
		name: "Bali",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_indonesia",
		country: "Indonesia",
		descriptionKey: "destination_bali_desc",
		description:
			"Lush landscapes, spiritual retreats, and beautiful beaches on the Island of Gods.",
		tagKey: "destination_bali_tag",
		tag: "Tropical Paradise",
		dataAiHint: "tropical beach",
		nearbyHotelsCount: 120,
	},
	{
		id: "london",
		nameKey: "destination_london",
		name: "London",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_uk",
		country: "United Kingdom",
		descriptionKey: "destination_london_desc",
		description:
			"A historic city with royal palaces, famous museums, and diverse culture.",
		tagKey: "destination_london_tag",
		tag: "Historic Capital",
		dataAiHint: "Big Ben london",
		nearbyHotelsCount: 250,
	},
	{
		id: "new-york-city",
		nameKey: "destination_nyc",
		name: "New York City",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_usa",
		country: "USA",
		descriptionKey: "destination_nyc_desc",
		description:
			"The city that never sleeps, offering endless entertainment and iconic sights.",
		tagKey: "destination_nyc_tag",
		tag: "The Big Apple",
		dataAiHint: "Statue Liberty",
		nearbyHotelsCount: 400,
	},
	{
		id: "barcelona",
		nameKey: "destination_barcelona",
		name: "Barcelona",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_spain",
		country: "Spain",
		descriptionKey: "destination_barcelona_desc",
		description:
			"Unique architecture by Gaudí, vibrant nightlife, and beautiful beaches.",
		tagKey: "destination_barcelona_tag",
		tag: "Artistic Coast",
		dataAiHint: "Sagrada Familia",
		nearbyHotelsCount: 180,
	},
	{
		id: "sydney",
		nameKey: "destination_sydney",
		name: "Sydney",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_australia",
		country: "Australia",
		descriptionKey: "destination_sydney_desc",
		description:
			"Famous for its Opera House, Harbour Bridge, and stunning beaches.",
		tagKey: "destination_sydney_tag",
		tag: "Harbour City",
		dataAiHint: "Opera House",
		nearbyHotelsCount: 160,
	},
	{
		id: "amsterdam",
		nameKey: "destination_amsterdam",
		name: "Amsterdam",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_netherlands",
		country: "Netherlands",
		descriptionKey: "destination_amsterdam_desc",
		description: "Charming canals, historic houses, and a vibrant arts scene.",
		tagKey: "destination_amsterdam_tag",
		tag: "Canal Charm",
		dataAiHint: "canals houses",
		nearbyHotelsCount: 130,
	},
	{
		id: "dubai",
		nameKey: "destination_dubai",
		name: "Dubai",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_uae",
		country: "UAE",
		descriptionKey: "destination_dubai_desc",
		description:
			"Ultra-modern architecture, luxury shopping, and a lively nightlife.",
		tagKey: "destination_dubai_tag",
		tag: "Futuristic Oasis",
		dataAiHint: "Burj Khalifa city",
		nearbyHotelsCount: 220,
	},
	{
		id: "kyoto",
		nameKey: "destination_kyoto",
		name: "Kyoto",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_japan",
		country: "Japan",
		descriptionKey: "destination_kyoto_desc",
		description:
			"Ancient temples, serene gardens, and traditional geisha districts.",
		tagKey: "destination_kyoto_tag",
		tag: "Cultural Heart",
		dataAiHint: "temple garden",
		nearbyHotelsCount: 90,
	},
	{
		id: "venice",
		nameKey: "destination_venice",
		name: "Venice",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_italy",
		country: "Italy",
		descriptionKey: "destination_venice_desc",
		description:
			"A unique city built on water, famous for its canals and gondolas.",
		tagKey: "destination_venice_tag",
		tag: "Floating City",
		dataAiHint: "gondola canal",
		nearbyHotelsCount: 110,
	},
	{
		id: "rio-de-janeiro",
		nameKey: "destination_rio",
		name: "Rio de Janeiro",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_brazil",
		country: "Brazil",
		descriptionKey: "destination_rio_desc",
		description:
			"Known for its Carnival, Copacabana beach, and Christ the Redeemer statue.",
		tagKey: "destination_rio_tag",
		tag: "Vibrant Beaches",
		dataAiHint: "Christ Redeemer",
		nearbyHotelsCount: 140,
	},
	{
		id: "cape-town",
		nameKey: "destination_capetown",
		name: "Cape Town",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_southafrica",
		country: "South Africa",
		descriptionKey: "destination_capetown_desc",
		description:
			"Stunning Table Mountain, beautiful coastlines, and rich history.",
		tagKey: "destination_capetown_tag",
		tag: "Mountain & Sea",
		dataAiHint: "Table Mountain",
		nearbyHotelsCount: 100,
	},
	{
		id: "bangkok",
		nameKey: "destination_bangkok",
		name: "Bangkok",
		image: "https://placehold.co/600x400.png",
		countryKey: "country_thailand",
		country: "Thailand",
		descriptionKey: "destination_bangkok_desc",
		description: "Ornate shrines, vibrant street life, and delicious cuisine.",
		tagKey: "destination_bangkok_tag",
		tag: "City of Angels",
		dataAiHint: "temple city",
		nearbyHotelsCount: 280,
	},
];

export interface Offer {
	id: string;
	titleKey: string;
	title: string;
	descriptionKey: string;
	description: string;
	image: string;
	discount?: string;
	ctaKey: string;
	cta: string;
	dataAiHint: string;
}

export const specialOffersData: Offer[] = [
	{
		id: "summer-escape",
		titleKey: "offer_summer_title",
		title: "Summer Escape",
		descriptionKey: "offer_summer_desc",
		description:
			"Enjoy sunny beaches and cool breezes with our exclusive summer package. Includes breakfast and spa credits.",
		image: "https://placehold.co/600x400.png",
		discount: "Up to 25% Off",
		ctaKey: "offer_cta_learn_more",
		cta: "Learn More",
		dataAiHint: "beach resort summer",
	},
	{
		id: "city-adventure",
		titleKey: "offer_city_title",
		title: "City Adventure",
		descriptionKey: "offer_city_desc",
		description:
			"Explore vibrant cityscapes with our special offer. Centrally located hotels, perfect for your urban exploration.",
		image: "https://placehold.co/600x400.png",
		discount: "Stay 3, Pay 2",
		ctaKey: "offer_cta_discover",
		cta: "Discover Now",
		dataAiHint: "city skyline modern",
	},
	{
		id: "wellness-retreat",
		titleKey: "offer_wellness_title",
		title: "Wellness Retreat",
		descriptionKey: "offer_wellness_desc",
		description:
			"Rejuvenate your mind and body with our wellness packages. Includes yoga sessions and healthy meals.",
		image: "https://placehold.co/600x400.png",
		ctaKey: "offer_cta_book_retreat",
		cta: "Book Retreat",
		dataAiHint: "spa yoga serene",
	},
];

// --- Blog Data ---
export interface BlogPost {
	id: string;
	type: "social" | "local";
	source?: "Facebook" | "Instagram" | "TikTok"; // Optional, only for social
	socialPostUrl?: string; // Optional, only for social
	titleKey: string;
	title: string;
	contentSnippetKey: string;
	contentSnippet: string;
	fullContentKey?: string; // Optional, only for local posts that need a full page
	imageUrl: string;
	dataAiHint: string;
	date: string; // ISO date string e.g. "2023-10-26T10:00:00Z"
	authorKey?: string; // For local posts
	author?: string; // For local posts
	tags?: string[]; // e.g. ['Travel Tips', 'Hotel News']
	popularityMetrics: {
		reactions: number;
		comments: number;
		shares: number;
	};
}

export const blogPostsData: BlogPost[] = [
	{
		id: "social1",
		type: "social",
		source: "Instagram",
		socialPostUrl: "https://instagram.com/p/example1",
		titleKey: "blog_post_social_insta_title1",
		title: "Sunset Views from Harmony Grand Palace",
		contentSnippetKey: "blog_post_social_insta_snippet1",
		contentSnippet:
			"Captured this breathtaking sunset from our rooftop bar! ✨ #HarmonyHotels #ParisViews #SunsetLovers",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "sunset paris rooftop",
		date: "2024-05-20T18:30:00Z",
		popularityMetrics: { reactions: 1250, comments: 88, shares: 45 },
	},
	{
		id: "local1",
		type: "local",
		titleKey: "blog_post_local_title1",
		title: "Top 5 Hidden Gems to Explore in Rome",
		contentSnippetKey: "blog_post_local_snippet1",
		contentSnippet:
			"Beyond the Colosseum and Vatican, Rome offers countless hidden treasures. Discover our top 5 picks for an authentic Roman experience on your next visit...",
		fullContentKey: "blog_post_local_full1", // Assume these key maps to full markdown/HTML
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "rome alleyway historic",
		date: "2024-05-18T09:00:00Z",
		authorKey: "author_jane_doe",
		author: "Jane Doe, Travel Expert",
		tags: ["Travel Tips", "Rome", "Culture"],
		popularityMetrics: { reactions: 302, comments: 25, shares: 15 },
	},
	{
		id: "social2",
		type: "social",
		source: "Facebook",
		socialPostUrl: "https://facebook.com/harmonyhotels/posts/example2",
		titleKey: "blog_post_social_fb_title1",
		title: "New Wellness Package at Serene Shores!",
		contentSnippetKey: "blog_post_social_fb_snippet1",
		contentSnippet:
			'Introducing our new "Mind & Body Rejuvenation" package at Serene Shores, Maldives. Includes daily yoga, spa treatments, and healthy gourmet meals. Book your escape today! 🌊🧘‍♀️',
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "yoga beach maldives",
		date: "2024-05-15T12:00:00Z",
		popularityMetrics: { reactions: 870, comments: 50, shares: 30 },
	},
	{
		id: "social3",
		type: "social",
		source: "TikTok",
		socialPostUrl: "https://tiktok.com/@harmonyhotels/video/example3",
		titleKey: "blog_post_social_tiktok_title1",
		title: "Quick Tour: Urban Oasis Boutique NYC",
		contentSnippetKey: "blog_post_social_tiktok_snippet1",
		contentSnippet:
			"Check out this quick 30-second tour of our stunning Urban Oasis Boutique Hotel in New York City! 🗽✨ #NYCHotels #BoutiqueHotel #TravelTikTok",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "hotel lobby modern nyc",
		date: "2024-05-12T15:00:00Z",
		popularityMetrics: { reactions: 25000, comments: 350, shares: 120 },
	},
	{
		id: "local2",
		type: "local",
		titleKey: "blog_post_local_title2",
		title: "A Guide to Sustainable Travel with Harmony Hotels",
		contentSnippetKey: "blog_post_local_snippet2",
		contentSnippet:
			"At Harmony Hotels, we are committed to sustainability. Learn about our eco-friendly initiatives and how you can travel more responsibly with us...",
		fullContentKey: "blog_post_local_full2",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "nature sustainability green",
		date: "2024-05-10T11:00:00Z",
		authorKey: "author_harmony_team",
		author: "The Harmony Team",
		tags: ["Sustainability", "Hotel News", "Responsible Travel"],
		popularityMetrics: { reactions: 150, comments: 12, shares: 8 },
	},
	// Add 10 more posts to reach at least 15
	{
		id: "social4",
		type: "social",
		source: "Instagram",
		socialPostUrl: "https://instagram.com/p/example4",
		titleKey: "blog_post_social_insta_title2",
		title: "Poolside Bliss at Mountain Vista Lodge",
		contentSnippetKey: "blog_post_social_insta_snippet2",
		contentSnippet:
			"Cooling off by the pool with incredible mountain views. What could be better? ⛰️☀️ #AspenLife #MountainRetreat #LuxuryTravel",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "pool mountain view",
		date: "2024-05-08T16:00:00Z",
		popularityMetrics: { reactions: 980, comments: 60, shares: 22 },
	},
	{
		id: "local3",
		type: "local",
		titleKey: "blog_post_local_title3",
		title: "The Art of Mixology: Our Signature Cocktails",
		contentSnippetKey: "blog_post_local_snippet3",
		contentSnippet:
			"Meet our head bartenders and discover the stories behind some of Harmony Hotels' most beloved signature cocktails. Plus, a recipe to try at home!",
		fullContentKey: "blog_post_local_full3",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "cocktails bar fancy",
		date: "2024-05-05T14:00:00Z",
		authorKey: "author_alex_chen",
		author: "Alex Chen, Mixologist",
		tags: ["Food & Drink", "Lifestyle", "Hotel News"],
		popularityMetrics: { reactions: 220, comments: 18, shares: 10 },
	},
	{
		id: "social5",
		type: "social",
		source: "Facebook",
		socialPostUrl: "https://facebook.com/harmonyhotels/posts/example5",
		titleKey: "blog_post_social_fb_title2",
		title: "Family Fun at Harmony Resorts!",
		contentSnippetKey: "blog_post_social_fb_snippet2",
		contentSnippet:
			"Planning your next family vacation? Our resorts offer kids' clubs, family-friendly pools, and activities for all ages. Create unforgettable memories with us!",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "family pool vacation",
		date: "2024-05-02T10:30:00Z",
		popularityMetrics: { reactions: 650, comments: 40, shares: 25 },
	},
	{
		id: "social6",
		type: "social",
		source: "TikTok",
		socialPostUrl: "https://tiktok.com/@harmonyhotels/video/example6",
		titleKey: "blog_post_social_tiktok_title2",
		title: "#TravelHack: Packing Tips from a Pro!",
		contentSnippetKey: "blog_post_social_tiktok_snippet2",
		contentSnippet:
			"Our concierge shares top packing tips to make your next trip a breeze! ✈️ #PackingHacks #TravelTips #HarmonyConcierge",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "suitcase packing travel",
		date: "2024-04-29T17:00:00Z",
		popularityMetrics: { reactions: 18000, comments: 210, shares: 90 },
	},
	{
		id: "local4",
		type: "local",
		titleKey: "blog_post_local_title4",
		title: "Celebrating Local Artists: Our Hotel Art Programs",
		contentSnippetKey: "blog_post_local_snippet4",
		contentSnippet:
			"Discover how Harmony Hotels champions local talent by showcasing stunning artwork from regional artists in our lobbies and guest rooms.",
		fullContentKey: "blog_post_local_full4",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "art gallery hotel",
		date: "2024-04-26T11:30:00Z",
		authorKey: "author_harmony_curator",
		author: "Harmony Art Curation",
		tags: ["Art & Culture", "Community", "Hotel News"],
		popularityMetrics: { reactions: 190, comments: 15, shares: 7 },
	},
	{
		id: "social7",
		type: "social",
		source: "Instagram",
		socialPostUrl: "https://instagram.com/p/example7",
		titleKey: "blog_post_social_insta_title3",
		title: "Morning Coffee with a View ☕",
		contentSnippetKey: "blog_post_social_insta_snippet3",
		contentSnippet:
			"Starting the day right at our Tokyo Sky Lounge. The city views are simply mesmerizing. #HarmonyTokyo #CoffeeLover #Cityscape",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "coffee city view",
		date: "2024-04-24T08:00:00Z",
		popularityMetrics: { reactions: 1100, comments: 75, shares: 35 },
	},
	{
		id: "local5",
		type: "local",
		titleKey: "blog_post_local_title5",
		title: "Seasonal Delights: Our Spring Menu Launch",
		contentSnippetKey: "blog_post_local_snippet5",
		contentSnippet:
			"Our chefs have crafted an exquisite new spring menu featuring the freshest seasonal ingredients. Book your table to experience culinary excellence.",
		fullContentKey: "blog_post_local_full5",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "gourmet food spring",
		date: "2024-04-21T13:00:00Z",
		authorKey: "author_chef_michael",
		author: "Chef Michael B. (Head Chef)",
		tags: ["Food & Drink", "Hotel Dining", "Seasonal"],
		popularityMetrics: { reactions: 280, comments: 22, shares: 12 },
	},
	{
		id: "social8",
		type: "social",
		source: "Facebook",
		socialPostUrl: "https://facebook.com/harmonyhotels/posts/example8",
		titleKey: "blog_post_social_fb_title3",
		title: "Loyalty Member Exclusive: Double Points Month!",
		contentSnippetKey: "blog_post_social_fb_snippet3",
		contentSnippet:
			"Great news for our Harmony Loyalty members! Earn double points on all stays throughout June. Not a member yet? Sign up today!",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "loyalty card points",
		date: "2024-04-18T10:00:00Z",
		popularityMetrics: { reactions: 550, comments: 30, shares: 18 },
	},
	{
		id: "social9",
		type: "social",
		source: "TikTok",
		socialPostUrl: "https://tiktok.com/@harmonyhotels/video/example9",
		titleKey: "blog_post_social_tiktok_title3",
		title: "Behind the Scenes: Hotel Housekeeping Magic!",
		contentSnippetKey: "blog_post_social_tiktok_snippet3",
		contentSnippet:
			"Ever wonder how our rooms get so sparkling clean? A quick peek into our amazing housekeeping team in action! ✨ #HotelLife #CleanTok #Hospitality",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "housekeeping hotel clean",
		date: "2024-04-15T16:30:00Z",
		popularityMetrics: { reactions: 15000, comments: 180, shares: 70 },
	},
	{
		id: "local6",
		type: "local",
		titleKey: "blog_post_local_title6",
		title: "Planning the Perfect Destination Wedding at Harmony",
		contentSnippetKey: "blog_post_local_snippet6",
		contentSnippet:
			"Dreaming of a destination wedding? Our expert planners share tips and showcase our most romantic venues for your special day.",
		fullContentKey: "blog_post_local_full6",
		imageUrl: "https://placehold.co/800x600.png",
		dataAiHint: "wedding beach romantic",
		date: "2024-04-12T14:30:00Z",
		authorKey: "author_wedding_planner",
		author: "Harmony Wedding Planners",
		tags: ["Weddings", "Events", "Luxury Venues"],
		popularityMetrics: { reactions: 320, comments: 28, shares: 19 },
	},
];
