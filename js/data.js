/* AURESTA - Expanded Demo Dataset */

window.CELEBRATION_DATA = {
  brandName: 'Auresta',
  tagline: 'Where Moments Turn Golden',

  categories: [
    { id: 'birthday', name: 'Birthday Party', icon: '🎉', count: 48 },
    { id: 'wedding', name: 'Wedding', icon: '💍', count: 62 },
    { id: 'engagement', name: 'Engagement', icon: '✨', count: 35 },
    { id: 'kids', name: "Kids' Party", icon: '🎈', count: 40 },
    { id: 'corporate', name: 'Corporate Event', icon: '🏢', count: 28 },
    { id: 'babyshower', name: 'Baby Shower', icon: '👶', count: 24 },
    { id: 'bachelorette', name: 'Bachelorette', icon: '🥂', count: 19 },
    { id: 'anniversary', name: 'Anniversary', icon: '❤️', count: 31 },
    { id: 'houseparty', name: 'House Party', icon: '🏠', count: 22 }
  ],

  serviceCategories: [
    { id: 'decor', name: 'Decoration', icon: '✨' },
    { id: 'cater', name: 'Food & Catering', icon: '🍽️' },
    { id: 'photo', name: 'Photography & Drone', icon: '📸' },
    { id: 'venue', name: 'Venues & Halls', icon: '🏰' },
    { id: 'dj', name: 'DJ & Music', icon: '🎧' },
    { id: 'kids_ent', name: "Kids' Entertainment", icon: '🎨' },
    { id: 'cake', name: 'Cakes & Desserts', icon: '🎂' },
    { id: 'beauty', name: 'Makeup & Mehendi', icon: '💄' }
  ],

  // "Moments We've Made" Gallery
  momentsMade: [
    {
      id: 'm-1',
      title: 'Aria & Rohan’s Golden Sunset Engagement',
      category: 'engagement',
      categoryName: 'Engagement',
      location: 'Taj West End, Bangalore',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      description: 'An intimate outdoor fairytale floral mandap illuminated with ambient fairy lights & acoustic saxophonist.'
    },
    {
      id: 'm-2',
      title: 'Vivaan’s Superhero 5th Birthday',
      category: 'kids',
      categoryName: "Kids' Party",
      location: 'Indiranagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1566454825485-6923f549c96d?auto=format&fit=crop&w=800&q=80',
      description: 'Custom Avengers balloon arch, interactive magic show, mascot host, and live popcorn counter.'
    },
    {
      id: 'm-3',
      title: 'TechCorp Annual Leadership Gala',
      category: 'corporate',
      categoryName: 'Corporate Event',
      location: 'Leela Palace, Bangalore',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      description: 'Executive banqueting setup with 4K LED backdrop, live jazz band, and multi-cuisine buffet.'
    },
    {
      id: 'm-4',
      title: 'Ananya’s Boho Bachelorette Weekend',
      category: 'bachelorette',
      categoryName: 'Bachelorette',
      location: 'Nandi Hills Resort',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      description: 'Chic boho teepee picnic setup, customized photo booth, cocktail mixologist, and polaroid photographer.'
    },
    {
      id: 'm-5',
      title: 'Meera’s Pastel Botanical Baby Shower',
      category: 'babyshower',
      categoryName: 'Baby Shower',
      location: 'Jayanagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
      description: 'Pastel balloon wreath backdrop, artisan dessert bar, customized favor hampers, and floral games.'
    }
  ],

  // Packages across all budget tiers starting from ₹999
  preMadePackages: [
    {
      id: 'pkg-999-bday',
      title: 'Essential Birthday Starter',
      category: 'birthday',
      priceTier: 'budget',
      originalPrice: 1500,
      dealPrice: 999,
      savingsPct: 33,
      guestCount: 'Up to 15 Guests',
      duration: '2 Hours',
      location: 'Home / Venue',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        '100 Metallic Balloon Backdrop Setup',
        'Happy Birthday Foil Banner',
        'Party Caps & Whistles (15 Packs)',
        'Express Setup in 60 Mins'
      ],
      vendorIds: ['v-1']
    },
    {
      id: 'pkg-3499-house',
      title: 'Cosy House Party Celebration',
      category: 'houseparty',
      priceTier: 'budget',
      originalPrice: 4800,
      dealPrice: 3499,
      savingsPct: 27,
      guestCount: 'Up to 20 Guests',
      duration: '4 Hours',
      location: 'Residence / Rooftop',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Ambient Fairy Light Backdrop & Neon Sign',
        'Bluetooth Party Speaker with Mic',
        'Custom 1kg Chocolate Cream Cake',
        'Disposable Eco Dining Set'
      ],
      vendorIds: ['v-1', 'v-5']
    },
    {
      id: 'pkg-8500-kids',
      title: 'Wonderland Kids Fun Party',
      category: 'kids',
      priceTier: 'standard',
      originalPrice: 11000,
      dealPrice: 8499,
      savingsPct: 23,
      guestCount: 'Up to 30 Kids',
      duration: '3 Hours',
      location: 'Apartment Clubhouse / Lawn',
      image: 'https://images.unsplash.com/photo-1566454825485-6923f549c96d?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Cartoon Theme Balloon Backdrop (10x8 ft)',
        '45-Min Interactive Magic Show & Games',
        'Balloon Sculpting & Face Tattoo Artist',
        'Customized Return Gifts (25 Packs)'
      ],
      vendorIds: ['v-2', 'v-1']
    },
    {
      id: 'pkg-12500-anniv',
      title: 'Golden Romance Anniversary',
      category: 'anniversary',
      priceTier: 'standard',
      originalPrice: 16000,
      dealPrice: 12499,
      savingsPct: 22,
      guestCount: 'Up to 40 Guests',
      duration: '4 Hours',
      location: 'Restaurant / Banquets',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Fresh Rose & Candlelight Table Decor',
        '2-Tier Designer Red Velvet Cake (2 kg)',
        'Candid Photographer (2 Hours + 40 Edits)',
        'Personalized Welcome Board'
      ],
      vendorIds: ['v-1', 'v-4', 'v-5']
    },
    {
      id: 'pkg-28500-bday',
      title: 'Grand Birthday Blast Bundle',
      category: 'birthday',
      priceTier: 'premium',
      originalPrice: 38000,
      dealPrice: 28500,
      savingsPct: 25,
      guestCount: 'Up to 50 Guests',
      duration: '5 Hours',
      location: 'Banquet / Garden',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Theme Balloon & Floral Decor by Bloom & Beyond',
        '2-Tier Custom Fondant Cake (3 kg)',
        'Professional Photographer (3 Hours + 60 Edits)',
        'Sound System & DJ Equipment Setup',
        'Live Mocktail & Popcorn Counter'
      ],
      vendorIds: ['v-1', 'v-4', 'v-7']
    },
    {
      id: 'pkg-45000-bach',
      title: 'Glamour Bachelorette Bash',
      category: 'bachelorette',
      priceTier: 'premium',
      originalPrice: 58000,
      dealPrice: 45000,
      savingsPct: 22,
      guestCount: 'Up to 25 Guests',
      duration: '6 Hours',
      location: 'Resort / Private Villa',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Boho Champagne Teepee Setup & Photo Ring',
        'Professional Mixologist & Unlimited Mocktails',
        'Polaroid Photo Booth with Props',
        'Luxury Favor Baskets for Bridesmaids'
      ],
      vendorIds: ['v-1', 'v-4']
    },
    {
      id: 'pkg-185000-wed',
      title: 'Fairytale Royal Wedding Special',
      category: 'luxury',
      originalPrice: 240000,
      dealPrice: 185000,
      savingsPct: 23,
      guestCount: 'Up to 200 Guests',
      duration: 'Full Day',
      location: 'Palace / Luxury Resort',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Full Stage & Mandap Fresh Floral Decoration',
        'Cinematic Drone & 4K Videography + Album',
        'Gourmet Buffet Catering (3 Starters, 5 Mains, Desserts)',
        'Bridal HD Makeup & Hairstyling',
        'Live Acoustic Singer & Saxophonist'
      ],
      vendorIds: ['v-1', 'v-3', 'v-4', 'v-8']
    }
  ],

  // 12+ Expanded Demo Vendors Across All Categories
  vendors: [
    {
      id: 'v-1',
      name: 'Bloom & Beyond Decor',
      category: 'decor',
      categoryName: 'Floral & Balloon Decor',
      rating: 4.9,
      reviewCount: 128,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available Today in 2 Hours',
      startingPrice: 8500,
      location: 'Indiranagar, Bangalore',
      serviceRadiusKm: 25,
      responseTime: '15 mins',
      coverImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
      description: 'Award-winning event decorators specializing in organic balloon installations, floral mandaps, neon backdrops, and theme setups across Bangalore.',
      portfolio: [
        'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Basic Balloon Decor', price: 8500, desc: '200 Metallic Balloons, Arch, Foil Banner' },
        { name: 'Theme Stage Decor', price: 18500, desc: '8x10 Backdrop, Organic Arch, Neon Sign' }
      ],
      maxBookingsPerDay: 4,
      bookedDates: ['2026-08-20', '2026-08-25']
    },
    {
      id: 'v-2',
      name: 'Little Wonders Entertainment',
      category: 'kids_ent',
      categoryName: "Kids' Entertainment & Games",
      rating: 4.8,
      reviewCount: 94,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available Within 3 Hours',
      startingPrice: 6000,
      location: 'Koramangala, Bangalore',
      serviceRadiusKm: 20,
      responseTime: '20 mins',
      coverImage: 'https://images.unsplash.com/photo-1566454825485-6923f549c96d?auto=format&fit=crop&w=800&q=80',
      description: 'Engaging entertainment for kids including illusions, magic shows, balloon sculpting, bouncy castles, and live mascot hosts.',
      portfolio: [
        'https://images.unsplash.com/photo-1566454825485-6923f549c96d?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Magic & Game Host', price: 6000, desc: '45-min Interactive Magic Show + Games' }
      ],
      maxBookingsPerDay: 3,
      bookedDates: ['2026-08-22']
    },
    {
      id: 'v-3',
      name: 'Royal Feast Caterers',
      category: 'cater',
      categoryName: 'Gourmet Catering & Live Counters',
      rating: 4.95,
      reviewCount: 210,
      verified: true,
      urgentAvailable: false,
      urgentNotice: 'Notice required: 2 days',
      startingPrice: 450,
      location: 'HSR Layout, Bangalore',
      serviceRadiusKm: 30,
      responseTime: '30 mins',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      description: 'Premium North Indian, South Indian, Pan-Asian, and Continental live buffet catering with hygienic live counters.',
      portfolio: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Classic Buffet (per plate)', price: 450, desc: '2 Starters, 4 Mains, Rotis, Rice, Desserts' }
      ],
      maxBookingsPerDay: 2,
      bookedDates: ['2026-08-28']
    },
    {
      id: 'v-4',
      name: 'Moments Studio & Drones',
      category: 'photo',
      categoryName: 'Photography & Videography',
      rating: 4.88,
      reviewCount: 156,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available This Week',
      startingPrice: 15000,
      location: 'Whitefield, Bangalore',
      serviceRadiusKm: 40,
      responseTime: '10 mins',
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      description: 'Capture candid moments, cinematic drone shots, traditional photography, and instant LED photobooth prints.',
      portfolio: [
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Party Essentials', price: 15000, desc: '4 Hours Candid Photo Coverage + 100 Edited Shots' }
      ],
      maxBookingsPerDay: 1,
      bookedDates: ['2026-08-30']
    },
    {
      id: 'v-5',
      name: 'Sweet Tooth Artisan Bakery',
      category: 'cake',
      categoryName: 'Custom Cakes & Dessert Tables',
      rating: 4.92,
      reviewCount: 88,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Express 4-Hour Cake Delivery',
      startingPrice: 1800,
      location: 'Jayanagar, Bangalore',
      serviceRadiusKm: 18,
      responseTime: '5 mins',
      coverImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted fondant cakes, dessert hampers, macarons, cupcakes, and customized theme dessert bars.',
      portfolio: [
        'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: '2-Tier Theme Cake (2.5 kg)', price: 3500, desc: 'Custom Fondant Design, Egg/Eggless' }
      ],
      maxBookingsPerDay: 6,
      bookedDates: []
    },
    {
      id: 'v-6',
      name: 'Grand Pavilion Palms & Hall',
      category: 'venue',
      categoryName: 'Venues & Banquet Halls',
      rating: 4.75,
      reviewCount: 72,
      verified: true,
      urgentAvailable: false,
      urgentNotice: 'Advance Booking Only',
      startingPrice: 45000,
      location: 'Electronic City, Bangalore',
      serviceRadiusKm: 50,
      responseTime: '45 mins',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      description: 'Air-conditioned banquet hall with outdoor poolside lawn, valets, and seating capacity up to 400 guests.',
      portfolio: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Hall Rental (6 Hours)', price: 45000, desc: 'AC Hall, Stage, Chairs & Basic Lighting' }
      ],
      maxBookingsPerDay: 1,
      bookedDates: ['2026-08-25', '2026-09-01']
    },
    {
      id: 'v-7',
      name: 'Star Beats DJ & Sound',
      category: 'dj',
      categoryName: 'DJ & Sound System',
      rating: 4.85,
      reviewCount: 112,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available Today',
      startingPrice: 9500,
      location: 'Indiranagar, Bangalore',
      serviceRadiusKm: 30,
      responseTime: '15 mins',
      coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      description: 'High-energy DJ setup with JBL sound towers, laser lights, fog machines, and Bollywood/EDM music mixes.',
      portfolio: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Party DJ Setup (4 Hrs)', price: 9500, desc: '2 Speakers, DJ Console, Mic & Lights' }
      ],
      maxBookingsPerDay: 2,
      bookedDates: []
    },
    {
      id: 'v-8',
      name: 'Glamour Touch Bridal Makeup',
      category: 'beauty',
      categoryName: 'Makeup & Mehendi',
      rating: 4.94,
      reviewCount: 140,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available Within 4 Hours',
      startingPrice: 7500,
      location: 'Koramangala, Bangalore',
      serviceRadiusKm: 25,
      responseTime: '10 mins',
      coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      description: 'HD Bridal makeup, Airbrush makeup, party styling, hair extensions, and organic stain Mehendi artists.',
      portfolio: [
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Party HD Glam Makeup', price: 7500, desc: 'HD Makeup + Hairstyling + Saree Draping' }
      ],
      maxBookingsPerDay: 3,
      bookedDates: []
    },
    {
      id: 'v-9',
      name: 'Enchanted Floral Studio',
      category: 'decor',
      categoryName: 'Floral & Stage Decor',
      rating: 4.89,
      reviewCount: 65,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available This Week',
      startingPrice: 12000,
      location: 'Sadashivnagar, Bangalore',
      serviceRadiusKm: 35,
      responseTime: '20 mins',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury exotic floral design, vintage drapes, mandap structures, and botanical photobooths.',
      portfolio: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Botanical Photo Ring', price: 12000, desc: '6ft Floral Ring, Neon Sign & Spotlight' }
      ],
      maxBookingsPerDay: 2,
      bookedDates: []
    },
    {
      id: 'v-10',
      name: 'Fusion Table Gourmet Live',
      category: 'cater',
      categoryName: 'Food & Live Counters',
      rating: 4.82,
      reviewCount: 78,
      verified: true,
      urgentAvailable: false,
      urgentNotice: 'Notice required: 1 day',
      startingPrice: 550,
      location: 'Whitefield, Bangalore',
      serviceRadiusKm: 30,
      responseTime: '25 mins',
      coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      description: 'Live Woodfired Pizza, Mexican Taco Bar, Dim Sum Steamers, and Artisanal Ice Cream Rolls.',
      portfolio: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Live Taco & Pizza Station', price: 550, desc: 'Per plate cost for 30+ guests' }
      ],
      maxBookingsPerDay: 3,
      bookedDates: []
    },
    {
      id: 'v-11',
      name: 'Pixel Frame LED Photobooths',
      category: 'photo',
      categoryName: 'Photobooths & 360 Spin',
      rating: 4.91,
      reviewCount: 83,
      verified: true,
      urgentAvailable: true,
      urgentNotice: 'Available Today',
      startingPrice: 8000,
      location: 'HSR Layout, Bangalore',
      serviceRadiusKm: 25,
      responseTime: '15 mins',
      coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      description: '360-degree video platform spinner, instant digital polaroids, custom branded photo overlays.',
      portfolio: [
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: '360 Video Booth (3 Hrs)', price: 8000, desc: 'Includes Operator, Props & Unlimited Downloads' }
      ],
      maxBookingsPerDay: 4,
      bookedDates: []
    },
    {
      id: 'v-12',
      name: 'Royal Velvet Banquets',
      category: 'venue',
      categoryName: 'Venues & Halls',
      rating: 4.88,
      reviewCount: 95,
      verified: true,
      urgentAvailable: false,
      urgentNotice: 'Advance Booking Only',
      startingPrice: 35000,
      location: 'MG Road, Bangalore',
      serviceRadiusKm: 40,
      responseTime: '30 mins',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury indoor hall in city center with crystal chandeliers, bridal greenrooms, and valet parking.',
      portfolio: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
      ],
      packages: [
        { name: 'Prime AC Banquet Hall', price: 35000, desc: '5 Hours Venue Rental + Stage' }
      ],
      maxBookingsPerDay: 1,
      bookedDates: []
    }
  ],

  initialEvents: [
    {
      id: 'evt-1',
      title: "Anushka's 25th Birthday Celebration",
      type: 'birthday',
      date: '2026-09-25',
      location: 'Bangalore',
      guestCount: 50,
      totalBudget: 50000,
      spentBudget: 36000,
      checklist: [
        { id: 'c1', task: 'Reserve Venue', done: true, cost: 15000 },
        { id: 'c2', task: 'Book Balloon Decor', done: true, cost: 12000 },
        { id: 'c3', task: 'Order 3kg Cake', done: true, cost: 3500 },
        { id: 'c4', task: 'Book Photographer', done: true, cost: 5500 },
        { id: 'c5', task: 'Book DJ & Music System', done: false, cost: 0 }
      ]
    }
  ],

  initialBookings: [
    {
      id: 'AUR-89021',
      vendorId: 'v-1',
      vendorName: 'Bloom & Beyond Decor',
      eventTitle: "Anushka's 25th Birthday Celebration",
      date: '2026-09-25',
      timeSlot: '04:00 PM - 07:00 PM',
      packageBooked: 'Theme Stage Decor',
      status: 'Confirmed',
      totalAmount: 18500,
      depositPaid: 5000,
      balanceDue: 13500,
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AUR-89021'
    }
  ],

  supportTopics: [
    { id: 'booking', name: 'Booking Help', icon: '📅', desc: 'Reschedule, add details or modify bookings' },
    { id: 'refund', name: 'Refund & Deposit Policy', icon: '💰', desc: 'Track deposit returns and refund status' },
    { id: 'cancel', name: 'Cancellation Request', icon: '❌', desc: 'Cancel confirmed event bookings' },
    { id: 'payment', name: 'Payment Issue', icon: '💳', desc: 'UPI failure, card deduction or invoice help' },
    { id: 'vendor', name: 'Vendor Issue / Replacement', icon: '🤝', desc: 'Vendor non-response or emergency replacement' },
    { id: 'general', name: 'General Auresta Support', icon: '✨', desc: 'Feedback, concierge or gift vouchers' }
  ]
};
