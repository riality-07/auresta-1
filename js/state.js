/* AURESTA - Reactive State Manager with Real-Time Calendar Sync */

class StateStore {
  constructor() {
    this.listeners = [];
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    // Purge legacy state keys to ensure fresh sync
    localStorage.removeItem('celebration_hub_state');
    localStorage.removeItem('auresta_state_v1');
    localStorage.removeItem('auresta_state_v2');
    localStorage.removeItem('auresta_state_v3');

    const saved = localStorage.getItem('auresta_state_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading saved state", e);
      }
    }

    return {
      currentRole: 'consumer', // 'consumer', 'vendor', 'admin'
      currentView: 'home', // 'home', 'explore', 'packages', 'builder', 'urgency', 'my_event', 'support', 'vendor_dash', 'admin_portal'
      activeVendorId: null,
      activeModal: null, // 'vendor_detail', 'checkout', 'payment_gateway', 'booking_confirmed', 'vendor_preview'
      
      // Marketplace Search & Multi-Category Filters
      searchParams: {
        eventType: 'birthday',
        location: 'Bangalore',
        date: '',
        guests: 50,
        budgetMax: 50000,
        urgency: 'any',
        selectedCategories: [], // Array for simultaneous multi-category checks!
        verifiedOnly: false,
        showUnavailable: false,
        sortBy: 'rating'
      },

      // Package Page Filters
      packageFilters: {
        budgetRange: 'all',
        eventType: 'all'
      },

      // Selected Booking Date for Vendor Profile Modal/Page
      selectedBookingDate: '2026-09-25',

      // Saved Favorites
      favorites: ['v-1', 'v-5'],

      // User Events & Bookings
      events: window.CELEBRATION_DATA.initialEvents,
      bookings: window.CELEBRATION_DATA.initialBookings,

      // Auresta Support Ticket Inbox
      supportTickets: [
        {
          id: 'SUP-101',
          topic: 'Refund & Deposit Policy',
          title: 'Deposit status for Booking AUR-89021',
          status: 'Open',
          date: '2026-08-19',
          messages: [
            { sender: 'user', text: 'Hi Auresta Support, when is the remaining balance due?', time: '10:15 AM' },
            { sender: 'support', text: 'Hello! As per Auresta protection policy, your deposit guarantees your date. The remaining balance is payable directly on the event day.', time: '10:20 AM' }
          ]
        }
      ],

      // Vendor Direct Messaging
      vendorMessages: [
        {
          id: 'vm1',
          vendorId: 'v-1',
          vendorName: 'Bloom & Beyond Decor',
          text: 'Hi Anushka! We have confirmed your Theme Stage Decor. Our team will arrive at 2 PM for setup.',
          timestamp: '10:45 AM',
          sender: 'vendor'
        }
      ],

      // Custom Package Builder State
      customPackage: {
        eventType: 'birthday',
        guestCount: 50,
        maxBudget: 50000,
        selectedVendors: {
          decor: 'v-1',
          cake: 'v-5'
        }
      },

      // Payment Draft & Checkout State
      checkoutDraft: null,
      lastConfirmedBooking: null,

      // Vendor Self-Service Profile Builder State
      vendorProfileDraft: {
        businessName: 'Bloom & Beyond Decor',
        ownerName: 'Rohan Sharma',
        category: 'decor',
        categoryName: 'Floral & Balloon Decor',
        description: 'Award-winning event decorators specializing in organic balloon installations, floral mandaps, neon backdrops, and theme setups across Bangalore.',
        location: 'Indiranagar, Bangalore',
        serviceAreas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield'],
        startingPrice: 8500,
        responseTime: '15 mins',
        coverImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Basic Balloon Decor', price: 8500, desc: '200 Metallic Balloons, Arch, Foil Banner' },
          { name: 'Theme Stage Decor', price: 18500, desc: '8x10 Backdrop, Organic Arch, Neon Sign' }
        ],
        verificationStatus: 'Verified',
        verificationDocsSubmitted: true
      },

