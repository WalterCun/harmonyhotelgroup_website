
# Harmony Hotels Group - Database Schema

This document outlines the proposed database schema for the Harmony Hotels Group application, designed for a NoSQL database like Google Firestore.

## Data Modeling Philosophy

- **Denormalization for Read-heavy Operations**: Data is structured to be easily queried by the front-end components. For example, `Destinations` contain details about activities and gastronomy directly, avoiding complex joins.
- **Scalability**: The structure allows for adding new hotels, destinations, and blog posts without schema migrations.
- **Localization**: Fields like `title` and `description` are shown with their default English values. In a production environment, these would be handled using translation keys (e.g., `titleKey`) that correspond to JSON translation files, or by storing translations in nested maps (e.g., `title: { en: '...', es: '...' }`).

---

## Collections

### 1. `hotels`

Stores detailed information about each hotel property.

**Document ID**: `hotel-id` (e.g., `harmony-grand-palace`)

```json
{
  "name": "Harmony Grand Palace", // string
  "location": "Paris, France", // string
  "pricePerNight": 450, // number
  "baseCurrency": "USD", // string (e.g., "USD", "EUR")
  "description": "A detailed description of the hotel...", // string
  "rating": 4.8, // number (0-5)
  "whatsappNumber": "+15551234567", // string
  "officialSiteUrl": "https://example.com/harmony-grand", // string (optional)
  "isStrategicPartner": true, // boolean (optional)
  "images": [ // array of strings (image URLs)
    "https://example.com/main.png",
    "https://example.com/lobby.png"
  ],
  "amenities": [ // array of strings
    "Free WiFi",
    "Pool",
    "Spa"
  ],
  "nearbyPlaces": [ // array of objects (or subcollection)
    {
      "name": "Louvre Museum", // string
      "type": "Museum", // string
      "distance": "15 min walk", // string (optional)
      "images": ["https://example.com/louvre.png"], // array of strings (URLs)
      "dataAiHint": "museum art" // string
    }
  ],
  "availableTours": [ // array of objects (or subcollection)
    {
      "name": "City Highlights Tour", // string
      "description": "Discover iconic Parisian landmarks...", // string
      "details": "Duration: 3 hours", // string (optional)
      "image": "https://example.com/tour.png", // string (URL)
      "dataAiHint": "paris landmarks" // string
    }
  ]
}
```

### 2. `destinations`

Stores information about travel destinations featured in the app.

**Document ID**: `destination-id` (e.g., `paris`)

```json
{
  "name": "Paris", // string
  "country": "France", // string
  "image": "https://example.com/paris.png", // string (URL)
  "description": "The city of lights, romance, and art...", // string
  "tag": "Iconic City", // string
  "dataAiHint": "Eiffel Tower city", // string
  "nearbyHotelsCount": 1, // number (denormalized count of hotels in this destination)
  "bestTimeToVisit": "Spring & Fall (Apr-Jun, Sep-Oct)", // string
  "language": "French", // string
  "transportInfo": "Paris is well-connected by its Metro system...", // string (optional)
  "activities": [ // array of objects (or subcollection)
    {
      "name": "Stroll Along the Seine", // string
      "description": "Enjoy a romantic walk...", // string
      "image": "https://example.com/seine.png", // string (URL)
      "dataAiHint": "seine river walk" // string
    }
  ],
  "gastronomy": [ // array of objects (or subcollection)
    {
      "name": "Le Procope", // string
      "description": "One of the oldest cafés in Paris...", // string
      "image": "https://example.com/bistro.png", // string (URL)
      "dataAiHint": "french bistro interior", // string
      "menu": [ // array of objects
        { "item": "French Onion Soup", "price": "€12" },
        { "item": "Coq au Vin", "price": "€28" }
      ]
    }
  ],
  "attractions": [ /* similar structure to activities */ ],
  "tours": [ /* similar structure to activities */ ]
}
```

### 3. `blogPosts`

Stores articles and social media posts for the blog section.

**Document ID**: `post-id` (e.g., `local-post-123`)

```json
{
  "type": "local", // string ('social' or 'local')
  "source": "Instagram", // string (optional, for social type)
  "socialPostUrl": "https://instagram.com/p/example1", // string (optional)
  "title": "Top 5 Hidden Gems to Explore in Rome", // string
  "contentSnippet": "Beyond the Colosseum and Vatican...", // string (for card views)
  "fullContent": "Full markdown or HTML content...", // string (for local posts)
  "imageUrl": "https://example.com/rome-alley.png", // string (URL)
  "date": "2024-05-18T09:00:00Z", // timestamp
  "author": "Jane Doe, Travel Expert", // string (optional)
  "tags": ["Travel Tips", "Rome"], // array of strings (optional)
  "popularityMetrics": { // map
    "reactions": 302, // number
    "comments": 25, // number
    "shares": 15 // number
  }
}
```

### 4. `offers`

Stores special offers and packages.

**Document ID**: `offer-id` (e.g., `summer-escape-2024`)

```json
{
  "title": "Summer Escape", // string
  "description": "Enjoy sunny beaches and cool breezes...", // string
  "image": "https://example.com/summer.png", // string (URL)
  "discount": "Up to 25% Off", // string (optional, for display)
  "cta": "Learn More", // string (button text)
  "dataAiHint": "beach resort summer", // string
  "active": true // boolean
}
```

### 5. `reviews`

Stores guest reviews. This can be a top-level collection or a subcollection under each `hotel` document (`/hotels/{hotelId}/reviews/{reviewId}`). A top-level collection is often more flexible for querying across all hotels.

**Document ID**: `review-id`

```json
{
  "hotelId": "harmony-grand-palace", // string (reference to a hotel document)
  "hotelName": "Harmony Grand Palace", // string (denormalized for easy display)
  "source": "Google", // string (e.g., 'Google', 'Booking')
  "reviewerName": "Alice Wonderland", // string
  "reviewerAvatar": "https://example.com/avatar.png", // string (optional URL)
  "rating": 5, // number (0-5)
  "reviewText": "Absolutely loved my stay!...", // string
  "date": "2024-05-20T18:30:00Z" // timestamp
}
```
