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
  ],

  /* ── Smart Support Q&A Knowledge Base ── */
  supportQA: [
    // 1–20: General Support
    { keywords: ['hi','hello','hey','help','account','assist'], q: 'Hi, I need help with my account.', a: "Of course! I'd be happy to help. Could you please tell me what issue you're facing?" },
    { keywords: ['contact','customer support','reach support'], q: 'How can I contact customer support?', a: "You're already connected with customer support. Please tell me how I can assist you." },
    { keywords: ['available','online','right now'], q: 'Are you available right now?', a: "Yes, we're available and ready to help." },
    { keywords: ['problem','issue','trouble','facing'], q: "I'm having a problem with your service.", a: "I'm sorry you're experiencing an issue. Please share a few details about the problem so I can assist you." },
    { keywords: ['order','help order'], q: 'Can you help me with my order?', a: 'Absolutely. Please provide your order number, and I\'ll help you check it.' },
    { keywords: ['order number','find order number','where order'], q: 'Where can I find my order number?', a: 'You can find it in your order confirmation email or under the "My Orders" section of your account.' },
    { keywords: ['cant find order','cannot find my order','missing order'], q: "I can't find my order.", a: "No worries. Please share the email or phone number associated with your account so we can locate it." },
    { keywords: ['how long','response time','reply time'], q: 'How long does customer support take to respond?', a: 'We aim to respond as quickly as possible. Most queries are handled within a few minutes.' },
    { keywords: ['human agent','real person','speak to human','live agent'], q: 'Can I speak to a human agent?', a: 'Certainly. I can connect you with a support representative who can assist you further.' },
    { keywords: ['urgent','emergency','urgently'], q: 'I need help urgently.', a: "I understand. I'll prioritize your request and help you resolve it as quickly as possible." },
    { keywords: ['explain','someone explain'], q: 'Is there someone who can explain this to me?', a: "Absolutely. I'll explain it step by step so everything is clear." },
    { keywords: ['dont understand','not understand','how this works'], q: "I don't understand how this works.", a: "No problem. I'd be happy to walk you through the process." },
    { keywords: ['check this','verify this','check for me'], q: 'Can you check this for me?', a: 'Sure. Please provide the relevant order, account, or transaction details.' },
    { keywords: ['confused','what do i','dont know what'], q: "I'm confused about what I need to do.", a: "Don't worry. I'll guide you through each step." },
    { keywords: ['help me now','help right now'], q: 'Can you help me right now?', a: "Yes, definitely. Tell me what's happening, and we'll work through it together." },
    { keywords: ['question about service','know about service'], q: 'I have a question about your service.', a: 'Of course. What would you like to know?' },
    { keywords: ['more information','find information','where to find'], q: 'Where can I find more information?', a: 'You can check our Help Center, or I can provide the information you need here.' },
    { keywords: ['weekend','sunday','saturday','off days'], q: 'Do you provide support on weekends?', a: 'Support availability depends on the service and region. I can help you with your request here.' },
    { keywords: ['explain again','repeat','say again'], q: 'Can you explain the process again?', a: "Certainly. I'll explain it again in a simpler way." },
    { keywords: ['thanks','thank you','ty','thx','helped me'], q: 'Thanks for helping me.', a: "You're very welcome! I'm glad I could help." },

    // 21–40: Orders & Delivery
    { keywords: ['where is my order','track my order','order status'], q: 'Where is my order?', a: 'I can help you track it. Please share your order number.' },
    { keywords: ['not arrived','not received yet','order not come'], q: "My order hasn't arrived yet.", a: "I'm sorry about the delay. Let me help you check the latest delivery status." },
    { keywords: ['when will arrive','delivery date','estimated delivery'], q: 'When will my order arrive?', a: 'Please provide your order number so I can check the estimated delivery date.' },
    { keywords: ['can i track','track order','tracking link'], q: 'Can I track my order?', a: 'Yes. You can track it from the "My Orders" section using your order number.' },
    { keywords: ['tracking not updated','tracking stuck','tracking info'], q: "My tracking information hasn't updated.", a: "I understand. Sometimes tracking updates can take some time. I can help you check the current status." },
    { keywords: ['order delayed','late delivery','order late'], q: 'My order is delayed.', a: "I apologize for the delay. Let me check the latest update and estimated delivery time for you." },
    { keywords: ['change address','delivery address','update address'], q: 'Can I change my delivery address?', a: "If the order hasn't been shipped yet, we may be able to update the address. Please share your order number." },
    { keywords: ['change delivery date','reschedule delivery'], q: 'Can I change the delivery date?', a: 'Depending on the shipment status, we may be able to reschedule the delivery.' },
    { keywords: ['delivery person','courier not contacted','no call from delivery'], q: "The delivery person hasn't contacted me.", a: "I'm sorry about that. Let me check the delivery status and see what options are available." },
    { keywords: ['says delivered','marked delivered','not received','delivered but'], q: 'My package says delivered, but I didn\'t receive it.', a: "I'm sorry to hear that. Please check with others at your address and nearby delivery locations. If it's still missing, we can investigate further." },
    { keywords: ['wrong product','incorrect item','received wrong'], q: 'I received the wrong product.', a: "I'm sorry about the mistake. Please share your order number and a photo of the product received so we can assist with a replacement or return." },
    { keywords: ['damaged','package damaged','broken item'], q: 'My package arrived damaged.', a: "I'm sorry about the damage. Please send us photos of the package and product so we can help resolve this." },
    { keywords: ['missing item','item missing','one item missing'], q: 'One item is missing from my order.', a: "I apologize for the inconvenience. Please provide your order number, and we'll check the shipment details." },
    { keywords: ['cancel order','want to cancel','cancellation'], q: 'Can I cancel my order?', a: "If the order hasn't been processed or shipped, cancellation may be possible. Please share your order number." },
    { keywords: ['cancelled automatically','order got cancelled','auto cancel'], q: 'My order was cancelled automatically.', a: "I'm sorry about that. Let me check the reason for the cancellation and explain what happened." },
    { keywords: ['place order','order over chat'], q: 'Can I place an order over chat?', a: 'If this service is supported, I can guide you through the ordering process.' },
    { keywords: ['express delivery','fast delivery','quick shipping'], q: 'Is express delivery available?', a: 'Express delivery may be available for selected locations and products. Please provide your delivery location.' },
    { keywords: ['why delay','why so long','taking long'], q: 'Why is delivery taking so long?', a: 'Delays can happen due to high demand, weather, logistics, or other unforeseen circumstances. I\'ll help you check the specific status of your order.' },
    { keywords: ['same day','deliver today','today delivery'], q: 'Can someone deliver my order today?', a: 'I can check whether same-day delivery is available for your order and location.' },
    { keywords: ['wrong address','entered wrong address','incorrect address'], q: 'I entered the wrong address.', a: "Don't worry. If your order hasn't shipped yet, we may be able to update the delivery address." },

    // 41–60: Payments & Refunds
    { keywords: ['payment failed','transaction failed','payment not done'], q: 'My payment failed.', a: "I'm sorry about that. Please try the payment again or use another available payment method." },
    { keywords: ['money deducted','amount deducted','charged but order'], q: 'My money was deducted but my order wasn\'t placed.', a: "I understand your concern. Please share the transaction details, and we can help verify the payment status." },
    { keywords: ['when refund','refund time','refund how long'], q: 'When will I receive my refund?', a: 'Refund processing times depend on the payment method and bank. Once processed, it may take several business days to appear in your account.' },
    { keywords: ['not received refund','refund not received','no refund'], q: "I haven't received my refund.", a: "I'm sorry about the delay. Please provide your order number or refund reference so we can check its status." },
    { keywords: ['can i get refund','want refund','refund request'], q: 'Can I get a refund for my order?', a: 'Refund eligibility depends on the product and reason for the request. Please share your order details.' },
    { keywords: ['charged twice','double charge','duplicate payment'], q: 'Why was I charged twice?', a: "I'm sorry about that. Please provide the transaction details so we can determine whether it was a duplicate charge or a temporary authorization." },
    { keywords: ['payment methods','how to pay','modes of payment'], q: 'What payment methods do you accept?', a: 'Available payment methods can vary by location. You\'ll see the supported options during checkout.' },
    { keywords: ['credit card','pay card'], q: 'Can I pay with a credit card?', a: 'Yes, if credit-card payments are supported for your location and order.' },
    { keywords: ['upi','gpay','phonepe','pay upi'], q: 'Can I pay using UPI?', a: 'If UPI is available for your location, it will appear as a payment option during checkout.' },
    { keywords: ['cash on delivery','cod','pay cash'], q: 'Can I pay cash on delivery?', a: 'Cash on delivery may be available for selected products and locations.' },
    { keywords: ['card declined','card not working','declined'], q: 'Why did my card get declined?', a: 'Your bank may have declined the transaction. Please verify your card details or contact your bank if the problem continues.' },
    { keywords: ['is payment secure','secure payment','safe to pay'], q: 'Is my payment secure?', a: 'We use security measures designed to protect your payment and account information.' },
    { keywords: ['change payment','payment method change'], q: 'Can I change my payment method after ordering?', a: 'Payment methods usually cannot be changed after an order is placed, but I can help you check your options.' },
    { keywords: ['coupon','discount not applied','coupon not working'], q: "I used a coupon, but the discount wasn't applied.", a: "I'm sorry about that. Please share the coupon code and order details so we can check its eligibility." },
    { keywords: ['promo code','promo not working','promo error'], q: "My promo code isn't working.", a: "Please share the promo code and the error message you're seeing, and I'll help you troubleshoot it." },
    { keywords: ['refund different card','refund another card'], q: 'Can I get a refund to a different card?', a: 'Refunds are generally returned to the original payment method for security reasons.' },
    { keywords: ['refund amount','why less refund','partial refund'], q: 'Why is my refund amount different?', a: 'The final refund may be affected by discounts, taxes, shipping charges, or other applicable adjustments. I can check the details for you.' },
    { keywords: ['delivery fee','shipping charge','why charged delivery'], q: 'I was charged a delivery fee. Why?', a: 'Delivery fees can depend on location, order value, delivery speed, and other factors.' },
    { keywords: ['installment','emi','pay later'], q: 'Do you offer installment payments?', a: 'Installment options may be available for eligible orders and payment methods.' },
    { keywords: ['confirm payment','payment went through','payment successful'], q: 'Can you confirm whether my payment went through?', a: 'Absolutely. Please provide your transaction or order details, and I\'ll help verify the payment status.' },

    // 61–75: Account & Login
    { keywords: ['forgot password','reset password'], q: 'I forgot my password.', a: 'No problem. Select "Forgot Password" on the login page and follow the instructions to reset it.' },
    { keywords: ['cant login','cannot log in','login issue','sign in problem'], q: "I can't log into my account.", a: "I'm sorry you're having trouble. Please check your login details and try resetting your password if needed." },
    { keywords: ['forgot email','dont know email','lost email'], q: 'I forgot my email address.', a: 'We can help you identify the account using the available account-recovery options.' },
    { keywords: ['account locked','locked out'], q: 'My account is locked.', a: 'For security reasons, accounts may be temporarily locked after multiple unsuccessful login attempts. Please follow the account-recovery process.' },
    { keywords: ['change password','update password','new password'], q: 'How do I change my password?', a: 'Go to your account settings, select "Security" or "Password," and follow the instructions.' },
    { keywords: ['change email','update email','new email'], q: 'How do I change my email address?', a: 'You can usually update your email under account settings. You may be asked to verify the new address.' },
    { keywords: ['change phone','update phone','new number'], q: 'How do I change my phone number?', a: 'Go to your profile or account settings and update your phone number. Verification may be required.' },
    { keywords: ['not receiving code','otp not received','verification code'], q: "I'm not receiving the verification code.", a: "Please check your spam folder and make sure your phone number or email address is correct. You can also request a new code." },
    { keywords: ['code expired','otp expired'], q: 'My verification code expired.', a: 'No problem. Please request a new verification code and enter it as soon as you receive it.' },
    { keywords: ['delete account','remove account','close account'], q: 'How do I delete my account?', a: 'You can usually request account deletion from your account settings or privacy section.' },
    { keywords: ['multiple accounts','two accounts','more than one account'], q: 'Can I have more than one account?', a: 'This depends on our account policy. Please check the applicable terms for your service.' },
    { keywords: ['hacked','someone accessed','unauthorized access'], q: 'Someone accessed my account.', a: "I'm sorry to hear that. Please change your password immediately and enable two-factor authentication if available." },
    { keywords: ['suspicious email','phishing','fake email'], q: 'I received a suspicious email about my account.', a: "Please don't click any suspicious links or share your password. If you send us the details without sensitive information, we can help identify the issue." },
    { keywords: ['update profile','change profile','edit profile'], q: 'How do I update my profile information?', a: 'Go to your profile settings and select the information you want to update.' },
    { keywords: ['deactivate','pause account','temporarily disable'], q: 'Can I temporarily deactivate my account?', a: 'If temporary deactivation is supported, you can usually find that option in your account settings.' },

    // 76–90: Technical Support
    { keywords: ['website not loading','site not opening','page not loading'], q: "The website isn't loading.", a: "I'm sorry about that. Please refresh the page and check your internet connection. If the issue continues, try another browser." },
    { keywords: ['app crashing','app crash','app keeps crashing'], q: 'The app keeps crashing.', a: "Please restart the app and make sure you're using the latest version. If the problem continues, reinstalling the app may help." },
    { keywords: ['website slow','site slow','loading slow'], q: 'The website is very slow.', a: 'Please check your internet connection and try refreshing the page. Clearing your browser cache may also help.' },
    { keywords: ['error message','getting error','showing error'], q: "I'm getting an error message.", a: "Please tell me the exact error message or share a screenshot, and I'll help you troubleshoot it." },
    { keywords: ['page stuck','stuck loading','infinite loading'], q: 'The page is stuck loading.', a: "Please refresh the page and check your internet connection. If that doesn't work, try opening it in a private/incognito window." },
    { keywords: ['app update','cant update app','update failed'], q: "The app won't update.", a: "Please check your device's available storage and internet connection, then try updating the app again." },
    { keywords: ['cant upload','upload not working','file upload'], q: "I can't upload a file.", a: "Please check the file size and supported file formats. If those are correct, try refreshing the page and uploading again." },
    { keywords: ['notification not working','no notification','push notification'], q: "My notification isn't working.", a: "Please check that notifications are enabled both in the app and in your device settings." },
    { keywords: ['cant download invoice','download invoice','get invoice'], q: "I can't download my invoice.", a: "Please try refreshing the page and downloading it again. If the issue continues, I can help you find another way to access it." },
    { keywords: ['search not working','search broken','cant search'], q: "The search function isn't working.", a: "Please refresh the page and try a different search term. If the problem continues, let me know what you searched for." },
    { keywords: ['profile picture','upload photo','cant upload image'], q: "I'm unable to upload my profile picture.", a: "Please check that the image format and size meet the requirements, then try uploading it again." },
    { keywords: ['button not working','button broken','clicking button'], q: "The button isn't working.", a: "Please refresh the page and try again. If it still doesn't work, tell me which button you're clicking and what happens." },
    { keywords: ['blank screen','white screen','nothing on screen'], q: "I'm seeing a blank screen.", a: "Please refresh the page and try clearing your browser cache. You can also try another browser." },
    { keywords: ['says offline','shows offline','internet works but app'], q: "The app says I'm offline, but my internet works.", a: "Please restart the app and check whether it has permission to use mobile data or Wi-Fi." },
    { keywords: ['nothing working','nothing works','everything broken'], q: "Nothing is working.", a: "I'm sorry you're having such a frustrating experience. Let's troubleshoot it step by step and identify exactly where the problem is." },

    // 91–100: Complaints & Closing
    { keywords: ['disappointed','not happy','bad experience','unhappy'], q: "I'm really disappointed with your service.", a: "I'm sorry we didn't meet your expectations. I'd like to understand what went wrong and help make it right." },
    { keywords: ['unacceptable','not acceptable','this is wrong'], q: 'This is unacceptable.', a: "I completely understand your frustration. Let me review the issue and see what we can do to resolve it." },
    { keywords: ['contacted several times','already called','already wrote','multiple times'], q: "I've contacted support several times already.", a: "I'm sorry you've had to contact us repeatedly. Let me review the situation carefully so we can work toward a proper resolution." },
    { keywords: ['nobody helped','no one helped','not helped'], q: 'Nobody has helped me so far.', a: "I apologize for the experience. I'll do my best to address the issue and provide you with a clear next step." },
    { keywords: ['speak to manager','talk to supervisor','escalate'], q: 'I want to speak to a manager.', a: 'Certainly. I can escalate your request to a supervisor or the appropriate support team.' },
    { keywords: ['compensation','refund compensation','goodwill'], q: 'Can you compensate me for the inconvenience?', a: "I understand why you're asking. I'll check whether any compensation or goodwill option is available for your situation." },
    { keywords: ['formal complaint','lodge complaint','raise complaint'], q: 'I want to make a formal complaint.', a: 'Of course. I can help you submit a formal complaint and make sure the relevant details are recorded.' },
    { keywords: ['is issue resolved','resolved now','fixed'], q: 'Is my issue resolved now?', a: 'Based on the steps we\'ve completed, the issue should now be resolved. Please let me know if you experience the problem again.' },
    { keywords: ['do i need to do anything','anything else','what next'], q: 'Do I need to do anything else?', a: 'No further action is needed from you at this time. If anything changes, you can contact us again.' },
    { keywords: ['thank you for help','thanks for support','thank you support'], q: 'Thank you for your help.', a: "You're very welcome! Thank you for contacting support. Have a great day!" }
  ],

  /* ── Suggested Quick Questions per topic ── */
  supportSuggestions: {
    general: [
      'How can I contact customer support?',
      'Are you available right now?',
      'Can you help me right now?'
    ],
    booking: [
      'Can I cancel my order?',
      'Can I change my delivery address?',
      'Can I change the delivery date?'
    ],
    refund: [
      'When will I receive my refund?',
      "I haven't received my refund.",
      'Why is my refund amount different?'
    ],
    payment: [
      'My payment failed.',
      'My money was deducted but my order wasn\'t placed.',
      'Can you confirm whether my payment went through?'
    ],
    cancel: [
      'Can I cancel my order?',
      'My order was cancelled automatically.',
      'Can I get a refund for my order?'
    ],
    vendor: [
      'I received the wrong product.',
      'My package arrived damaged.',
      'I want to speak to a manager.'
    ],
    account: [
      'I forgot my password.',
      "I can't log into my account.",
      'How do I delete my account?'
    ],
    technical: [
      "The website isn't loading.",
      'The app keeps crashing.',
      "I'm getting an error message."
    ]
  }
};
