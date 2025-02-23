import React, {useState} from 'react';
import {Calendar, Users, Search, Wifi, Utensils, MapPin, Space as Spa} from 'lucide-react';

function App() {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2');

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-serif text-gray-800 flex items-center gap-2">
                        <span className="text-gold-600">Harmony</span>Hotel Group
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-gray-600 hover:text-gray-900">Hotels</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Experiences</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Offers</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                    </nav>
                    <button
                        className="bg-gold-600 text-white px-6 py-2 rounded-full hover:bg-gold-700 transition-colors">
                        Book Now
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
                }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white space-y-6 px-4">
                        <h1 className="text-5xl md:text-6xl font-serif font-light">
                            Discover Luxury Living
                        </h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                            Experience unparalleled comfort and elegance at our world-class destinations
                        </p>
                    </div>
                </div>

                {/* Booking Search */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl">
                    <div className="mx-4 bg-white rounded-lg shadow-xl p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4"/>
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4"/>
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 flex items-center gap-2">
                                    <Users className="w-4 h-4"/>
                                    Guests
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="bg-gold-600 text-white h-full rounded-md flex items-center justify-center gap-2 hover:bg-gold-700 transition-colors mt-6">
                                <Search className="w-5 h-5"/>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-center mb-12">Why Choose Harmony</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Wifi,
                                title: 'High-Speed WiFi',
                                desc: 'Stay connected with complimentary high-speed internet access'
                            },
                            {
                                icon: Utensils,
                                title: 'Fine Dining',
                                desc: 'Experience culinary excellence at our gourmet restaurants'
                            },
                            {
                                icon: MapPin,
                                title: 'Prime Locations',
                                desc: 'Situated in the most sought-after destinations worldwide'
                            },
                            {
                                icon: Spa,
                                title: 'Luxury Spa',
                                desc: 'Rejuvenate your body and mind in our world-class spas'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-gold-600"/>
                                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-center mb-12">Guest Experiences</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "An unforgettable experience. The attention to detail and service was impeccable.",
                                author: "Sarah Johnson",
                                role: "Business Traveler"
                            },
                            {
                                text: "The perfect blend of luxury and comfort. We'll definitely be returning.",
                                author: "Michael Chen",
                                role: "Family Vacation"
                            },
                            {
                                text: "Every aspect of our stay exceeded our expectations. Truly world-class.",
                                author: "Emma Thompson",
                                role: "Honeymoon Guest"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                                <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;