      // Admin Verification Queue
      vendorVerifications: [
        { id: 'v-1', name: 'Bloom & Beyond Decor', docsSubmitted: true, status: 'Verified' },
        { id: 'v-5', name: 'Sweet Tooth Artisan Bakery', docsSubmitted: true, status: 'Verified' },
        { id: 'v-new', name: 'Star Beats DJ & Sound', docsSubmitted: true, status: 'Pending Verification' }
      ]
    };
  }

  save() {
    localStorage.setItem('auresta_state_v4', JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  setRole(role) {
    this.state.currentRole = role;
    if (role === 'vendor') this.state.currentView = 'vendor_dash';
    else if (role === 'admin') this.state.currentView = 'admin_portal';
    else this.state.currentView = 'home';
    this.save();
  }

  setView(view, params = {}) {
    this.state.currentView = view;
    if (params.vendorId) this.state.activeVendorId = params.vendorId;
    this.save();
  }

  openModal(modalType, extraData = {}) {
    this.state.activeModal = modalType;
    this.state.modalData = extraData;
    this.save();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.modalData = null;
    this.save();
  }

  toggleFavorite(vendorId) {
    const idx = this.state.favorites.indexOf(vendorId);
    if (idx > -1) this.state.favorites.splice(idx, 1);
    else this.state.favorites.push(vendorId);
    this.save();
  }

  toggleCategoryFilter(catId) {
    const arr = this.state.searchParams.selectedCategories;
    const idx = arr.indexOf(catId);
    if (idx > -1) arr.splice(idx, 1);
    else arr.push(catId);
    this.save();
  }

  updateSearch(params) {
    this.state.searchParams = { ...this.state.searchParams, ...params };
    this.save();
  }

  updatePackageFilters(params) {
    this.state.packageFilters = { ...this.state.packageFilters, ...params };
    this.save();
  }

  setSelectedBookingDate(dateStr) {
    this.state.selectedBookingDate = dateStr;
    this.save();
  }

  updateCustomPackage(category, vendorId) {
    if (vendorId) {
      this.state.customPackage.selectedVendors[category] = vendorId;
    } else {
      delete this.state.customPackage.selectedVendors[category];
    }
    this.save();
  }

  startCheckout(draft) {
    this.state.checkoutDraft = draft;
    this.openModal('payment_gateway');
  }

  processPayment(paymentMethod) {
    const draft = this.state.checkoutDraft;
    if (!draft) return;

    const bookingDate = draft.date || this.state.selectedBookingDate || '2026-09-25';

    const newBooking = {
      id: 'AUR-' + Math.floor(10000 + Math.random() * 90000),
      vendorId: draft.vendorId || 'v-1',
      vendorName: draft.vendorName || 'Auresta Package',
      eventTitle: this.state.events[0]?.title || 'Celebration',
      date: bookingDate,
      timeSlot: draft.timeSlot || '04:00 PM - 08:00 PM',
      packageBooked: draft.packageName || 'Standard Service',
      status: 'Confirmed',
      totalAmount: draft.totalAmount,
      depositPaid: draft.depositPaid,
      balanceDue: draft.balanceDue,
      paymentMethod: paymentMethod || 'UPI',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AUR-${Math.floor(10000 + Math.random() * 90000)}`
    };

    this.state.bookings.unshift(newBooking);
    this.state.lastConfirmedBooking = newBooking;

    // REAL-TIME VENDOR CALENDAR SYNC: Automatically add booked date into vendor's bookedDates!
    const targetVendor = window.CELEBRATION_DATA.vendors.find(v => v.id === draft.vendorId);
    if (targetVendor) {
      if (!targetVendor.bookedDates.includes(bookingDate)) {
        targetVendor.bookedDates.push(bookingDate);
      }
    }
    // Also update vendor profile draft if it matches active vendor
    if (draft.vendorId === 'v-1') {
      const dayStr = bookingDate.split('-')[2] || '25';
      const dayNum = parseInt(dayStr);
      if (dayNum) {
        this.state.vendorProfileDraft.bookedDates = this.state.vendorProfileDraft.bookedDates || ['2026-08-20', '2026-08-25'];
        if (!this.state.vendorProfileDraft.bookedDates.includes(bookingDate)) {
          this.state.vendorProfileDraft.bookedDates.push(bookingDate);
        }
      }
    }

    if (this.state.events[0]) {
      this.state.events[0].spentBudget += (draft.depositPaid || 0);
    }

    this.state.checkoutDraft = null;
    this.openModal('booking_confirmed');
    this.save();
  }

  sendSupportMessage(ticketId, text, sender = 'user') {
    const ticket = this.state.supportTickets.find(t => t.id === ticketId) || this.state.supportTickets[0];
    if (ticket) {
      ticket.messages.push({
        sender,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    this.save();
  }

  sendVendorDirectMessage(vendorId, text) {
    const vendor = window.CELEBRATION_DATA.vendors.find(v => v.id === vendorId) || { name: 'Vendor' };
    this.state.vendorMessages.push({
      id: 'vm-' + Date.now(),
      vendorId,
      vendorName: vendor.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'consumer'
    });

    setTimeout(() => {
      this.state.vendorMessages.push({
        id: 'vm-reply-' + Date.now(),
        vendorId,
        vendorName: vendor.name,
        text: 'Thank you for messaging us on Auresta! We are delighted to host your event.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'vendor'
      });
      this.save();
    }, 1200);

    this.save();
  }

  updateVendorProfile(data) {
    this.state.vendorProfileDraft = { ...this.state.vendorProfileDraft, ...data };
    this.save();
  }

  // REAL-TIME VERIFICATION REQUEST FROM VENDOR
  submitVendorProfileForVerification() {
    this.state.vendorProfileDraft.verificationStatus = 'Pending Verification';
    const existingInAdmin = this.state.vendorVerifications.find(v => v.id === 'v-1');
    if (existingInAdmin) {
      existingInAdmin.status = 'Pending Verification';
    } else {
      this.state.vendorVerifications.unshift({
        id: 'v-1',
        name: this.state.vendorProfileDraft.businessName,
        docsSubmitted: true,
        status: 'Pending Verification'
      });
    }
    this.save();
  }

  // REAL-TIME VERIFICATION APPROVAL FROM ADMIN
  verifyVendor(vendorId) {
    const req = this.state.vendorVerifications.find(v => v.id === vendorId);
    if (req) req.status = 'Verified';

    const v = window.CELEBRATION_DATA.vendors.find(v => v.id === vendorId);
    if (v) v.verified = true;

    if (vendorId === 'v-1' || vendorId === 'Bloom & Beyond Decor') {
      this.state.vendorProfileDraft.verificationStatus = 'Verified';
    }

    this.save();
  }
}

window.appStore = new StateStore();
