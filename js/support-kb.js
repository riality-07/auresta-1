/* =========================================================
   AURESTA — LOCAL CHAT SUPPORT KNOWLEDGE SYSTEM  (v2)
   ---------------------------------------------------------
   Fully client-side. No network calls, no API keys, no
   external AI services. Answers are grounded in the facts
   present in this app (data.js / state.js / app.js).

   Matching engine understands different phrasings of the
   same question: lowercasing, punctuation stripping, token
   overlap scoring, phrase substring matching, and synonym
   expansion. The existing generic `supportQA` table inside
   data.js is used as a second-tier generic fallback.
   ========================================================= */

(function () {

  'use strict';

  /* ---------------------------------------------------------
     Text utilities
  --------------------------------------------------------- */

  var STOP = new Set([
    'a','an','the','is','are','am','was','were','be','been','can','could','will','would',
    'should','shall','may','might','must','do','does','did','done','to','of','for','on',
    'at','in','with','and','or','but','if','my','me','i','im','you','your','yours','we',
    'our','its','it','this','that','these','those','how','what','where','when','why',
    'who','which','please','tell','me','about','have','has','had','get','got','give',
    'just','need','wanna','want','go','going','there','here','some','any','also','too'
  ]);

  var SEQ_NUMBERS = {
    '2':'two','3':'three','4':'four','5':'five','6':'six','8':'eight','10':'ten','12':'twelve'
  };

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9#]+/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(text) {
    return normalize(text)
      .split(' ')
      .filter(function (w) { return w !== '' && !STOP.has(w); })
      .map(function (w) { return SEQ_NUMBERS[w] || w; });
  }

  /* Synonym expansion so "photographer" matches "photography",
     "need it now" matches "urgent", "deco" matches "decoration". */
  var SYNONYM_EXPANSION = {
    photographer: ['photography','photo','photographer','videography','video','drone','candid'],
    photography:  ['photographer','photo','videography','video','drone','candid','photobooth','360'],
    decor:        ['decor','decoration','decorations','deco','decorator','decorators','balloon','balloons','floral','flower','flowers','theme','backdrop','stage'],
    cater:        ['catering','caterer','caterers','cater','food','buffet','cuisine','counters','menu'],
    venue:        ['venue','venues','hall','banquet','banquets','rooms','function','lawn','resort','place'],
    dj:           ['dj','music','sound','speakers','party dj','bollywood','edm'],
    cake:         ['cake','cakes','bakery','dessert','desserts','pastry','fondant','confectionery'],
    makeup:       ['makeup','mehendi','mehndi','bridal','hair','hairdo','styling','beauty','glam'],
    kids:         ['kids','kid','child','children','babyshow','mascot','magic','bouncy','balloon sculpting'],
    booking:      ['booking','bookings','book','reserve','reservation','slot','booking help'],
    deposit:      ['deposit','down payment','advance','protection fee','voucher'],
    urgent:       ['urgent','urgently','immediately','right away','need it now','same day','today','emergency','express','instant','quick','fast'],
    refund:       ['refund','refunds','refunded','refundable','money back','reversal'],
    cancel:       ['cancel','cancellation','cancelled','canceled','cancelation'],
    payment:      ['payment','pay','upi','payments','paying','paid','transaction'],
    verification: ['verified','verification','verify','verified vendor','legit','trustworthy','gst','business id','badge','approved'],
    package:      ['package','packages','deal','deals','bundle','bundles','plan','tier','budget'],
    vendor:       ['vendor','vendors','service provider','providers','supplier','suppliers','partner'],
    price:        ['price','prices','pricing','cost','costs','rate','rates','charge','charges','quote','quotes','afford'],
    location:     ['location','locations','locality','area','areas','city','bangalore','radius'],
    support:      ['support','help','assist','assistance','concierge','agent','representative','desk','helpline','team','service'],
    calendar:     ['calendar','availability','available','capacity','slot','schedule','scheduled','booked','open date'],
    event:        ['event','events','party','celebration','occasion','function','guests'],
    wedding:      ['wedding','weddings','marriage','shaadi','bride','bridal'],
    birthday:     ['birthday','bday','birthday party'],
    account:      ['account','accounts','login','login in','log in','sign in','sign up','signup','password','email','profile']
  };

  function expand(tokens) {
    var result = [];
    tokens.forEach(function (t) {
      result.push(t);
      var list = SYNONYM_EXPANSION[t];
      if (list) list.forEach(function (s) { result.push(s); });
    });
    return result;
  }

  /* ---------------------------------------------------------
     The Auresta-specific knowledge base.
     Each entry: id, topic, p (patterns), a (answer).
     Patterns are alternative phrasings of the same question.
  --------------------------------------------------------- */

  var intents = [

    /* ─── 1. About Auresta & the platform ─── */
    {
      id: 'what-is-auresta', topic: 'About Auresta', p: [
        'what is auresta', 'whats auresta', 'what is this site', 'about auresta', 'tell me about auresta',
        'what does auresta do', 'what is this platform', 'who is auresta', 'auresta meaning'
      ],
      a: "Auresta is your event-planning companion — “Where Moments Turn Golden.” We bring verified vendors together in one place so you can discover, compare prices, build a custom package, and book your whole celebration — a birthday, wedding, engagement, or anything in between — without juggling ten apps. Everything on Auresta lives in one flow: browse real availability, lock a date, and let the platform sync your booking in real time."
    },
    {
      id: 'how-it-works', topic: 'How Auresta works', p: [
        'how does auresta work', 'how auresta works', 'how it works', 'how do i use auresta',
        'how to use this site', 'process of booking', 'what is the process', 'how to plan an event here',
        'steps to book', 'how to book an event step by step'
      ],
      a: "It's a simple four-step flow: 1) Browse — search verified vendors by location, date, guest count and budget on the Explore page; 2) Compare — sort by rating or price and check each vendor's real calendar; 3) Combine — build your own package category by category on the Build Package page, or grab a ready-made bundle deal; 4) Book — pay a 20% deposit to lock the date, and the vendor's calendar updates live."
    },
    {
      id: 'slogan', topic: 'About Auresta', p: [
        'what does where moments turn golden mean', 'slogan', 'tagline', 'motto', 'brand slogan', 'why golden'
      ],
      a: "Auresta's tagline is “Where Moments Turn Golden.” It's our promise that every celebration we help you plan — big or small — turns into something you'll remember forever. The crown in our logo is a nod to that same idea."
    },

    /* ─── 2. Locations & reach ─── */
    {
      id: 'locations', topic: 'Locations', p: [
        'where do you operate', 'which cities', 'locations available', 'are you in my city',
        'do you work in', 'which areas do you serve', 'service area', 'where are you based',
        'which locations', 'service locations', 'is bangalore supported', 'other cities'
      ],
      a: "Auresta currently operates across Bangalore. You'll find vendors in Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, Electronic City, Sadashivnagar, MG Road, and more, with venues reaching up to a 30–50 km service radius. When you search, just type or pick your locality and we'll show the vendors that can reach you."
    },
    {
      id: 'bangalore-only', topic: 'Locations', p: [
        'only bangalore', 'just bangalore', 'outside bangalore', 'not in bangalore', 'other city',
        'expanding to other cities', 'do you cover pune', 'do you cover mumbai', 'do you cover delhi'
      ],
      a: "Right now we're focused on Bangalore, so availability is strongest there. As the platform grows, more cities will follow. If you're planning an event in or around Bangalore we can help you today."
    },

    /* ─── 3. Event types & categories ─── */
    {
      id: 'event-types', topic: 'Event types', p: [
        'what events do you cover', 'event types', 'types of events', 'which events can i plan',
        'what parties can you do', 'kinds of events', 'event categories', 'what occasions', 'list of events'
      ],
      a: "Nine celebration types: Birthday, Wedding, Engagement, Kids' Party, Corporate Event, Baby Shower, Bachelorette, Anniversary, and House Party. Each has its own handpicked vendor pool and ready-made package deals."
    },
    {
      id: 'wedding-planning', topic: 'Weddings', p: [
        'plan a wedding', 'wedding planning', 'wedding help', 'how to plan my wedding',
        'wedding decor', 'wedding vendors', 'shaadi help', 'wedding package', 'fairytale royal wedding'
      ],
      a: "For weddings we bring the full crew under one roof — floral mandap & stage decor, gourmet catering, cinematic photography and drone coverage, bridal makeup, live music and more. Our Fairytale Royal Wedding package bundles stage décor, 4K videography, buffet catering, bridal makeup and a live performer for up to 200 guests at ₹1,85,000 (was ₹2,40,000). Want it bespoke? The Build Package page lets you assemble exactly what you need."
    },
    {
      id: 'birthday-planning', topic: 'Birthdays', p: [
        'plan a birthday', 'birthday planning', 'birthday help', 'birthday package',
        'birthday vendors', 'birthday party idea', 'surprise birthday'
      ],
      a: "Birthdays are our bread and butter. You can start from an Essentials Birthday Starter at just ₹999 (balloons, banner, party packs, 60-min express setup) or go all out with the Grand Birthday Blast bundle at ₹28,500 — theme décor, fondant cake, photographer, DJ and a live mocktail counter for up to 50 guests."
    },
    {
      id: 'corporate-etc', topic: 'Event types', p: [
        'corporate event', 'office party', 'anniversary party', 'baby shower', 'bachelorette',
        'engagement party', 'kids party planning', 'house party help', 'bachelorette bash'
      ],
      a: "We cover corporate events, anniversaries, baby showers, bachelorettes, engagements, kids' parties and house parties too. Each category has dedicated vendors and curated deals — for example, the Glamour Bachelorette Bash (₹45,000) or the Cosy House Party Celebration (₹3,499). Tell me which one you're planning and I'll point you to the right page."
    },

    /* ─── 4. Vendors & categories ─── */
    {
      id: 'vendor-categories', topic: 'Vendors', p: [
        'what vendors do you have', 'vendor categories', 'types of vendors', 'service categories',
        'what services are available', 'list of vendor categories', 'kinds of vendors',
        'what categories of vendors', 'what can i hire'
      ],
      a: "Eight service categories: ✨ Decoration, 🍽️ Food & Catering, 📸 Photography & Drone, 🏰 Venues & Halls, 🎧 DJ & Music, 🎨 Kids' Entertainment, 🎂 Cakes & Desserts, and 💄 Makeup & Mehendi. You can multi-select these as filters on the Explore page and see vendors across all of them at once."
    },
    {
      id: 'top-vendors', topic: 'Vendors', p: [
        'top vendors', 'best vendors', 'recommended vendors', 'highest rated', 'best rated',
        'popular vendors', 'top rated', 'which vendor is best'
      ],
      a: "Customer favourites include Bloom & Beyond Decor (4.9★, 128 reviews), Royal Feast Caterers (4.95★, 210 reviews), Moments Studio & Drones (4.88★), Glamour Touch Bridal Makeup (4.94★) and Sweet Tooth Artisan Bakery (4.92★). On the Explore page you can sort by “Highest Rated” to see exactly what's near the top."
    },
    {
      id: 'vendor-pricing', topic: 'Pricing', p: [
        'how much do vendors cost', 'vendor prices', 'starting price', 'minimum price',
        'cheapest vendor', 'cost of vendor', 'how expensive', 'average vendor price', 'price range'
      ],
      a: "Prices start low: catering from ₹450 per plate (Royal Feast) or ₹550 (Fusion Table), cakes from ₹1,800, kids' entertainment from ₹6,000, beauty & makeup from ₹7,500, DJ setup from ₹9,500, décor from ₹8,500, photography from ₹8,000 (360 photo booth) or ₹15,000 (candid + drone), and venues from ₹35,000–₹45,000. Every vendor shows a clear “starting price” on their card so you can compare fast."
    },
    {
      id: 'vendor-ratings', topic: 'Vendors', p: [
        'are the vendors good', 'how are ratings', 'reviews', 'star rating', 'are reviews real',
        'vendor reviews', 'ratings real', 'verified reviews'
      ],
      a: "Every vendor carries a star rating, review count and a verification badge. Reviews are collected after confirmed bookings, and our Trust & Safety team reviews the policy to keep ratings genuine. On the marketplace you can toggle “Verified Vendors Only” to see just the badge-carrying pros."
    },
    {
      id: 'vendor-response', topic: 'Vendors', p: [
        'how fast do vendors reply', 'response time', 'vendor response', 'how quick do they respond',
        'reply time vendor', 'how soon will vendor respond'
      ],
      a: "Most vendors respond within 5–45 minutes (Sweet Tooth Bakery replies in ~5 mins, Moments Studio in ~10, Grand Pavilion in ~45). Response time is listed on each vendor profile, so you can pick someone who matches your speed."
    },
    {
      id: 'vendor-calendar', topic: 'Availability', p: [
        'vendor availability', 'is the vendor free on', 'check availability', 'available dates',
        'vendor calendar', 'is my date free', 'booked dates', 'open slots', 'see availability'
      ],
      a: "Each vendor has a live calendar. Open dates are selectable on their profile; booked dates are marked so you can't double-book. When you confirm a booking, your date is added to that vendor's calendar immediately — what you see is truth."
    },
    {
      id: 'vendor-locations', topic: 'Locations', p: [
        'which areas have vendors', 'where are the vendors located', 'vendor locations',
        'vendor in indiranagar', 'vendor near me', 'vendor in koramangala', 'closest vendor',
        'vendor in whitefield'
      ],
      a: "Vendors are spread across Bangalore: Bloom & Beyond (Indiranagar), Little Wonders (Koramangala), Royal Feast (HSR Layout), Moments Studio (Whitefield), Sweet Tooth (Jayanagar), Grand Pavilion (Electronic City), Star Beats (Indiranagar), Glamour Touch (Koramangala), Enchanted Floral (Sadashivnagar), and Royal Velvet (MG Road). The search box filters by your locality and each vendor lists its service radius in km."
    },
    {
      id: 'chat-with-vendor', topic: 'Vendors', p: [
        'chat with vendor', 'message the vendor', 'contact vendor', 'talk to vendor directly',
        'direct message vendor', 'how do i message vendor', 'vendor chat'
      ],
      a: "On a vendor's profile (or inside My Event for a confirmed booking) use the “Chat with Vendor” button. Your message goes straight to them, and they reply in the same thread — no emails, no phone tag."
    },

    /* ─── 5. Packages & deals ─── */
    {
      id: 'packages-overview', topic: 'Packages', p: [
        'what packages do you have', 'packages available', 'show me packages', 'package deals',
        'pre made packages', 'ready packages', 'list all packages', 'what are the deals', 'deals page'
      ],
      a: "We have curated bundles across every budget tier, starting from ₹999. Favourites: Essential Birthday Starter ₹999, Cosy House Party ₹3,499, Wonderland Kids ₹8,499, Golden Romance Anniversary ₹12,499, Grand Birthday Blast ₹28,500, Glamour Bachelorette ₹45,000 and Fairytale Royal Wedding ₹1,85,000. Every bundle saves you 22–33% off individual pricing."
    },
    {
      id: 'cheapest-package', topic: 'Packages', p: [
        'cheapest package', 'cheap package', 'lowest price package', 'most affordable',
        'least expensive', 'budget package', 'under 5000', 'starting at 999'
      ],
      a: "The Essentials Birthday Starter is our lowest-priced bundle at ₹999 (₹1,500 value) — 100 metallic balloon backdrop, a Happy Birthday foil banner, party caps & whistles for 15, with express setup in 60 minutes. On the Packages page, set the budget filter to “Budget (Under ₹5,000)” to see the full entry tier."
    },
    {
      id: 'budget-tiers', topic: 'Packages', p: [
        'budget tiers', 'price tiers', 'package price ranges', 'tiers of packages', 'tier',
        'luxury package', 'premium package', 'standard package', 'grand package', '5k 10k 25k'
      ],
      a: "Packages are grouped into five budget tiers: Budget (under ₹5,000), Standard (₹5,000–₹10,000), Premium (₹10,000–₹25,000), Grand (₹25,000–₹50,000) and Luxury (₹50,000+). The Packages page has a dropdown for each tier plus an event-type filter, so you can zero in fast."
    },
    {
      id: 'package-savings', topic: 'Packages', p: [
        'how much do i save', 'savings', 'why discounted', 'is it cheaper as a bundle',
        'bundle savings', 'discounts on packages', 'save percentage'
      ],
      a: "Bundles are priced 22–33% below the sum of their parts because you're buying coordinated services together. The savings percentage is printed right on each package card (e.g. Essentials Birthday Starter saves 33%). There are no promo codes needed — the discount is baked into the deal price."
    },
    {
      id: 'package-inclusions', topic: 'Packages', p: [
        'whats included in package', 'package inclusions', 'what comes with the package',
        'package details', 'whats in the deal', 'list inclusions', 'package contents'
      ],
      a: "Every package spells out its inclusions on the card — decor items, cake size, photography hours, DJ equipment, guest capacity and duration. Open any package on the Packages page and read the ✓ checklist before you book."
    },

    /* ─── 6. Build your own package ─── */
    {
      id: 'build-package', topic: 'Build Package', p: [
        'build my own package', 'custom package', 'build package', 'package builder',
        'customize my package', 'make my own bundle', 'combine vendors', 'custom event package',
        'build your own'
      ],
      a: "The “Build Package” page is a category-by-category customizer: pick a vendor for each service (decor, food, photography, venue, DJ, cake, etc.), and a live budget meter tracks your total against your limit — colour-coded green → amber → red as you approach or exceed it. When you're happy, hit “Proceed to Payment”."
    },
    {
      id: 'budget-tracker', topic: 'Build Package', p: [
        'budget meter', 'track my budget', 'stay within budget', 'over budget', 'budget planner',
        'how does the budget work', 'remaining budget', 'spent so far'
      ],
      a: "In the Build Package page, set your total budget once and Auresta tracks everything from there: selected vendors' totals, the exact ₹ spent, what's remaining, and a progress bar that turns amber past 75% and red past 90%. If you go over, it shows you the overage amount so you can swap a vendor out."
    },

    /* ─── 7. Booking & deposits ─── */
    {
      id: 'booking-process', topic: 'Bookings', p: [
        'how do i book', 'booking process', 'how to book a vendor', 'book a vendor',
        'make a booking', 'reserve a date', 'how to confirm', 'confirm booking', 'place booking'
      ],
      a: "Pick a vendor or package → choose an open date on the calendar → review the payment summary → pay a 20% deposit via UPI, card or net banking. Your booking locks the date immediately, and the vendor's calendar syncs in real time."
    },
    {
      id: 'deposit-policy', topic: 'Deposits', p: [
        'deposit policy', 'how much deposit', 'deposit amount', 'down payment',
        'how much do i pay now', 'advance payment', 'is deposit refundable'
      ],
      a: "Booking works on a 20% deposit: you pay roughly one-fifth of the service price now to secure the date, and the remaining balance is payable directly on the event day. The exact figures are always shown before you confirm — deposit now, balance later."
    },
    {
      id: 'remaining-balance', topic: 'Deposits', p: [
        'when is balance due', 'remaining balance', 'when do i pay the rest', 'balance due',
        'pay on event day', 'when to pay remaining', 'pay rest later', 'remaining amount'
      ],
      a: "The remaining ~80% is due directly to the service on event day — not in advance. Your booking summary shows the exact deposit paid and the balance due, and it also appears under My Event alongside each confirmed voucher."
    },
    {
      id: 'protection-fee', topic: 'Payments', p: [
        'protection fee', 'platform fee', 'why 499', '499 fee', 'auresta fees', 'service charge',
        'what is the platform fee'
      ],
      a: "Checkout includes a ₹499 Platform Protection Fee — but Auresta adds an identical ₹499 Savings Discount, so it nets to zero in your total. The two lines show up in the payment summary purely so you can see how booking protection is provided at no extra cost."
    },
    {
      id: 'booking-confirmation', topic: 'Bookings', p: [
        'confirmation', 'booking confirmation', 'voucher id', 'how do i know its booked',
        'get my receipt', 'booking reference', 'voucher', 'booking number'
      ],
      a: "The moment you pay, a confirmation screen appears with a voucher ID (format AUR-XXXXX), the vendor, date, deposit paid and remaining due — and the same details land under My Event. The vendor's calendar also marks that date booked instantly."
    },
    {
      id: 'my-bookings', topic: 'Bookings', p: [
        'my bookings', 'show my bookings', 'list my bookings', 'see my bookings',
        'my confirmed bookings', 'what have i booked', 'my vouchers', 'my reservations'
      ],
      a: "Your confirmed bookings live under My Event. Each entry shows the vendor, booking ID, date, status, the deposit already paid, and the balance remaining. From there you can also open a chat directly with the vendor."
    },
    {
      id: 'reschedule', topic: 'Bookings', p: [
        'reschedule booking', 'change my date', 'move my booking', 'reschedule event',
        'change event date', 'postpone my booking', 'shift my date'
      ],
      a: "Date changes depend on the vendor's live calendar — if a new open slot exists on the date you want, a reschedule is usually possible. Head to the “Booking Help” desk from the Support page and our team will handle the swap for you."
    },
    {
      id: 'add-guests', topic: 'Bookings', p: [
        'add guests', 'change guest count', 'update guests', 'increase guests',
        'more people', 'modify guest count', 'add people to booking'
      ],
      a: "Guest count changes are sent to the vendor for confirmation, since catering and capacity scale with headcount. Message the vendor directly from My Event, or raise it with the Booking Help desk."
    },

    /* ─── 8. Urgent / Need It Now ─── */
    {
      id: 'urgency-overview', topic: 'Need It Now', p: [
        'need it now', 'urgency', 'urgent vendor', 'need a vendor immediately', 'emergency vendor',
        'available today', 'need something fast', 'urgent booking'
      ],
      a: "Our “Need It Now” programme connects you with verified vendors ready to serve within 2 to 24 hours — same-day decor, express cake delivery, a photographer within hours, or a DJ today. Open the lightning ⚡ banner on the home page or the “Urgent & Express Event Vendors” page to see who's on call."
    },
    {
      id: 'available-today', topic: 'Need It Now', p: [
        'can anyone come today', 'available today', 'same day vendor', 'today only',
        'need it today', 'book for today', 'same day booking', 'within 3 hours'
      ],
      a: "Yes — several vendors are booked for today: Bloom & Beyond Décor (“Available Today in 2 Hours”), Star Beats DJ (“Available Today”), Pixel Frame 360 Photo Booth (“Available Today”), Sweet Tooth Bakery (express 4-hour cake delivery) and Glamour Touch Makeup (available within 4 hours). On Explore, tick the “Available Today / 3 Hrs” filter to isolate them."
    },
    {
      id: 'venue-not-urgent', topic: 'Need It Now', p: [
        'venue available today', 'urgent venue', 'can i book a hall today', 'banquet today'
      ],
      a: "Venues are the exception — Grand Pavilion and Royal Velvet Banquets are advance-booking only, and Royal Feast Caterers needs ~2 days' notice. The urgent list therefore focuses on decor, music, photography, cake and entertainment, which can genuinely move in hours."
    },

    /* ─── 9. Payments ─── */
    {
      id: 'payment-methods', topic: 'Payments', p: [
        'payment methods', 'how to pay', 'what payment options', 'payment options',
        'modes of payment', 'ways to pay', 'accepted payments', 'how can i pay'
      ],
      a: "Three options at checkout: UPI/QR (Google Pay, PhonePe, Paytm), Credit/Debit Card (Visa, Mastercard, RuPay), or Net Banking with all major Indian banks. Pick whichever suits you right on the payment screen."
    },
    {
      id: 'upi', topic: 'Payments', p: [
        'upi', 'gpay', 'google pay', 'phonepe', 'paytm', 'pay by upi', 'qr code pay'
      ],
      a: "Yes — UPI is the quickest way to pay your deposit. Choose “UPI / QR” at checkout and you can scan with Google Pay, PhonePe or Paytm. Your booking confirms instantly once the payment clears."
    },
    {
      id: 'card-payment', topic: 'Payments', p: [
        'credit card', 'debit card', 'pay by card', 'card payment', 'visa', 'mastercard', 'rupay'
      ],
      a: "Cards are supported — Visa, Mastercard and RuPay, debit or credit. Select “Credit / Debit Card” at checkout and complete the 3-D Secure step your bank provides."
    },
    {
      id: 'netbanking', topic: 'Payments', p: [
        'net banking', 'netbanking', 'internet banking', 'bank transfer', 'pay via bank'
      ],
      a: "Net Banking is listed as an option, covering all major Indian banks. Choose it at checkout and you'll be routed to your bank's secure page to authorise the deposit."
    },
    {
      id: 'payment-failed', topic: 'Payments', p: [
        'payment failed', 'transaction failed', 'payment not going through', 'upi failed',
        'payment error', 'could not pay', 'payment not working'
      ],
      a: "If a payment fails, nothing is deducted — just retry or switch to another method (UPI, card or net banking) at the same checkout screen. If money left your account but the booking didn't confirm, open the “Payment Issue” desk on the Support page with your transaction reference and we'll reconcile it fast."
    },
    {
      id: 'charged-twice', topic: 'Payments', p: [
        'charged twice', 'double charge', 'deducted twice', 'two payments', 'duplicate charge',
        'paid twice'
      ],
      a: "A double charge is usually a temporary bank authorization, not a real second debit. Go to Support → “Payment Issue” and share the two transaction references; we'll verify with the gateway and, if a duplicate did go through, initiate the reversal right away (refunds land back on the original payment method)."
    },
    {
      id: 'payment-security', topic: 'Trust & Safety', p: [
        'is payment secure', 'secure payment', 'is it safe to pay', 'payment safety',
        'my card safe', 'safe to pay online', 'is my money safe'
      ],
      a: "Yes — payments are processed over encrypted, industry-standard gateways and Auresta never stores your card details. Checkout adds a visible Platform Protection layer, and you can see the exact ₹ amounts before you confirm anything. Never share your OTP or card PIN with anyone, including us."
    },
    {
      id: 'invoice', topic: 'Payments', p: [
        'invoice', 'receipt', 'bill', 'get my invoice', 'download invoice', 'payment receipt',
        'tax invoice'
      ],
      a: "After a confirmed booking your voucher and payment summary appear under My Event. For a formal invoice, ping Support → “Payment Issue” with your voucher ID and we'll email you one with the tax details."
    },

    /* ─── 10. Cancellation & refunds ─── */
    {
      id: 'cancel-overview', topic: 'Cancellations', p: [
        'cancel my booking', 'cancel booking', 'how to cancel', 'cancel order', 'cancellation policy',
        'cancel my order', 'want to cancel', 'cancel an event', 'undo my booking'
      ],
      a: "Cancellations are handled by the Support desk under “Cancellation Request.” Because your deposit guarantees the date, whether a refund applies depends on how close the event is — our team on that desk will confirm the exact outcome for your booking and process it for you. Open the Support page, pick Cancellation Request, and we'll take it from there."
    },
    {
      id: 'refund-overview', topic: 'Refunds', p: [
        'refund policy', 'how do refunds work', 'refund my deposit', 'get my money back',
        'refund request', 'deposit refund', 'can i get a refund'
      ],
      a: "Deposit refunds follow our Refund & Deposit policy and are handled by the Support desk — along with cancellation this is its own dedicated topic (Refund & Deposit Policy). After a refund is processed, money returns to the original payment method; depending on your bank and the method used (UPI/bank/card), it may take a few business days to appear. Open Support → Refund & Deposit Policy and share your booking ID."
    },
    {
      id: 'refund-time', topic: 'Refunds', p: [
        'how long for refund', 'refund time', 'when refund comes', 'refund processing time',
        'how many days refund', 'refund status'
      ],
      a: "Once Support initiates a refund, the arrival time depends on the payment method and bank — typically a few business days. UPI reversals often land fastest. If it's been longer than expected, raise it on the Refund & Deposit desk with your booking ID and we'll chase the gateway."
    },
    {
      id: 'no-refund-received', topic: 'Refunds', p: [
        'havent received refund', 'no refund yet', 'refund not received', 'refund not come',
        'where is my refund', 'still waiting for refund'
      ],
      a: "Let's trace it. Please raise this on the Refund & Deposit Policy desk with your booking/voucher ID and the original transaction reference. We'll check the status with the payment gateway and give you a concrete timeline rather than a generic answer."
    },
    {
      id: 'refund-method', topic: 'Refunds', p: [
        'refund to different card', 'refund to bank account', 'change refund method', 'cash refund',
        'refund in cash'
      ],
      a: "Refunds are returned to the original payment method — that's the standard for security and reconciliation. If the original method is no longer available, Support can discuss an alternative bank transfer case by case."
    },

    /* ─── 11. Account & login ─── */
    {
      id: 'signup', topic: 'Account', p: [
        'how to sign up', 'create account', 'sign up', 'register', 'new account', 'join auresta',
        'make an account', 'create a profile'
      ],
      a: "Tap “Sign Up” in the top bar, enter your full name, email and a password (at least 8 characters), and you're in. There's also a “continue with Google” option on the sign-up screen for one-tap registration."
    },
    {
      id: 'login', topic: 'Account', p: [
        'how to login', 'log in', 'login help', 'cant login', 'cannot login', 'sign in problem',
        'login not working', 'login issue'
      ],
      a: "Use “Log In” in the top bar with your email and password — or the Google button. If you can't get in, double-check the email, then reset via “Forgot Password” on the login screen. Still stuck? Message me and I'll guide you through it."
    },
    {
      id: 'forgot-password', topic: 'Account', p: [
        'forgot password', 'forgot my password', 'reset password', 'change password',
        'password reset', 'cant remember password'
      ],
      a: "On the login screen pick “Forgot Password” and follow the reset link we send to your email. Once reset, log in and — good practice — use a unique 8+ character password. If the reset email doesn't arrive, check spam or try requesting a fresh link."
    },
    {
      id: 'google-login', topic: 'Account', p: [
        'google login', 'continue with google', 'sign in with google', 'google sign in',
        'use google account'
      ],
      a: "The auth page offers “continue with Google.” When OAuth is configured for the deployment you'll see the Google button on both Log In and Sign Up; if it shows “not configured yet,” use the email/password flow for now."
    },
    {
      id: 'logout', topic: 'Account', p: [
        'how to logout', 'log out', 'sign out', 'logout of account'
      ],
      a: "Click the “Log Out” button inside the user chip in the top-right corner of the navbar. You'll be returned to the home page and your session will be cleared."
    },
    {
      id: 'account-other', topic: 'Account', p: [
        'update email', 'change my email', 'change phone number', 'update profile',
        'edit my profile', 'delete my account', 'deactivate account', 'change password on account'
      ],
      a: "Profile/maintenance actions (changing email, phone, or deleting an account) are handled from the account area of the app. For anything not available there — like a deletion or dispute — raise it on the General Support desk and we'll take ownership."
    },

    /* ─── 12. Verification & trust ─── */
    {
      id: 'verification', topic: 'Trust & Safety', p: [
        'what does verified mean', 'verification process', 'how are vendors verified',
        'verified badge', 'is this vendor verified', 'trust the vendors', 'gst business id',
        'how do you verify vendors'
      ],
      a: "A verified badge means the business has been through our verification desk: they submitted GST and Business ID documentation, which admins approve before the ✓ VERIFIED badge goes live on their public profile. Flip to the Admin view in this demo to see the actual verification queue and approve requests."
    },
    {
      id: 'verified-only', topic: 'Trust & Safety', p: [
        'verified vendors only', 'only verified', 'filter verified', 'show verified'
      ],
      a: "On the Explore page, tick “Verified Vendors Only” under Urgency & Verification, and the marketplace filters down to badge-carrying pros only. Combined with the rating sort, that's the fastest way to a shortlist you can trust."
    },
    {
      id: 'vendor-verification-process', topic: 'For Vendors', p: [
        'become a vendor', 'join as vendor', 'register as vendor', 'get verified as vendor',
        'vendor onboarding', 'vendor verification steps', 'how to list my business'
      ],
      a: "Switch to the Vendor view in the top bar — you'll land on the Vendor Business Portal with a self-service profile builder and a “Submit for Verification (Send to Admin)” button. Fill in your business details, submit, and an admin approves your GST & Business ID documents to unlock the verified badge and consumer visibility."
    },
    {
      id: 'vendor-dashboard', topic: 'For Vendors', p: [
        'vendor dashboard', 'vendor portal', 'vendor view', 'business portal',
        'vendor bookings', 'vendor calendar view', 'my vendor account'
      ],
      a: "The Vendor Business Portal shows your revenue, numerical booking count, rating, a live-synced capacity calendar, and a profile & offerings editor. Switch to “Vendor View” via the role switcher in the navbar to see it — including the real-time booking sync when consumers book you."
    },
    {
      id: 'vendor-request', topic: 'For Vendors', p: [
        'vendor support', 'vendor issue', 'vendor not responding', 'vendor replacement',
        'vendor dispute', 'replace my vendor', 'problem with vendor', 'vendor did not show up'
      ],
      a: "If a vendor isn't responding, can't deliver, or you need a replacement, use the “Vendor Issue / Replacement” desk on the Support page — it's a dedicated topic. Share your booking ID and what happened; our concierge will coordinate a replacement vendor or a resolution for your date."
    },

    /* ─── 13. Support desk & people ─── */
    {
      id: 'support-topics', topic: 'Support', p: [
        'support topics', 'what can support help with', 'support categories', 'help desk options',
        'list of support', 'which desks exist'
      ],
      a: "The Auresta Support Desk covers six topics: 📅 Booking Help, 💰 Refund & Deposit Policy, ❌ Cancellation Request, 💳 Payment Issue, 🤝 Vendor Issue / Replacement, and ✨ General Support (feedback, concierge, gift vouchers). Pick the one that matches your situation and the concierge takes it from there."
    },
    {
      id: 'human-agent', topic: 'Support', p: [
        'talk to a human', 'real person', 'human agent', 'live agent', 'speak to a person',
        'human support', 'actual agent', 'is this a bot'
      ],
      a: "You're chatting with Auresta's support assistant right now — everything here runs locally and instantly. For anything that needs a person, the Support desk connects you to our concierge team (the ticket shows an “ACTIVE AGENT” badge), and they'll take over your request."
    },
    {
      id: 'support-hours', topic: 'Support', p: [
        'support hours', 'are you open now', '24 7', '24/7', 'working hours', 'weekend support',
        'is support open', 'when is support available'
      ],
      a: "The Auresta Support Desk is available around the clock — our concierge positions itself as 24/7 assistance for refunds, cancellations, payment help and vendor disputes, including weekends. Send your question any time and you'll get an answer in this thread."
    },
    {
      id: 'escalate', topic: 'Support', p: [
        'escalate', 'speak to manager', 'talk to supervisor', 'raise complaint', 'formal complaint',
        'speak to a manager', 'saw supervisor', 'complaint'
      ],
      a: "Happy to escalate. On the Support page, pick the topic that matches (or General Support), and mark your message as urgent by saying “escalate.” A supervisor or the relevant team will pick it up — and for disputes we keep every detail tied to your booking ID."
    },
    {
      id: 'feedback', topic: 'Support', p: [
        'give feedback', 'feedback', 'feature request', 'suggest something', 'wish list',
        'what do you think', 'improve the app'
      ],
      a: "Love to hear it — feedback, feature ideas and gift-voucher requests all flow through the “General Support” desk on the Support page. Say it plainly and we'll route it to the right team for you."
    },
    {
      id: 'gift-vouchers', topic: 'Support', p: [
        'gift voucher', 'gift card', 'voucher for a friend', 'gift certificate', 'gift someone'
      ],
      a: "Gift vouchers are handled under General Auresta Support on the Support page — tell the concierge the occasion and amount and they'll set one up. For your own bookings, remember every voucher ID starts with AUR-."
    },

    /* ─── 14. My Event workspace ─── */
    {
      id: 'my-event', topic: 'My Event', p: [
        'my event', 'my event workspace', 'view my event', 'my event page',
        'where is my event', 'event workspace', 'planning checklist'
      ],
      a: "My Event is your planning HQ: your event date, budget spent vs. total, confirmed vouchers, and an interactive checklist (venue, decor, cake, photographer, DJ). Tick items off as you lock them in and the cost column updates in real time."
    },
    {
      id: 'checklist-help', topic: 'My Event', p: [
        'planning checklist', 'what do i still need', 'checklist', 'whats left to book',
        'todo for my event', 'am i missing anything'
      ],
      a: "Your checklist tracks the essentials — venue, decor, cake, photography, and music. Items marked ✓ are done; open ones show what's outstanding, each with its planned cost, so you always know what to book next."
    },

    /* ─── 15. Favourites ─── */
    {
      id: 'favorites', topic: 'Favourites', p: [
        'favorites', 'favourites', 'save a vendor', 'bookmark vendor', 'shortlist vendors',
        'saved vendors', 'heart a vendor', 'save for later'
      ],
      a: "Tap the ❤️ on any vendor card to add them to your shortlist. Add a few, compare their starting prices side by side, then book from the one that fits your budget and date best."
    },

    /* ─── 16. General / navigation assistance ─── */
    {
      id: 'navigate-help', topic: 'Navigation', p: [
        'where do i find', 'which page', 'how do i get to', 'take me to', 'where is the',
        'navigate to', 'go to the', 'find packages', 'find the packages', 'find explore', 'find support'
      ],
      a: "Use the navbar shortcuts: Home, Explore Vendors, Packages & Deals, Build Package, My Event, and Chat Support. Quick route — Explore to find vendors, Packages for bundles, Build Package to customise, My Event for your bookings, and Chat Support for help."
    },
    {
      id: 'need-more-help', topic: 'General', p: [
        'i need help', 'assist me', 'can you help', 'im stuck', 'i need assistance',
        'please help me'
      ],
      a: "Of course — tell me what you're trying to do and I'll point you to the right place. For example: “find a photographer under ₹20,000,” “how much deposit to book,” “cancel my booking,” or “what's the urgent vendor list?”. You can also open the Support page for the full desk menu."
    },
    {
      id: 'what-can-you-do', topic: 'General', p: [
        'what can you do', 'what can you help with', 'what are you good at', 'what do you know',
        'your features', 'capabilities', 'list your skills', 'what questions can i ask'
      ],
      a: "I'm Auresta's local support assistant — I know this platform end to end and answer instantly, all on your device (no internet call needed). Ask me about vendors and categories, packages & savings, deposits and payments, urgency/Need It Now, verification, booking & cancellation, locations, or your own bookings and checklist. Just ask in your own words."
    },
    {
      id: 'ping', topic: 'General', p: [
        'are you there', 'are you working', 'you there', 'still there', 'ping', 'test', 'testing'
      ],
      a: "I'm here and working — all replies are computed locally in your browser, so there's no server lag and no data leaves your device. What can I help you plan?"
    },

    /* ─── 17. Greetings & closings ─── */
    {
      id: 'greeting', topic: 'Greeting', p: [
        'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'hii', 'helo', 'namaste'
      ],
      a: "Hello! 👋 Welcome to Auresta Support. I can help you find vendors, understand payments and deposits, pick packages, or walk through booking — whatever you need for your celebration. What are you planning?"
    },
    {
      id: 'thanks', topic: 'Closing', p: [
        'thank you', 'thanks', 'thx', 'ty', 'appreciate it', 'that helped', 'got it thanks',
        'thank you so much'
      ],
      a: "You're very welcome — glad I could help! 🎉 If anything else comes up about your event, just message me here. Wishing you golden moments ahead!"
    },
    {
      id: 'bye', topic: 'Closing', p: [
        'bye', 'goodbye', 'see you', 'thats all', 'i am done', 'nothing else', 'gtg'
      ],
      a: "Goodbye! 👋 Remember: support is 24/7, so drop a message any time. Happy planning — where moments turn golden!"
    },

    /* ─── 18. Safety, security, trust ─── */
    {
      id: 'trust-safety', topic: 'Trust & Safety', p: [
        'trust and safety', 'trust safety', 'is this safe', 'genuine vendors', 'scam protection',
        'platform protection', 'buyer protection', 'safe to book'
      ],
      a: "Auresta layers on protection in three ways: a verification desk that checks GST & Business ID before a vendor earns the badge, a Platform Protection layer at checkout, and a verified-reviews policy so ratings reflect real bookings. The full Trust & Safety hub (verification, refunds, reviews) is linked in the site footer."
    },
    {
      id: 'privacy', topic: 'Trust & Safety', p: [
        'privacy', 'my data', 'data safe', 'personal information', 'what do you store',
        'share my data', 'data protection'
      ],
      a: "Your account data stays with Auresta and is never exposed to vendors unless you engage them. Chat here is fully local — your messages are answered on your own device and aren't sent to any external AI service. For detailed data-handling questions, the General Support desk can put you in touch with the right team."
    },
    {
      id: 'verified-reviews-policy', topic: 'Trust & Safety', p: [
        'verified reviews policy', 'reviews policy', 'review policy', 'fake reviews', 'review gatekeeping'
      ],
      a: "Our Verified Reviews Policy ensures ratings come from confirmed bookings — a vendor can't pay to inflate their score. It's one of the core Trust & Safety policies found in the site footer, alongside refunds and verification."
    },

    /* ─── 19. Contact / connectivity ─── */
    {
      id: 'contact', topic: 'General', p: [
        'contact support', 'contact auresta', 'email support', 'phone support', 'phone number',
        'email address', 'reach you', 'talk to someone'
      ],
      a: "You're already connected — this support chat is the fastest channel. From the Support page you can pick a dedicated desk (Booking, Refund, Cancellation, Payment, Vendor) and our concierge handles it under your ticket ID. There's no separate phone line published; everything funnels through the desk so nothing gets lost."
    },
    {
      id: 'ticket', topic: 'Support', p: [
        'ticket', 'ticket id', 'my ticket', 'support ticket', 'case number', 'reference number'
      ],
      a: "You have an active support ticket — SUP-101 (currently on the Refund & Deposit desk). Every message you write appends to that ticket, so the conversation stays in one thread and nothing needs repeating. Raise a new concern anytime and we'll keep it tied to the same ID."
    },

    /* ─── 20. Specific vendor/category lookups ─── */
    {
      id: 'venue-options', topic: 'Venues', p: [
        'what venues', 'venue options', 'best venues', 'banquet halls', 'list venues',
        'venue prices', 'hall prices', 'reception venue'
      ],
      a: "Two flagship venues: Grand Pavilion Palms & Hall (Electronic City) — AC hall with poolside lawn, valets and 400-guest capacity, from ₹45,000 for 6 hours; and Royal Velvet Banquets (MG Road) — crystal-chandeliered city-centre hall with bridal greenrooms, from ₹35,000 for 5 hours. Both are advance-booking only."
    },
    {
      id: 'catering-options', topic: 'Catering', p: [
        'what caterers', 'catering options', 'best caterers', 'food vendors', 'buffet catering',
        'caterers available', 'live counters'
      ],
      a: "Two catering partners: Royal Feast Caterers (HSR Layout, 4.95★) — premium North/South Indian, Pan-Asian & Continental buffet from ₹450/plate, needing 2 days' notice, radius 30 km; and Fusion Table Gourmet (Whitefield) — live woodfired pizza, taco bar, dim sum and ice-cream rolls from ₹550/plate for 30+ guests. Great for weddings and big parties."
    },
    {
      id: 'photography-options', topic: 'Photography', p: [
        'what photographers', 'photography options', 'best photographer', 'videographer',
        'drone video', 'photobooth', '360 video', 'candid photographer'
      ],
      a: "Moments Studio & Drones (Whitefield, 4.88★) covers candid photography, cinematic drone shots and LED photobooth from ₹15,000 for 4 hours + 100 edited shots; Pixel Frame LED Photobooths (HSR, 4.91★) offer a 360-degree video spinner and instant polaroids from ₹8,000 for 3 hours. Both can move fast — available today/this week."
    },
    {
      id: 'makeup-options', topic: 'Makeup', p: [
        'makeup artist', 'mehendi artist', 'bridal makeup', 'hair styling', 'makeup options',
        'glam makeup', 'party makeup'
      ],
      a: "Glamour Touch Bridal Makeup (Koramangala, 4.94★) does HD bridal makeup, airbrush, party styling, hair extensions, saree draping and organic-stain mehendi from ₹7,500 — and can usually be with you within 4 hours for urgent bookings."
    },
    {
      id: 'dj-options', topic: 'DJ & Music', p: [
        'dj available', 'party dj', 'sound system', 'music systems', 'dj price', 'dj booking',
        'dj for party'
      ],
      a: "Star Beats DJ & Sound (Indiranagar, 4.85★) brings JBL sound towers, laser lights, fog machines and Bollywood/EDM mixes from ₹9,500 for 4 hours, and is frequently available today. Perfect to pair with a stage décor vendor in your custom bundle."
    },
    {
      id: 'cake-options', topic: 'Cakes', p: [
        'cake vendor', 'cake options', 'custom cake', 'dessert bar', 'theme cake',
        'order cake', 'eggless cake', 'fondant cake'
      ],
      a: "Sweet Tooth Artisan Bakery (Jayanagar, 4.92★) makes handcrafted fondant cakes, dessert hampers, macarons and themed dessert bars from ₹1,800 — with express 4-hour cake delivery for last-minute orders. Custom 2-tier theme cakes (2.5 kg, egg/eggless) run ₹3,500."
    },
    {
      id: 'decor-options', topic: 'Decoration', p: [
        'decor vendor', 'decoration options', 'balloon decor', 'floral decor', 'stage decor',
        'mandap', 'theme decor', 'decorators available'
      ],
      a: "Two decorating options: Bloom & Beyond Decor (Indiranagar, 4.9★) — balloon installations, floral mandaps, neon backdrops from ₹8,500 and available today in ~2 hours; Enchanted Floral Studio (Sadashivnagar, 4.89★) — luxury exotic florals, vintage drapes, botanical photobooths from ₹12,000."
    },
    {
      id: 'kids-options', topic: 'Kids', p: [
        'kids entertainment', 'magic show', 'mascot', 'bouncy castle', 'kids vendor', 'balloon artist'
      ],
      a: "Little Wonders Entertainment (Koramangala, 4.8★) handles kids' entertainment — interactive magic shows, games, balloon sculpting, bouncy castles and live mascot hosts from ₹6,000, with availability within 3 hours for urgent requests."
    },

    /* ─── 21. Budget & planning advice ─── */
    {
      id: 'planning-advice', topic: 'Pricing', p: [
        'how to plan budget', 'budget advice', 'planning tips', 'how much should i budget',
        'suggest a budget', 'how do i plan', 'best way to plan'
      ],
      a: "A practical recipe: fix your total budget, then use the Build Package budget meter to allocate across decor, food, photo, music & cake. Rule of thumb from the catalogue — catering and venue eat the most, cake & décor the least. Since bundles save 22–33%, booking a tier-matched bundle usually spends less than assembling à la carte."
    },
    {
      id: 'compare-prices', topic: 'Pricing', p: [
        'compare prices', 'compare vendors', 'which is cheaper', 'price comparison', 'best value'
      ],
      a: "The Explore page sorts by price (low→high or high→low) and rating, and every card shows a starting price. Add favourites to your shortlist to compare side by side. In this demo, catering starts at ₹450/plate, cakes ₹1,800, décor ₹8,500, photobooth ₹8,000, DJ ₹9,500, and venues ₹35,000+."
    },

    /* ─── 22. Misc / off-topic ─── */
    {
      id: 'demo-note', topic: 'General', p: [
        'is this demo', 'demo version', 'example data', 'sample data', 'is this real', 'real site or demo'
      ],
      a: "You're on the Auresta front-end, which ships with demo vendors, packages and bookings so you can explore every flow — search, build a package, book at a 20% deposit — without needing a live backend. The logic here is genuine; the data is sample."
    },
    {
      id: 'grocery', topic: 'Off-topic', p: [
        'refrigerator', 'groceries', 'laundry', 'plumber', 'electrician', 'cab', 'movie tickets'
      ],
      a: "I'm built especially for event planning with Auresta — decorators, caterers, photographers, venues, DJs, cakes and more. That's outside my lane, but if it's for a party or celebration, tell me and I'll find the event vendor who can help! 🎉"
    }
  ];

  /* ---------------------------------------------------------
     Generic tier: reuse the existing supportQA table that
     ships inside data.js (100+ generic intents) so the system
     stays fully grounded in this site's own content.
  --------------------------------------------------------- */
  function legacyTable() {
    var d = window.CELEBRATION_DATA;
    return (d && Array.isArray(d.supportQA)) ? d.supportQA : [];
  }

  /* ---------------------------------------------------------
     Matching primitives
  --------------------------------------------------------- */
  function querySet(querySyn) { return new Set(querySyn); }

  /* Score a single candidate phrase against the query. */
  function analyzePhrase(queryNorm, querySetObj, phrase, pTokens, pSyn) {
    if (phrase === '') return { score: 0, words: 0 };
    var score = 0;

    // Full phrase containment is the strongest signal.
    if (queryNorm.indexOf(phrase) !== -1) {
      var words = phrase.split(' ').length;
      return { score: 3 + words, words: words };
    }

    // Token coverage against the synonym-expanded query set.
    var hits = 0, k;
    for (k = 0; k < pSyn.length; k++) {
      if (querySetObj.has(pSyn[k])) hits++;
    }
    var total = pTokens.length;
    if (total > 0) {
      score = (hits / total) * 2.4;
      if (hits > 0 && total > 1) score += Math.min(2, hits) * 0.3; // nudge multi-token matches
    }
    return { score: score, words: total };
  }

  function bestOf(entries, getPatterns) {
    var best = null;
    var expectedNorm = arguments[2] || null;
    var expectedSet = arguments[3] || null;
    var i, j;
    for (i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var patterns = getPatterns(entry);
      var bScore = 0, bWords = 0, bPattern = '';
      for (j = 0; j < patterns.length; j++) {
        var phrase = normalize(patterns[j]);
        if (phrase === '') continue;
        var pTokens = tokenize(patterns[j]);
        var pSyn = expand(pTokens);
        var term = analyzePhrase(expectedNorm, expectedSet, phrase, pTokens, pSyn);
        if (term.score > bScore) {
          bScore = term.score;
          bWords = term.words;
          bPattern = patterns[j];
        }
      }
      if (bScore > 0 && (!best || bScore > best.score)) {
        best = { score: bScore, intent: entry, words: bWords, pattern: bPattern };
      }
    }
    return best;
  }

  function matchStatic(queryNorm, querySyn) {
    return bestOf(intents, function (it) { return it.p; }, queryNorm, querySet(querySyn));
  }

  function matchLegacy(queryNorm, querySyn) {
    return bestOf(legacyTable(), function (row) { return row.keywords || []; }, queryNorm, querySet(querySyn));
  }

  /* ---------------------------------------------------------
     Dynamic intent handlers — read the live app state so
     answers reflect the user's actual bookings and event.
  --------------------------------------------------------- */
  function hasAny(list, needles) {
    var s = new Set(list);
    for (var i = 0; i < needles.length; i++) {
      if (s.has(needles[i])) return true;
    }
    return false;
  }

  function fmtNum(n) {
    return Number(n || 0).toLocaleString('en-IN');
  }

  function dynamicAnswer(queryNorm, queryTokens, querySyn) {
    var app = window.appStore;
    var state = app ? app.state : null;
    var qSyn = new Set(querySyn);

    // My bookings
    if (hasAny(querySyn, ['bookings','vouchers','reservations','booked','reserved']) &&
        hasAny(queryTokens, ['my','show','list','see','what','how'])) {
      if (state && state.bookings && state.bookings.length) {
        var lines = state.bookings.map(function (b) {
          return '• ' + b.vendorName + ' — ' + b.date + ' (' + b.status + '), deposit ₹' + fmtNum(b.depositPaid) + ' paid, ₹' + fmtNum(b.balanceDue) + ' due. Voucher ' + (b.id || 'AUR-XXXXX') + '.';
        }).join('\n');
        return 'Here are your confirmed bookings:\n' + lines + '\n\nYou can chat with any vendor directly from My Event.';
      }
      return 'You don\'t have any confirmed bookings yet — find a vendor on Explore, pick an open date, and pay the 20% deposit to lock it in.';
    }

    // Remaining balance / my deposit
    if (hasAny(querySyn, ['balance','deposit','remaining','due','owe']) && queryNorm.indexOf('my ') === 0) {
      if (state && state.bookings && state.bookings.length) {
        var b0 = state.bookings[0];
        return 'For your most recent booking — ' + b0.vendorName + ' — the deposit of ₹' + fmtNum(b0.depositPaid) + ' is already paid, and the remaining balance of ₹' + fmtNum(b0.balanceDue) + ' is due directly on ' + b0.date + ' (event day).';
      }
      return 'On Auresta, every booking is secured with a 20% deposit and the remaining ~80% is payable on the event day. Right now you don\'t have a booking yet — want me to explain how to make one?';
    }

    // My event
    if (hasAny(queryTokens, ['event','events']) && hasAny(queryTokens, ['my','show','view'])) {
      if (state && state.events && state.events.length) {
        var ev = state.events[0];
        return 'Your current event is “' + ev.title + '” on ' + ev.date + ' in ' + ev.location + ' (≈' + ev.guestCount + ' guests). Budget: ₹' + fmtNum(ev.spentBudget) + ' spent of ₹' + fmtNum(ev.totalBudget) + '. Open My Event from the navbar to see the checklist and vouchers.';
      }
      return 'My Event is where your planning lives — once you confirm a booking or set up an event, it appears here with checklist, vouchers and budget tracking.';
    }

    return null;
  }

  /* ---------------------------------------------------------
     Public API
  --------------------------------------------------------- */
  var ACCEPT_STATIC = 1.5;
  var ACCEPT_LEGACY = 1.1;

  window.AurestaSupportKB = {
    version: '2.0.0-local',

    /* Returns { answer, intentId, topic, match, tier, confidence } */
    getAnswer: function (rawQuestion) {
      var question = String(rawQuestion || '').trim();
      if (!question) return null;

      var queryNorm = normalize(question);
      var queryTokens = tokenize(question);
      var querySyn = expand(queryTokens);

      // 1) Dynamic (state-aware) answers
      var dyn = dynamicAnswer(queryNorm, queryTokens, querySyn);
      if (dyn) {
        return { answer: dyn, intentId: 'dynamic', topic: 'Your Auresta', match: 'live account data', tier: 'dynamic', confidence: 1 };
      }

      // 2) Auresta-specific knowledge base
      var staticMatch = matchStatic(queryNorm, querySyn);

      // 3) Generic tier from the existing supportQA table
      var legacyMatch = matchLegacy(queryNorm, querySyn);

      var useLegacy = legacyMatch && (!staticMatch || legacyMatch.score > staticMatch.score);

      if (staticMatch && staticMatch.score >= ACCEPT_STATIC) {
        return {
          answer: staticMatch.intent.a,
          intentId: staticMatch.intent.id,
          topic: staticMatch.intent.topic || 'General',
          match: staticMatch.pattern,
          tier: 'auresta',
          confidence: Math.min(1, staticMatch.score / 4)
        };
      }

      if (legacyMatch && legacyMatch.score >= ACCEPT_LEGACY) {
        return {
          answer: legacyMatch.intent.a,
          intentId: 'legacy:' + (legacyMatch.intent.q || 'generic'),
          topic: 'General Support',
          match: legacyMatch.pattern,
          tier: 'generic',
          confidence: Math.min(1, legacyMatch.score / 4)
        };
      }

      if (useLegacy && staticMatch) {
        var bestLocal = staticMatch.intent;
        return {
          answer: bestLocal.a,
          intentId: bestLocal.id,
          topic: bestLocal.topic || 'General',
          match: staticMatch.pattern,
          tier: 'auresta',
          confidence: Math.min(1, staticMatch.score / 4)
        };
      }

      // 4) Graceful fallback
      var fb = fallbackAnswer(question);
      return {
        answer: fb.answer,
        intentId: 'fallback',
        topic: 'General',
        match: null,
        tier: 'fallback',
        confidence: 0,
        suggestions: fb.hints
      };
    },

    /* Match introspection, useful for testing. */
    diagnose: function (rawQuestion) {
      var queryNorm = normalize(rawQuestion);
      var querySyn = expand(tokenize(rawQuestion));
      var s = matchStatic(queryNorm, querySyn);
      var l = matchLegacy(queryNorm, querySyn);
      return {
        static: s ? { intent: s.intent.id, pattern: s.pattern, score: +s.score.toFixed(2) } : null,
        generic: l ? { q: l.intent.q, pattern: l.pattern, score: +l.score.toFixed(2) } : null
      };
    },

    /* Number of unique intents loaded (auresta + generic tiers). */
    getStats: function () {
      return {
        aurestaIntents: intents.length,
        genericIntents: legacyTable().length,
        total: intents.length + legacyTable().length
      };
    }
  };

  /* ---------------------------------------------------------
     Fallback answer
  --------------------------------------------------------- */
  function fallbackAnswer() {
    var hints = [
      'What vendors do you have?',
      'How does booking work?',
      'What packages are available?',
      'Need a vendor today — urgent options?',
      'How much deposit do I pay?',
      'How do refunds work?'
    ];
    var d = window.CELEBRATION_DATA;
    var sg = d && d.supportSuggestions;
    if (sg) {
      hints = [].concat(
        sg.general[0], sg.booking[0], sg.payment[0],
        'What packages do you have?',
        'How much deposit do I pay?'
      );
    }
    return {
      answer: 'Hmm — I didn\'t quite catch that. 🙈 I\'m your local Auresta assistant and I know this platform in detail. Things I can answer:\n\n• Vendors & categories — “what photographers are available?”\n• Packages & deals — “what packages do you have?”\n• Booking & deposits — “how much deposit do I pay?”\n• Urgent — “need a vendor today”\n• Cancellation & refunds — “how do refunds work?”\n\nTry one of these, or tell me what you\'re planning!',
      hints: hints
    };
  }

})();