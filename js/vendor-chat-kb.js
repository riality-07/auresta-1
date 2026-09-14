/* AURESTA Vendor Chat — Local Knowledge Base
 * ---------------------------------------------------------------------------
 * Local Q&A data used ONLY by the Vendor Chat interface (js/vendor-chat.js).
 * This file is intentionally independent from js/support-kb.js (Chat Support).
 * 100% local — no external APIs, no AI services.
 *
 * Format: { q, a, tags } where:
 *   - q     representative question text (used for matching)
 *   - a     concise, realistic vendor-style answer
 *   - tags  extra keywords that help the local matcher
 *
 * Answers are deliberately generic so they remain safe for any vendor category.
 * Where a detail is vendor-specific, the answer asks the user to confirm it
 * with the vendor instead of inventing a guarantee.
 */
window.VENDOR_CHAT_KB = [

  /* ---------------- Availability ---------------- */
  { q: 'Are you available on my event date?',
    a: 'We’ll confirm availability as soon as you share your event date. Gold-standard practice here is to lock the date with a small deposit — it stops the slot from being double-booked.',
    tags: ['available', 'availability', 'slot', 'booked', 'free date'] },
  { q: 'How do I check if my date is free?',
    a: 'Open the “Select Booking Date” calendar on the vendor page — dates can be selected if they’re open. If a date is already marked, it’s likely taken for that vendor; you can still message them to confirm.',
    tags: ['date', 'free', 'calendar', 'check', 'availability'] },
  { q: 'Are you available for a full day?',
    a: 'Most vendors offer full-day packages, but coverage can vary by category. Tell the vendor your start and end time so they can confirm whether a full-day slot is open for that date.',
    tags: ['full day', 'all day', 'multiple hours', 'duration'] },

  /* ---------------- Pricing ---------------- */
  { q: 'How much do you charge?',
    a: 'Pricing depends on the package and guest count. Vendors list a starting price on their page — share your date and the number of guests to get an exact quote.',
    tags: ['price', 'cost', 'rate', 'charges', 'quote', 'budget'] },
  { q: 'What is your starting price?',
    a: 'The starting price shown on the vendor’s page covers their base package. Anything beyond that (extra guests, add-ons, travel) is quoted separately.',
    tags: ['starting price', 'minimum', 'base', 'rate'] },
  { q: 'Can you work within my budget?',
    a: 'Yes — vendors are used to tailoring packages to a budget. Tell them your total budget and priority items, and they’ll propose a package that fits it.',
    tags: ['budget', 'afford', 'cheap', 'cost effective', 'fit'] },

  /* ---------------- Packages ---------------- */
  { q: 'What packages do you offer?',
    a: 'Vendors list their packages on the profile page — usually a base package and premium options. Pick the closest one and message the vendor to fine-tune it.',
    tags: ['package', 'packages', 'plans', 'options', 'offers'] },
  { q: 'What is included in the package?',
    a: 'Each package lists what’s covered — like setup, materials, or coverage time. For anything not listed, ask the vendor directly so there are no surprises on the day.',
    tags: ['included', 'whats included', 'include', 'scope', 'what is included'] },
  { q: 'Can I upgrade to a bigger package?',
    a: 'Upgrades are usually possible — the difference is charged as an add-on. Ask the vendor for an upgrade price based on what you’d like to add.',
    tags: ['upgrade', 'bigger', 'advanced', 'premium'] },

  /* ---------------- Package customization ---------------- */
  { q: 'Can I customize the package?',
    a: 'Yes — packages are flexible. Swap out parts you don’t need and add the ones you do; the vendor will re-quote the package for you.',
    tags: ['customize', 'custom', 'modify', 'personalize', 'tailor'] },
  { q: 'Can you create a custom package for my event?',
    a: 'Most vendors build custom packages. Share your guest count, your must-haves, and your budget, and they’ll put together a tailored quote.',
    tags: ['custom package', 'build package', 'bespoke', 'from scratch'] },
  { q: 'Can I remove items from a package to save cost?',
    a: 'Yes — trimming a package typically reduces the price. Tell the vendor which items you want dropped and they’ll give you the revised rate.',
    tags: ['remove', 'drop items', 'simpler', 'cheaper package', 'cut'] },

  /* ---------------- Discounts ---------------- */
  { q: 'Do you give discounts?',
    a: 'Discounts are sometimes available for larger events, off-peak dates, or early confirmations. Ask the vendor specifically — don’t assume a fixed discount.',
    tags: ['discount', 'offers', 'deal', 'concession'] },
  { q: 'Is there a discount for booking everything together?',
    a: 'Booking multiple services together can unlock a combined rate with some vendors. Ask for a bundle quote before confirming anything.',
    tags: ['bundle', 'combination', 'multi service', 'combo', 'together'] },
  { q: 'Do you offer a discount for referrals?',
    a: 'Referral rewards vary from vendor to vendor. Check with the vendor whether they run a referral program before relying on it.',
    tags: ['referral', 'refer friend', 'rewards', 'friend'] },

  /* ---------------- Deposits ---------------- */
  { q: 'How much deposit do I need to pay?',
    a: 'Auresta bookings hold a nominal deposit (usually around 20% of the starting price) to lock your date. The vendor confirms the exact figure when you book.',
    tags: ['deposit', 'advance', 'advance payment', 'booking amount', 'holding'] },
  { q: 'Is the deposit refundable?',
    a: 'Deposits guarantee your date and are generally not refundable if you cancel. Check the vendor’s cancellation policy before paying.',
    tags: ['refundable', 'refund', 'deposit back', 'returned'] },
  { q: 'When is the deposit due?',
    a: 'The deposit is due at booking to reserve the slot. Remaining balance is typically paid on the event day — confirm this with the vendor.',
    tags: ['due', 'when to pay', 'deadline', 'pay now'] },

  /* ---------------- Payment methods ---------------- */
  { q: 'What payment methods do you accept?',
    a: 'Vendors typically accept UPI/QR, credit or debit cards, and net banking through Auresta’s checkout. Some also take cash or bank transfer — confirm with the vendor.',
    tags: ['payment', 'pay', 'methods', 'upi', 'card', 'cash', 'netbanking'] },
  { q: 'Can I pay the balance after the event?',
    a: 'Yes — the typical arrangement is paying the remaining balance on the event day. Some vendors prepay certain costs, so confirm the timeline in advance.',
    tags: ['balance', 'after event', 'pay later', 'remaining'] },
  { q: 'Do you accept online payment?',
    a: 'Yes — Auresta’s checkout supports UPI, cards, and net banking, so you can pay your deposit online. Full payment can often be split between deposit and balance.',
    tags: ['online', 'online payment', 'link', 'portal'] },

  /* ---------------- Remaining balance ---------------- */
  { q: 'How do I pay the remaining balance?',
    a: 'The balance is settled on the event day, either by the same payment method as your deposit or in cash — whichever the vendor confirms.',
    tags: ['remaining', 'balance', 'pay rest', 'outstanding'] },
  { q: 'Can I see the balance I still owe?',
    a: 'Open “My Event”, then “Confirmed Bookings” — each booking shows the deposit paid and the remaining balance for that vendor.',
    tags: ['owe', 'balance due', 'track', 'remaining amount'] },

  /* ---------------- Cancellation ---------------- */
  { q: 'What is your cancellation policy?',
    a: 'Cancellation policies vary by vendor. Generally, cancellations cost the deposit, and cancellations close to the event may carry an extra fee. Confirm the exact policy with the vendor.',
    tags: ['cancel', 'cancellation', 'policy', 'drop out'] },
  { q: 'Will I lose my deposit if I cancel?',
    a: 'In most cases the deposit is non-refundable because it reserves your date. The vendor may waive it if you reschedule instead of cancel — ask first.',
    tags: ['deposit', 'cancellation', 'lose deposit', 'refund'] },
  { q: 'How much notice does cancellation need?',
    a: 'Notice requirements depend on the vendor — some need a week, others more. The further out you cancel, the more likely you are to recover part of what you’ve paid.',
    tags: ['notice', 'notice period', 'how long', 'timeframe', 'cancel'] },

  /* ---------------- Rescheduling ---------------- */
  { q: 'Can I change my event date?',
    a: 'Date changes are possible if the vendor has the new date open. Move the date as early as possible so they can hold the new slot.',
    tags: ['reschedule', 'change date', 'move date', 'shift', 'postpone'] },
  { q: 'Is rescheduling free?',
    a: 'A one-time date change is often free or low-cost if done well in advance. Confirm with the vendor whether a rescheduling fee applies.',
    tags: ['reschedule', 'fee', 'cost to change', 'postpone'] },
  { q: 'Can I change the time on my booking?',
    a: 'Timing tweaks are usually easy if they don’t clash with the vendor’s other bookings. Let them know your new start time and they’ll adjust.',
    tags: ['time change', 'change timing', 'postpone time', 'timings'] },

  /* ---------------- Event dates ---------------- */
  { q: 'Do you book for weekday events?',
    a: 'Yes — many vendors actually prefer weekdays and can offer better rates. Any working weekday is generally bookable.',
    tags: ['weekday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'] },
  { q: 'Do you book for weekend events?',
    a: 'Weekends fill up fast, so secure the date with a deposit as soon as you fix it. Share your weekend date to confirm the slot.',
    tags: ['weekend', 'saturday', 'sunday', 'holiday'] },

  /* ---------------- Event timings ---------------- */
  { q: 'What time do you start work on the event day?',
    a: 'Setup usually begins a few hours before the event start. The vendor will confirm the exact arrival and setup window once your timings are booked.',
    tags: ['start time', 'when', 'begin', 'arrival', 'timing'] },
  { q: 'How long do you stay for the event?',
    a: 'Coverage length depends on the package — a few hours for some categories, full day for others. Confirm your required hours with the vendor.',
    tags: ['duration', 'how long', 'hours', 'end time', 'until'] },

  /* ---------------- Setup time ---------------- */
  { q: 'How much setup time do you need?',
    a: 'Setup time varies by service — an hour or two for compact services, more for large setups. The vendor will tell you the exact window for your event.',
    tags: ['setup time', 'preparation', 'how long to set up', 'installed'] },
  { q: 'Can you set up the day before the event?',
    a: 'Some vendors can pre-arrange materials the night before if the venue allows it. Ask the vendor whether early setup is possible for your event.',
    tags: ['setup', 'previous day', 'day before', 'early setup'] },

  /* ---------------- Delivery ---------------- */
  { q: 'Do you deliver materials to the venue?',
    a: 'Yes — vendors typically deliver and set up their own materials at the venue. Delivery may carry a charge depending on distance, so confirm it in the quote.',
    tags: ['delivery', 'deliver', 'ship', 'transport', 'materials'] },
  { q: 'Is there a delivery charge?',
    a: 'Delivery is usually included within the vendor’s service area and may be extra beyond it. Ask for the delivery fee when you get your quote.',
    tags: ['delivery charge', 'shipping', 'transport fee', 'logistics'] },

  /* ---------------- Travel charges ---------------- */
  { q: 'Do you charge for travel?',
    a: 'Travel is covered inside the service area. Beyond it, vendors may add a travel charge for fuel and time — get this in your written quote.',
    tags: ['travel', 'travel charges', 'mileage', 'commute', 'distance fee'] },
  { q: 'How far will you travel?',
    a: 'Vendors usually list a service radius, and many will travel further for a fee. Share your venue location to confirm whether it’s within range.',
    tags: ['travel', 'radius', 'distance', 'how far', 'location'] },

  /* ---------------- Location ---------------- */
  { q: 'Where are you located?',
    a: 'The vendor’s location and coverage area are shown on their profile page. Confirm your venue is within their service area.',
    tags: ['location', 'where', 'address', 'based', 'city'] },
  { q: 'Do you cover venues outside the city?',
    a: 'Some vendors travel outside the city for an additional fee. Ask the vendor about out-of-city bookings before finalising.',
    tags: ['city', 'outstation', 'outside', 'far venue', 'travel'] },

  /* ---------------- Guest count ---------------- */
  { q: 'Can you handle 500+ guests?',
    a: 'Larger guest counts usually need a tailored package or extra equipment/personnel. Tell the vendor your exact count to get an accurate quote.',
    tags: ['guests', 'large event', 'many people', 'crowd', '500'] },
  { q: 'Do your prices change with guest count?',
    a: 'Yes — pricing typically scales with the number of guests because it affects portions, materials, or coverage. Share your expected headcount for an exact price.',
    tags: ['guests', 'per head', 'pricing', 'count', 'headcount'] },
  { q: 'What’s the maximum guests you support?',
    a: 'Maximum capacity depends on the vendor and their equipment. Confirm your headcount with them to make sure your number fits comfortably.',
    tags: ['capacity', 'maximum', 'largest', 'limit', 'how many'] },

  /* ---------------- Food preferences ---------------- */
  { q: 'Can you accommodate food preferences?',
    a: 'Yes — caterers can plan around preferences. Share any likes, dislikes, or regional cuisines with the vendor while finalising the menu.',
    tags: ['food', 'cuisine', 'preference', 'likes', 'menu'] },
  { q: 'Can you handle both veg and non-veg?',
    a: 'Most caterers manage both comfortably and keep preparation separate. Confirm the veg/non-veg ratio with them for accurate planning.',
    tags: ['veg', 'non veg', 'both', 'mixed', 'menus'] },

  /* ---------------- Vegetarian ---------------- */
  { q: 'Do you offer vegetarian options?',
    a: 'Yes — vegetarian menus are always available, from simple to elaborate. Share the number of veg guests to size the menu right.',
    tags: ['vegetarian', 'veg', 'vegetarian options', 'pure veg', 'no meat'] },
  { q: 'Can the entire menu be vegetarian?',
    a: 'Absolutely — a fully vegetarian menu is standard. Just confirm the spread style (buffet, live counters, etc.) with the caterer.',
    tags: ['all veg', 'fully vegetarian', 'pure veg', 'vegetarian'] },

  /* ---------------- Non-vegetarian ---------------- */
  { q: 'Do you serve non-vegetarian food?',
    a: 'Yes, non-veg menus are available — whether it’s a few dishes or a full spread. Confirm which meats and cuisines you’d like on the menu.',
    tags: ['non veg', 'meat', 'chicken', 'mutton', 'seafood'] },
  { q: 'Can you do a mix of veg and non-veg counters?',
    a: 'Mixed counters are common and kept separate to avoid cross-contact. Specify your veg/non-veg split to get a balanced menu.',
    tags: ['counters', 'mixed', 'live counter', 'veg nonveg'] },

  /* ---------------- Dietary requirements ---------------- */
  { q: 'Do you cater for Jain food?',
    a: 'Yes — Jain-style menus (no onion, garlic, or root vegetables where requested) can be arranged. Confirm the exact restrictions with the caterer.',
    tags: ['jain', 'jain food', 'no onion garlic', 'sattvik'] },
  { q: 'Can you handle gluten-free requests?',
    a: 'Gluten-free options can be included on request. Let the vendor know the specific requirements so they can plan the menu accordingly.',
    tags: ['gluten free', 'allergy', 'allergies', 'diet'] },
  { q: 'Do you accommodate allergies?',
    a: 'Yes — share any allergies up front so the vendor avoids those ingredients. For severe allergies, follow up directly to confirm handling practices.',
    tags: ['allergy', 'allergies', 'nut allergy', 'food allergy'] },

  /* ---------------- Menu customization ---------------- */
  { q: 'Can I customise the menu?',
    a: 'Yes — menus are built around your preferences. Give the caterer your favourite dishes and must-haves and they’ll draft a menu.',
    tags: ['menu', 'customise', 'custom menu', 'dishes', 'choose food'] },
  { q: 'Can I add more dishes to a package?',
    a: 'Extra dishes are usually added at a per-dish or per-head cost. List what you’d like to add and the vendor will re-quote.',
    tags: ['add dishes', 'extra dishes', 'more options', 'additional'] },
  { q: 'Is a tasting available before booking?',
    a: 'Tastings depend on the caterer — some offer them for larger bookings. Ask the vendor whether a sample session can be arranged.',
    tags: ['tasting', 'sample', 'try food', 'preview menu'] },

  /* ---------------- Decoration customization ---------------- */
  { q: 'Can you match a specific theme?',
    a: 'Yes — decorators regularly work to a theme. Share colour schemes, references, or photos so they can match the look you want.',
    tags: ['theme', 'theme colour', 'style', 'look', 'decor'] },
  { q: 'Can you do custom backdrops and props?',
    a: 'Custom backdrops and props can be built to order. Give the vendor your size, style, and budget for a custom quote.',
    tags: ['backdrop', 'props', 'custom decor', 'stage', 'installation'] },
  { q: 'Can I use my own decorations too?',
    a: 'Yes — most decorators are happy to work around your own pieces. Confirm logistics with the vendor so personal items arrive on time.',
    tags: ['own decor', 'personal', 'bring own', 'mix'] },

  /* ---------------- Photography coverage ---------------- */
  { q: 'How many hours of photography are included?',
    a: 'Coverage hours depend on the package — typically a set number of hours with a photographer. Confirm your required hours with the vendor.',
    tags: ['photography', 'hours', 'coverage', 'duration', 'photo'] },
  { q: 'Do you cover candid photography?',
    a: 'Candid and traditional styles are both common. Tell the photographer your preferred style and they’ll match it on the day.',
    tags: ['candid', 'traditional', 'style', 'photography'] },
  { q: 'Do you cover getting-ready and ceremony portions?',
    a: 'Pre-event and ceremony coverage can be added to most packages. Confirm the exact timeline you want covered with the photographer.',
    tags: ['getting ready', 'ceremony', 'portions', 'coverage', 'timeline'] },

  /* ---------------- Videography ---------------- */
  { q: 'Do you offer videography too?',
    a: 'Many photographers also offer videography or work with a videographer partner. Ask whether a photo + video combo is available.',
    tags: ['videography', 'video', 'filming', 'cinematography'] },
  { q: 'Do you make a highlight film?',
    a: 'Highlight films are a popular add-on — usually a short cinematic edit of the key moments. Check the package for what editing is included.',
    tags: ['highlight', 'film', 'reel', 'edit', 'video'] },

  /* ---------------- Number of photographers ---------------- */
  { q: 'How many photographers will there be?',
    a: 'Packages usually state one, two, or more photographers. For large events a second photographer is often recommended — confirm availability.',
    tags: ['photographers', 'how many', 'second shooter', 'team'] },
  { q: 'Can I add a second photographer?',
    a: 'Yes — an additional photographer can be added for wider coverage at an extra cost. Ask the vendor for the add-on price.',
    tags: ['second', 'extra photographer', 'additional', 'more cameras'] },

  /* ---------------- Deliverables ---------------- */
  { q: 'How many photos do we get?',
    a: 'Photo counts vary — some packages guarantee a number, others deliver based on event duration. Confirm the expected count with the photographer.',
    tags: ['photos', 'how many', 'deliverables', 'count'] },
  { q: 'How do we receive the photos and videos?',
    a: 'Final photos and videos are usually delivered through an online gallery or drive link, and sometimes on a USB for premium packages. Confirm the delivery format.',
    tags: ['deliverables', 'receive', 'gallery', 'link', 'usb'] },

  /* ---------------- Editing ---------------- */
  { q: 'Are edited photos included?',
    a: 'Colour/lighting edits are typically included in the package. Heavier retouching or albums may be a separate add-on — confirm what’s included.',
    tags: ['editing', 'edited', 'retouch', 'colour grade', 'post production'] },
  { q: 'How long does editing take?',
    a: 'Final edits are usually delivered within a few weeks of the event. Ask the vendor for their specific delivery timeline.',
    tags: ['editing time', 'how long', 'delivery', 'when do we get'] },

  /* ---------------- Delivery timelines ---------------- */
  { q: 'When will we receive the final photos?',
    a: 'Photo delivery timelines are typically a few weeks, while a highlight film may come earlier. Get a written timeline from the vendor.',
    tags: ['delivery time', 'when', 'photos', 'timeline', 'final'] },
  { q: 'Can we get a sneak peek after the event?',
    a: 'Sneak peeks are a common courtesy — many vendors share a few preview images within a day or two. Ask the vendor for a quick preview.',
    tags: ['sneak peek', 'preview', 'samples', 'early'] },

  /* ---------------- Urgent bookings ---------------- */
  { q: 'Can you book me on short notice?',
    a: 'Several vendors mark themselves available for urgent bookings when they have the day free. Share your date immediately to check the slot.',
    tags: ['urgent', 'short notice', 'last minute', 'quick', 'immediate'] },
  { q: 'What is your urgent booking turnaround?',
    a: 'Urgent bookings depend on remaining slots and setup lead time. The profile sometimes shows an availability notice like “Available today” — otherwise confirm directly.',
    tags: ['urgent', 'turnaround', 'same week', 'rush'] },

  /* ---------------- Same-day availability ---------------- */
  { q: 'Are you available today?',
    a: 'Same-day availability occurs when a slot is open and setup can be managed in time. Check the vendor’s urgent availability notice, then message them to hold it.',
    tags: ['same day', 'today', 'available now', 'this hour'] },
  { q: 'Can you handle an event a few hours from now?',
    a: 'Only if the vendor has an open slot and enough lead time. Confirm with the vendor as soon as possible — don’t assume same-day availability.',
    tags: ['few hours', 'immediate', 'same day', 'short'] },

  /* ---------------- Additional charges ---------------- */
  { q: 'Are there any hidden charges?',
    a: 'A quality vendor itemises the quote upfront. Ask for a written breakdown including travel, taxes, and add-ons so there are no surprises.',
    tags: ['hidden', 'extra', 'charges', 'fees', 'additional'] },
  { q: 'What could add extra to my total?',
    a: 'Common add-ons are more guests, extended hours, extra equipment/personnel, and out-of-area travel. Confirm all of these in the quote.',
    tags: ['extra cost', 'add ons', 'upgrade', 'overtime', 'additional'] },
  { q: 'Is overtime charged?',
    a: 'Extended hours beyond the package are typically billed as overtime. Agree on the hourly rate with the vendor in advance.',
    tags: ['overtime', 'extra hours', 'extended', 'late'] },

  /* ---------------- Taxes ---------------- */
  { q: 'Are taxes included in the price?',
    a: 'Quotes may or may not include GST depending on the vendor. Ask whether the price is inclusive or exclusive of taxes.',
    tags: ['tax', 'gst', 'inclusive', 'exclusive', 'taxes'] },
  { q: 'Will I get an invoice or bill?',
    a: 'Yes — vendors provide an invoice for the transaction. Confirm whether you need a GST invoice for your records before booking.',
    tags: ['invoice', 'bill', 'receipt', 'gst invoice', 'records'] },

  /* ---------------- Equipment ---------------- */
  { q: 'Do you bring your own equipment?',
    a: 'Yes — the vendor brings the equipment their service needs. Verify the equipment list is included in your package before the event.',
    tags: ['equipment', 'gear', 'own', 'provided', 'supplied'] },
  { q: 'Do I need to arrange anything on my side?',
    a: 'Usually just the venue and, where needed, a power source or space arrangement. Confirm the venue requirements checklist with the vendor.',
    tags: ['arrange', 'needed', 'provide', 'venue', 'my side'] },

  /* ---------------- Setup and teardown ---------------- */
  { q: 'Who does the setup and teardown?',
    a: 'The vendor’s own team handles setup and teardown — you don’t lift a finger. Confirm teardown timing so it fits your venue’s schedule.',
    tags: ['setup', 'teardown', 'dismantle', 'cleanup', 'who does'] },
  { q: 'Is teardown included in the price?',
    a: 'Setup and teardown are normally part of the service. Check the quote to confirm teardown is included and whether late-night teardown carries a fee.',
    tags: ['teardown', 'cleanup', 'included', 'late', 'dismantle'] },

  /* ---------------- Venue requirements ---------------- */
  { q: 'Do you need anything from the venue?',
    a: 'Requirements vary — some services need space, tables, or a power point. Get the vendor’s requirements checklist ahead of the event day.',
    tags: ['venue', 'requirements', 'need', 'arrange', 'space'] },
  { q: 'Do you work with any venue?',
    a: 'Most vendors can work at any venue, though some placements (e.g., outdoor power) need checking. Confirm the venue address and type with the vendor.',
    tags: ['venue', 'any venue', 'outdoor', 'location', 'works at'] },

  /* ---------------- Power requirements ---------------- */
  { q: 'Do you need a power connection?',
    a: 'Some services (sound, lights, equipment) need a power point. Check whether your venue can provide one and tell the vendor in advance.',
    tags: ['power', 'electricity', 'connection', 'socket', 'generator'] },
  { q: 'Do you bring your own generator?',
    a: 'Generators are usually only needed when the venue has no power. Confirm with the vendor and check whether a generator fee applies.',
    tags: ['generator', 'power', 'backup', 'electricity'] },

  /* ---------------- Weather contingencies ---------------- */
  { q: 'What happens if it rains?',
    a: 'Vendors usually have indoor alternatives or shelter arrangements for weather. Discuss a rain plan with the vendor before the event.',
    tags: ['rain', 'weather', 'outdoor', 'indoor backup', 'monsoon'] },
  { q: 'Is there a backup plan for bad weather?',
    a: 'A solid vendor plans for weather — indoor placement, covers, or rescheduling. Confirm the contingency plan when you finalise.',
    tags: ['backup', 'weather', 'plan b', 'rain plan', 'contingency'] },

  /* ---------------- Customer changes ---------------- */
  { q: 'Can I make changes to my order later?',
    a: 'Reasonable changes before the event are usually fine — guests, menu tweaks, or timing shifts. The closer to the event, the earlier you should confirm changes.',
    tags: ['changes', 'modify', 'update', 'adjust', 'change order'] },
  { q: 'Is there a deadline for changes?',
    a: 'Most vendors need a cut-off a few days before the event to finalise logistics. Ask for the change deadline so nothing is missed.',
    tags: ['deadline', 'changes', 'cut off', 'finalise'] },

  /* ---------------- Booking confirmation ---------------- */
  { q: 'How do I confirm my booking with you?',
    a: 'Book through Auresta’s checkout to hold the date — paying the deposit confirms the slot instantly. You’ll see it under “My Event” → “Confirmed Bookings”.',
    tags: ['confirm', 'booking', 'hold', 'reserve', 'confirm booking'] },
  { q: 'Will I receive a confirmation?',
    a: 'Yes — once the deposit is paid you get a booking confirmation with a booking ID and the vendor’s details on the Confirmed Bookings list.',
    tags: ['confirmation', 'receipt', 'booking id', 'ticket'] },

  /* ---------------- General vendor communication ---------------- */
  { q: 'How quickly do you respond to messages?',
    a: 'Vendors aim to respond within a few hours — many show a response time on their profile. If it’s urgent, reach out directly.',
    tags: ['respond', 'reply', 'response time', 'quick reply', 'message back'] },
  { q: 'Can I reach you directly on the event day?',
    a: 'Yes — the vendor shares a contact channel closer to the event for day-of coordination, so you can reach them for last-minute needs.',
    tags: ['contact', 'reach', 'phone', 'event day', 'direct'] },
  { q: 'Can we schedule a call before booking?',
    a: 'Most vendors are happy to hop on a quick call before you commit. Request a call and share your date, venue, and guest count so they can come prepared.',
    tags: ['call', 'phone call', 'meeting', 'schedule call', 'talk'] },
  { q: 'Do you have sample or portfolio work I can see?',
    a: 'Vendors usually have a portfolio or past-work gallery on their profile. Ask them for samples relevant to your event type or theme.',
    tags: ['portfolio', 'samples', 'work', 'gallery', 'past events'] },
  { q: 'Can you help with event planning advice too?',
    a: 'Most vendors gladly offer advice within their service — timing, layout, or coordination tips. For full planning help, the vendor’s concierge can guide you.',
    tags: ['advice', 'planning', 'suggestions', 'tips', 'help'] }
];