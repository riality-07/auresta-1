/* AURESTA - Master Application Logic */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.appStore.subscribe(renderApp);
  renderApp();
});

function renderApp() {
  try {
    const state = window.appStore.state;
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    appContainer.innerHTML = `
      ${renderNavbar(state)}
      <main class="main-content">
        ${renderView(state)}
      </main>
      ${renderFooter(state)}
      ${renderModal(state)}
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    bindEvents();
    renderGoogleButtonIfNeeded(state);
  } catch (err) {
    console.error("Auresta Render Error:", err);
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = `
        <div style="padding:4rem; text-align:center; color:var(--text-primary);">
          <h2>Auresta Application Rendering Error</h2>
          <pre style="color:var(--status-error); margin-top:1rem;">${err.stack || err}</pre>
        </div>
      `;
    }
  }
}

/* Navbar Component */
function renderNavbar(state) {
  const isConsumer = state.currentRole === 'consumer';
  const isVendor = state.currentRole === 'vendor';
  const isAdmin = state.currentRole === 'admin';

  return `
    <nav class="navbar">
      <div class="container nav-content">
        <a href="#" class="logo" onclick="navigateTo('home')">
          <div class="logo-icon">👑</div>
          <span>AURESTA</span>
        </a>

        <button class="nav-toggle" onclick="toggleMobileNav()" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <div class="nav-right">
          ${isConsumer ? `
            <div class="nav-links">
              <a href="#" class="nav-link ${state.currentView === 'home' ? 'active' : ''}" onclick="navigateTo('home')">
                <i data-lucide="home"></i> Home
              </a>
              <a href="#" class="nav-link ${state.currentView === 'explore' ? 'active' : ''}" onclick="navigateTo('explore')">
                <i data-lucide="compass"></i> Explore Vendors
              </a>
              <a href="#" class="nav-link ${state.currentView === 'packages' ? 'active' : ''}" onclick="navigateTo('packages')">
                <i data-lucide="package"></i> Packages & Deals
              </a>
              <a href="#" class="nav-link ${state.currentView === 'builder' ? 'active' : ''}" onclick="navigateTo('builder')">
                <i data-lucide="wand-2"></i> Build Package
              </a>
              <a href="#" class="nav-link ${state.currentView === 'urgency' ? 'active' : ''}" onclick="navigateTo('urgency')">
                <span class="badge badge-urgent">⚡ NEED IT NOW</span>
              </a>
              <a href="#" class="nav-link ${state.currentView === 'my_event' ? 'active' : ''}" onclick="navigateTo('my_event')">
                <i data-lucide="calendar"></i> My Event
              </a>
              <a href="#" class="nav-link ${state.currentView === 'support' ? 'active' : ''}" onclick="navigateTo('support')">
                <i data-lucide="headphones"></i> Chat Support
              </a>
            </div>
          ` : ''}

          ${isVendor ? `
            <div class="nav-links">
              <a href="#" class="nav-link active"><i data-lucide="layout-dashboard"></i> Vendor Portal</a>
              <a href="#" class="nav-link" onclick="openVendorPreviewModal()"><i data-lucide="eye"></i> Preview Public Profile</a>
            </div>
          ` : ''}

          ${isAdmin ? `
            <div class="nav-links">
              <a href="#" class="nav-link active"><i data-lucide="shield-check"></i> Admin Portal</a>
              <a href="#" class="nav-link"><i data-lucide="users"></i> Verification Desk</a>
            </div>
          ` : ''}

          <!-- Global Role Switcher -->
          <div class="role-switcher">
            <button class="role-btn ${isConsumer ? 'active' : ''}" onclick="switchRole('consumer')">User View</button>
            <button class="role-btn ${isVendor ? 'active' : ''}" onclick="switchRole('vendor')">Vendor View</button>
            <button class="role-btn ${isAdmin ? 'active' : ''}" onclick="switchRole('admin')">Admin View</button>
          </div>

          <!-- Auth Controls -->
          ${state.auth.isAuthenticated ? `
            <div class="navbar-user-chip">
              <span>👤 ${state.auth.user.name}</span>
              <button class="btn btn-sm btn-outline" style="padding:0.25rem 0.7rem;" onclick="logoutUser()">Log Out</button>
            </div>
          ` : `
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-outline" onclick="openAuthPage('login')">Log In</button>
              <button class="btn btn-sm btn-primary" onclick="openAuthPage('signup')">Sign Up</button>
            </div>
          `}
        </div>
      </div>
    </nav>
  `;
}

function openAuthPage(view) {
  window.appStore.setAuthView(view);
  navigateTo('auth');
}

/* Master View Router */
function renderView(state) {
  if (state.currentView === 'auth') return renderAuthView(state);
  if (state.currentRole === 'vendor') return renderVendorDashboard(state);
  if (state.currentRole === 'admin') return renderAdminPortal(state);

  switch (state.currentView) {
    case 'home':
      return renderHomeView(state);
    case 'explore':
      return renderExploreView(state);
    case 'packages':
      return renderPackagesView(state);
    case 'builder':
      return renderBuilderView(state);
    case 'urgency':
      return renderUrgencyView(state);
    case 'my_event':
      return renderMyEventView(state);
    case 'support':
      return renderSupportView(state);
    case 'vendor_detail':
      return renderVendorDetailView(state);
    default:
      return renderHomeView(state);
  }
}

/* Homepage View */
function renderHomeView(state) {
  const categories = window.CELEBRATION_DATA.categories;
  const moments = window.CELEBRATION_DATA.momentsMade;

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Everything You Need to Celebrate, <span>In One Place</span></h1>
        <div class="hero-tagline">"Where Moments Turn Golden"</div>
        <p class="hero-subtitle">Discover verified vendors, compare prices, build custom packages & book your entire celebration effortlessly.</p>

        <!-- Need It Now Urgency Bar with Packages CTA -->
        <div class="urgency-banner">
          <div class="urgency-text">
            <h3>⚡ Need a Vendor Immediately?</h3>
            <p>Find decorators, caterers & photographers ready to serve within 2 to 24 hours.</p>
          </div>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <button class="btn btn-purple" onclick="navigateTo('urgency')">
              Browse Urgent Availability
            </button>
            <button class="btn btn-primary" onclick="navigateTo('packages')">
              <i data-lucide="package"></i> Explore Packages & Deals
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Explore by Event Type -->
    <section style="padding: 3rem 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Explore by Event Type</h2>
            <p class="section-subtitle">Handpicked vendor packages for every occasion</p>
          </div>
        </div>

        <div class="search-widget">
          <div class="search-tabs">
            ${categories.map(c => `
              <button class="search-tab ${state.searchParams.eventType === c.id ? 'active' : ''}" onclick="setSearchParam('eventType', '${c.id}')">
                ${c.icon} ${c.name}
              </button>
            `).join('')}
          </div>

          <div class="search-grid">
            <!-- Typable + Selectable Location Input -->
            <div class="field-group">
              <label class="field-label">Location</label>
              <input type="text" list="locationOptions" class="field-input" value="${state.searchParams.location}" onchange="setSearchParam('location', this.value)" placeholder="Type or select location..." />
              <datalist id="locationOptions">
                <option value="Bangalore"></option>
                <option value="Indiranagar, Bangalore"></option>
                <option value="Koramangala, Bangalore"></option>
                <option value="Whitefield, Bangalore"></option>
                <option value="HSR Layout, Bangalore"></option>
                <option value="Jayanagar, Bangalore"></option>
                <option value="Electronic City, Bangalore"></option>
              </datalist>
            </div>

            <!-- Event Date -->
            <div class="field-group">
              <label class="field-label">Event Date</label>
              <input type="date" class="field-input" value="${state.searchParams.date}" onchange="setSearchParam('date', this.value)" />
            </div>

            <!-- Typable Guest Count Input -->
            <div class="field-group">
              <label class="field-label">Guest Count</label>
              <input type="number" min="1" class="field-input" value="${state.searchParams.guests || 50}" onchange="setSearchParam('guests', parseInt(this.value) || 1)" placeholder="Enter guests count..." />
            </div>

            <!-- Typable Budget Input -->
            <div class="field-group">
              <label class="field-label">Budget (₹)</label>
              <input type="number" min="500" step="500" class="field-input" value="${state.searchParams.budgetMax || 50000}" onchange="setSearchParam('budgetMax', parseInt(this.value) || 0)" placeholder="Enter budget (e.g. 37500)..." />
            </div>

            <button class="btn btn-primary" onclick="navigateTo('explore')">
              <i data-lucide="search"></i> Find Available
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Moments We've Made Gallery -->
    <section style="padding: 3rem 0; background: var(--bg-card-alt); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Moments We've Made</h2>
            <p class="section-subtitle">From intimate celebrations to unforgettable occasions, here's a glimpse of the moments we've helped bring to life.</p>
          </div>
        </div>

        <div class="moments-grid reveal-group">
          ${moments.map(m => `
            <div class="moment-card">
              <img src="${m.image}" class="moment-img" alt="${m.title}" />
              <div class="moment-body">
                <span class="badge badge-gold" style="margin-bottom:0.5rem;">${m.categoryName}</span>
                <h3 style="font-size:1.2rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">${m.title}</h3>
                <div style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.8rem;">📍 ${m.location}</div>
                <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1rem;">${m.description}</p>
                <button class="btn btn-sm btn-outline" style="width:100%;" onclick="navigateTo('explore')">View Similar Vendors</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* Explore Vendor Marketplace View */
function renderExploreView(state) {
  const vendors = filterVendors(state);
  const categories = window.CELEBRATION_DATA.serviceCategories;
  const selectedCats = state.searchParams.selectedCategories;

  return `
    <div class="container">
      <div class="marketplace-layout">
        <!-- Sidebar Multi-Category Filter with "All Categories" -->
        <aside class="filter-sidebar">
          <div class="filter-title">
            <span>Filter Vendors</span>
            <button class="btn btn-sm btn-outline" onclick="resetFilters()">Reset</button>
          </div>

          <div class="filter-group">
            <label class="filter-label">Sort Vendors By</label>
            <select class="field-select" onchange="setSearchParam('sortBy', this.value)">
              <option value="rating" ${state.searchParams.sortBy === 'rating' ? 'selected' : ''}>⭐ Highest Rated</option>
              <option value="price_asc" ${state.searchParams.sortBy === 'price_asc' ? 'selected' : ''}>💰 Price: Low to High</option>
              <option value="price_desc" ${state.searchParams.sortBy === 'price_desc' ? 'selected' : ''}>💰 Price: High to Low</option>
              <option value="speed" ${state.searchParams.sortBy === 'speed' ? 'selected' : ''}>⚡ Available Soonest / Speed</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Categories (Select Multiple)</label>
            <label class="checkbox-item" style="font-weight:700; color:var(--text-primary);">
              <input type="checkbox" ${selectedCats.length === 0 ? 'checked' : ''} onchange="resetCategorySelection()" />
              🌟 All Categories
            </label>
            ${categories.map(cat => {
              const isChecked = selectedCats.includes(cat.id);
              return `
                <label class="checkbox-item">
                  <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleCategorySelection('${cat.id}')" />
                  ${cat.icon} ${cat.name}
                </label>
              `;
            }).join('')}
          </div>

          <div class="filter-group">
            <label class="filter-label">Urgency & Verification</label>
            <label class="checkbox-item">
              <input type="checkbox" ${state.searchParams.verifiedOnly ? 'checked' : ''} onchange="setSearchParam('verifiedOnly', this.checked)" />
              ✓ Verified Vendors Only
            </label>
            <label class="checkbox-item">
              <input type="checkbox" ${state.searchParams.urgency === 'today' ? 'checked' : ''} onchange="setSearchParam('urgency', this.checked ? 'today' : 'any')" />
              ⚡ Available Today / 3 Hrs
            </label>
          </div>
        </aside>

        <!-- Main Marketplace Content -->
        <main>
          <div class="section-header">
            <div>
              <h2 class="section-title">Available Vendors (${vendors.length})</h2>
              <p class="section-subtitle">Showing verified service providers in ${state.searchParams.location}</p>
            </div>
          </div>

          <!-- Active Category Tags -->
          ${selectedCats.length > 0 ? `
            <div style="margin-bottom:1.25rem;">
              <span style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); margin-right:0.5rem;">Active Categories:</span>
              ${selectedCats.map(cid => {
                const cObj = categories.find(c => c.id === cid);
                return `
                  <span class="selected-category-pill">
                    ${cObj ? cObj.name : cid}
                    <button onclick="toggleCategorySelection('${cid}')">✕</button>
                  </span>
                `;
              }).join('')}
            </div>
          ` : ''}

          ${vendors.length === 0 ? `
            <div style="text-align:center; padding: 4rem; background: #FFFFFF; border:1px solid var(--border-color); border-radius: var(--radius-xl);">
              <h3>No vendors match these active filters</h3>
              <p style="color:var(--text-secondary); margin: 1rem 0;">Try expanding your categories or budget limit.</p>
              <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
            </div>
          ` : `
            <div class="vendors-grid reveal-group">
              ${vendors.map(v => renderVendorCard(v, state)).join('')}
            </div>
          `}
        </main>
      </div>
    </div>
  `;
}

/* Packages & Deals Hub View */
function renderPackagesView(state) {
  const allPackages = window.CELEBRATION_DATA.preMadePackages;
  const pf = state.packageFilters;

  const filtered = allPackages.filter(p => {
    let matchBudget = true;
    if (pf.budgetRange === 'under5k') matchBudget = p.dealPrice < 5000;
    else if (pf.budgetRange === '5k-10k') matchBudget = p.dealPrice >= 5000 && p.dealPrice <= 10000;
    else if (pf.budgetRange === '10k-25k') matchBudget = p.dealPrice >= 10000 && p.dealPrice <= 25000;
    else if (pf.budgetRange === '25k-50k') matchBudget = p.dealPrice >= 25000 && p.dealPrice <= 50000;
    else if (pf.budgetRange === '50k_plus') matchBudget = p.dealPrice > 50000;

    let matchEvent = true;
    if (pf.eventType !== 'all') matchEvent = p.category === pf.eventType;

    return matchBudget && matchEvent;
  });

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">Auresta Packages & Deals</h1>
          <p class="section-subtitle">Curated event bundles starting from ₹999 across all celebration types</p>
        </div>
        <button class="btn btn-purple" onclick="navigateTo('builder')">
          <i data-lucide="wand-2"></i> Build Your Own Package
        </button>
      </div>

      <!-- Combinable Package Filters Bar -->
      <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-xl); padding:1.25rem 1.5rem; margin:1.5rem 0; display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1.25rem;">
        <div class="field-group">
          <label class="field-label">Filter by Budget</label>
          <select class="field-select" onchange="setPackageFilter('budgetRange', this.value)">
            <option value="all" ${pf.budgetRange === 'all' ? 'selected' : ''}>All Budget Tiers</option>
            <option value="under5k" ${pf.budgetRange === 'under5k' ? 'selected' : ''}>Budget (Under ₹5,000)</option>
            <option value="5k-10k" ${pf.budgetRange === '5k-10k' ? 'selected' : ''}>Standard (₹5,000 - ₹10,000)</option>
            <option value="10k-25k" ${pf.budgetRange === '10k-25k' ? 'selected' : ''}>Premium (₹10,000 - ₹25,000)</option>
            <option value="25k-50k" ${pf.budgetRange === '25k-50k' ? 'selected' : ''}>Grand (₹25,000 - ₹50,000)</option>
            <option value="50k_plus" ${pf.budgetRange === '50k_plus' ? 'selected' : ''}>Luxury (₹50,000+)</option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">Filter by Event Type</label>
          <select class="field-select" onchange="setPackageFilter('eventType', this.value)">
            <option value="all" ${pf.eventType === 'all' ? 'selected' : ''}>All Celebration Types</option>
            <option value="birthday" ${pf.eventType === 'birthday' ? 'selected' : ''}>Birthday Party</option>
            <option value="wedding" ${pf.eventType === 'wedding' ? 'selected' : ''}>Wedding</option>
            <option value="engagement" ${pf.eventType === 'engagement' ? 'selected' : ''}>Engagement</option>
            <option value="anniversary" ${pf.eventType === 'anniversary' ? 'selected' : ''}>Anniversary</option>
            <option value="kids" ${pf.eventType === 'kids' ? 'selected' : ''}>Kids Party</option>
            <option value="houseparty" ${pf.eventType === 'houseparty' ? 'selected' : ''}>House Party</option>
            <option value="corporate" ${pf.eventType === 'corporate' ? 'selected' : ''}>Corporate Event</option>
          </select>
        </div>
      </div>

      <!-- Packages Grid -->
      ${filtered.length === 0 ? `
        <div style="text-align:center; padding: 4rem; background: #FFFFFF; border:1px solid var(--border-color); border-radius: var(--radius-xl);">
          <h3>No package deals match this exact filter combination</h3>
          <button class="btn btn-primary" style="margin-top:1rem;" onclick="resetPackageFilters()">Reset Package Filters</button>
        </div>
      ` : `
        <div class="vendors-grid reveal-group">
          ${filtered.map(p => renderPackageCard(p)).join('')}
        </div>
      `}
    </div>
  `;
}

/* "Build Your Own Package" Customizer Wizard */
function renderBuilderView(state) {
  const custom = state.customPackage;
  const categories = window.CELEBRATION_DATA.serviceCategories;
  const allVendors = window.CELEBRATION_DATA.vendors;

  let subtotal = 0;
  Object.entries(custom.selectedVendors).forEach(([catId, vendorId]) => {
    const v = allVendors.find(item => item.id === vendorId);
    if (v) subtotal += v.startingPrice;
  });

  const remaining = custom.maxBudget - subtotal;
  const pctUsed = Math.min(100, Math.round((subtotal / custom.maxBudget) * 100));

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">Build Your Custom Event Package</h1>
          <p class="section-subtitle">Combine top verified vendors category by category and stay within your budget</p>
        </div>
      </div>

      <!-- Budget Meter Box -->
      <div class="budget-meter-container">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary);">Total Event Budget: ₹${custom.maxBudget.toLocaleString('en-IN')}</span>
            <span style="color:var(--text-secondary); font-size:0.9rem; margin-left: 1rem;">(Spent: ₹${subtotal.toLocaleString('en-IN')})</span>
          </div>
          <div>
            <span class="badge ${remaining >= 0 ? 'badge-verified' : 'badge-urgent'}" style="font-size:0.9rem;">
              ${remaining >= 0 ? `₹${remaining.toLocaleString('en-IN')} Remaining` : `Over Budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>

        <div class="budget-progress-bar">
          <div class="budget-fill ${pctUsed > 90 ? 'danger' : pctUsed > 75 ? 'warning' : ''}" style="width: ${pctUsed}%;"></div>
        </div>
      </div>

      <!-- Category Selector Grid -->
      <div class="reveal-group" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        ${categories.map(cat => {
          const selectedVendorId = custom.selectedVendors[cat.id];
          const selectedVendor = allVendors.find(v => v.id === selectedVendorId);
          const availableVendors = allVendors.filter(v => v.category === cat.id);

          return `
            <div class="package-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <h3 style="color:var(--text-primary); font-size:1.2rem;">${cat.icon} ${cat.name}</h3>
                ${selectedVendor ? `<span class="badge badge-verified">✓ ADDED</span>` : `<span class="badge badge-gold">SELECT</span>`}
              </div>

              ${selectedVendor ? `
                <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight:700; color:var(--text-primary); font-size:1.05rem;">${selectedVendor.name}</div>
                    <span class="badge badge-verified">✓ Verified</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-secondary); margin:0.3rem 0;">
                    ⭐ <strong>${selectedVendor.rating}</strong> (${selectedVendor.reviewCount} reviews)
                  </div>
                  <div style="color:var(--text-primary); font-weight:700; font-size:1rem;">₹${selectedVendor.startingPrice.toLocaleString('en-IN')} onwards</div>
                  <button class="btn btn-sm btn-outline" style="width:100%; margin-top:0.6rem;" onclick="removeBuilderVendor('${cat.id}')">Change Vendor</button>
                </div>
              ` : `
                <select class="field-select" onchange="addBuilderVendor('${cat.id}', this.value)">
                  <option value="">Select ${cat.name} Vendor...</option>
                  ${availableVendors.map(v => `
                    <option value="${v.id}">${v.name} • ⭐${v.rating} (₹${v.startingPrice.toLocaleString('en-IN')} onwards)</option>
                  `).join('')}
                </select>
              `}
            </div>
          `;
        }).join('')}
      </div>

      <div style="margin-top: 2.5rem; text-align:center;">
        <button class="btn btn-primary btn-lg" style="padding:1rem 2.5rem; font-size:1.1rem;" onclick="proceedCustomPackageCheckout(${subtotal})">
          <i data-lucide="check-circle"></i> Proceed to Payment (₹${subtotal.toLocaleString('en-IN')})
        </button>
      </div>
    </div>
  `;
}

/* "Need It Now" Urgency View */
function renderUrgencyView(state) {
  const urgentVendors = window.CELEBRATION_DATA.vendors.filter(v => v.urgentAvailable);

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="urgency-banner" style="margin-top:0;">
        <div class="urgency-text">
          <h1>⚡ Urgent & Express Event Vendors</h1>
          <p>Verified service providers with immediate calendar capacity ready to dispatch in Bangalore.</p>
        </div>
      </div>

      <div class="vendors-grid reveal-group" style="margin-top: 2rem;">
        ${urgentVendors.map(v => renderVendorCard(v, state)).join('')}
      </div>
    </div>
  `;
}

/* Consumer "My Event Workspace" View */
function renderMyEventView(state) {
  const activeEvent = state.events[0];
  const bookings = state.bookings;

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">My Event Workspace</h1>
          <p class="section-subtitle">Track planning progress, bookings, and budget for ${activeEvent.title}</p>
        </div>
      </div>

      <!-- Overview Stats -->
      <div class="stats-row reveal-group">
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Event Date</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${activeEvent.date}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Budget Spent</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--status-success);">₹${activeEvent.spentBudget.toLocaleString('en-IN')} / ₹${activeEvent.totalBudget.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🛍️</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Confirmed Vouchers</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${bookings.length} Bookings</div>
          </div>
        </div>
      </div>

      <!-- Checklist & Bookings Layout -->
      <div class="marketplace-layout" style="grid-template-columns: 1fr 1fr;">
        <!-- Planning Checklist -->
        <div class="package-card">
          <h3 style="color:var(--text-primary); margin-bottom:1.25rem; font-size:1.2rem;">Event Checklist</h3>
          <div>
            ${activeEvent.checklist.map(item => `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem 0; border-bottom:1px solid var(--border-color);">
                <label style="display:flex; align-items:center; gap:0.75rem; cursor:pointer; color: ${item.done ? 'var(--text-secondary)' : 'var(--text-primary)'}; text-decoration: ${item.done ? 'line-through' : 'none'}">
                  <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleChecklistItem('${item.id}')" style="accent-color:var(--primary-gold)" />
                  ${item.task}
                </label>
                ${item.cost > 0 ? `<span style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">₹${item.cost.toLocaleString('en-IN')}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Confirmed Vouchers -->
        <div class="package-card">
          <h3 style="color:var(--text-primary); margin-bottom:1.25rem; font-size:1.2rem;">Confirmed Bookings (${bookings.length})</h3>
          ${bookings.map(b => `
            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem; margin-bottom:1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-weight:700; color:var(--text-primary);">${b.vendorName}</div>
                <span class="badge badge-verified">✓ ${b.status}</span>
              </div>
              <div style="color:var(--text-secondary); font-size:0.85rem; margin:0.4rem 0;">ID: ${b.id} | ${b.date}</div>
              <div style="font-weight:700; color:var(--status-success); font-size:0.95rem;">Deposit Paid: ₹${b.depositPaid.toLocaleString('en-IN')} (Remaining: ₹${b.balanceDue.toLocaleString('en-IN')})</div>
              <button class="btn btn-sm btn-outline" style="margin-top:0.6rem; width:100%;" onclick="openVendorChatDirect('${b.vendorId}')">💬 Chat with Vendor</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* Auresta Support Chat Workspace */
function renderSupportView(state) {
  const topics = window.CELEBRATION_DATA.supportTopics;
  const ticket = state.supportTickets[0];

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">Auresta Support Desk</h1>
          <p class="section-subtitle">24/7 Concierge assistance for refunds, cancellations, payment help & vendor disputes</p>
        </div>
      </div>

      <div class="marketplace-layout" style="grid-template-columns: 280px 1fr;">
        <aside class="filter-sidebar">
          <h4 style="margin-bottom:1rem; font-size:1.1rem; color:var(--text-primary);">Support Topics</h4>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${topics.map(t => `
              <div style="padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color); background:#FFFFFF; cursor:pointer;" onclick="alert('Connected to ${t.name} desk.')">
                <div style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">${t.icon} ${t.name}</div>
                <div style="font-size:0.78rem; color:var(--text-secondary);">${t.desc}</div>
              </div>
            `).join('')}
          </div>
        </aside>

        <div class="package-card" style="height: 580px; display:flex; flex-direction:column;">
          <div style="padding-bottom:1rem; border-bottom:1px solid var(--border-color); font-weight:700; font-size:1.1rem; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center;">
            <span>🎧 Auresta Concierge Ticket #${ticket.id}</span>
            <span class="badge badge-verified">✓ ACTIVE AGENT</span>
          </div>

          <div style="flex-grow:1; overflow-y:auto; padding:1rem 0; display:flex; flex-direction:column; gap:1rem;">
            ${ticket.messages.map(m => `
              <div style="align-self: ${m.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width:75%; background: ${m.sender === 'user' ? 'var(--primary-gold)' : 'var(--bg-main)'}; border:1px solid var(--border-color); padding:0.85rem 1.1rem; border-radius:var(--radius-lg); color:var(--text-primary);">
                <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:0.2rem;">${m.sender === 'user' ? 'You' : 'Auresta Support'} • ${m.time}</div>
                <div style="font-size:0.92rem;">${m.text}</div>
              </div>
            `).join('')}
          </div>

          <div style="display:flex; gap:0.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
            <input type="text" id="supportInput" class="field-input" placeholder="Type support question or request refund help..." onkeypress="if(event.key==='Enter') sendSupportMsg()" />
            <button class="btn btn-primary" onclick="sendSupportMsg()">Send</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Vendor Dashboard View (With Visible Calendar, Numerical Booking Count & Real-Time Sync) */
function renderVendorDashboard(state) {
  const profile = state.vendorProfileDraft;
  const activeVendor = window.CELEBRATION_DATA.vendors.find(v => v.id === 'v-1') || window.CELEBRATION_DATA.vendors[0];
  const bookingsCount = state.bookings.length + 11; // Numerical booking count requirement!

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">Vendor Business Portal</h1>
          <p class="section-subtitle">Logged in as <strong>${profile.businessName}</strong></p>
        </div>
        <span class="badge ${profile.verificationStatus === 'Verified' ? 'badge-verified' : 'badge-urgent'}" style="font-size:0.9rem;">
          ${profile.verificationStatus === 'Verified' ? '✓ VERIFIED VENDOR' : 'PENDING VERIFICATION'}
        </span>
      </div>

      <!-- Overview Stats displaying NUMERICAL BOOKING COUNT (Requirement #3) -->
      <div class="stats-row reveal-group">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Revenue (This Month)</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--status-success);">₹1,85,000</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🛍️</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Total Bookings</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary);">Total Bookings: ${bookingsCount}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Rating & Reviews</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary);">4.9 ⭐ (128 Reviews)</div>
          </div>
        </div>
      </div>

      <!-- VISIBLE VENDOR AVAILABILITY CALENDAR (Requirements #1 & #2) -->
      <div class="package-card" style="margin-top:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3 style="color:var(--text-primary);">Real-Time Vendor Capacity Calendar</h3>
            <p style="color:var(--text-secondary); font-size:0.88rem;">Synchronized with live consumer bookings in real time.</p>
          </div>
          <span class="badge badge-verified">LIVE SYNCED CALENDAR</span>
        </div>

        <div class="calendar-grid">
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="calendar-day-label">${d}</div>`).join('')}
          ${Array.from({ length: 30 }, (_, i) => {
            const dayNum = i + 1;
            const dateStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
            const isBooked = activeVendor.bookedDates.includes(dateStr) || dayNum === 20 || dayNum === 25;
            return `
              <div class="calendar-date-cell ${isBooked ? 'booked' : 'available'}">
                ${dayNum}<br/>
                <span style="font-size:0.7rem; font-weight:700;">${isBooked ? 'BOOKED' : 'OPEN'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Profile Builder & Verification Submission (Requirements #4 & #5) -->
      <div class="package-card" style="margin-top:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <h3 style="color:var(--text-primary);">Edit Vendor Profile & Offerings</h3>
          <button class="btn btn-primary" onclick="openVendorPreviewModal()">
            <i data-lucide="eye"></i> Preview Your Profile
          </button>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem;">
          <div class="field-group">
            <label class="field-label">Business Name</label>
            <input type="text" class="field-input" value="${profile.businessName}" onchange="updateVendorDraft('businessName', this.value)" />
          </div>

          <div class="field-group">
            <label class="field-label">Owner Name</label>
            <input type="text" class="field-input" value="${profile.ownerName}" onchange="updateVendorDraft('ownerName', this.value)" />
          </div>

          <div class="field-group">
            <label class="field-label">Starting Price (₹)</label>
            <input type="number" class="field-input" value="${profile.startingPrice}" onchange="updateVendorDraft('startingPrice', parseInt(this.value))" />
          </div>

          <div class="field-group">
            <label class="field-label">Location</label>
            <input type="text" class="field-input" value="${profile.location}" onchange="updateVendorDraft('location', this.value)" />
          </div>
        </div>

        <div class="field-group" style="margin-top:1.25rem;">
          <label class="field-label">Vendor Description</label>
          <textarea class="field-input" style="height:80px;" onchange="updateVendorDraft('description', this.value)">${profile.description}</textarea>
        </div>

        <div style="margin-top:1.5rem; text-align:right; display:flex; gap:1rem; justify-content:flex-end;">
          <button class="btn btn-outline" onclick="alert('Draft Saved Successfully!')">Save Draft</button>
          <button class="btn btn-primary" onclick="submitProfileVerificationTrigger()">
            Submit for Verification (Send to Admin)
          </button>
        </div>
      </div>
    </div>
  `;
}

/* Admin Portal View */
function renderAdminPortal(state) {
  const verifications = state.vendorVerifications;

  return `
    <div class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <div>
          <h1 class="section-title">Auresta Admin Portal</h1>
          <p class="section-subtitle">Real-time verification approvals & platform revenue oversight</p>
        </div>
      </div>

      <div class="stats-row reveal-group">
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Total GMV Processed</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary);">₹14,50,000</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">💼</div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">Platform Commission (10%)</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--status-success);">₹1,45,000</div>
          </div>
        </div>
      </div>

      <!-- Real-Time Verification Requests Queue (Requirements #4 & #5) -->
      <div class="package-card" style="margin-top:2rem;">
        <h3 style="color:var(--text-primary); margin-bottom:1.25rem;">Vendor Verification Requests</h3>
        <div style="overflow-x:auto;">
        <table style="width:100%; min-width:520px; text-align:left; border-collapse:collapse; color:var(--text-secondary); font-size:0.9rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color); color:var(--text-primary);">
              <th style="padding:0.75rem;">Vendor Name</th>
              <th style="padding:0.75rem;">Doc Status</th>
              <th style="padding:0.75rem;">Verification Status</th>
              <th style="padding:0.75rem;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${verifications.map(req => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:0.75rem; font-weight:700; color:var(--text-primary);">${req.name}</td>
                <td style="padding:0.75rem; color:var(--status-success);">✓ GST & Business ID Submitted</td>
                <td style="padding:0.75rem;">
                  <span class="badge ${req.status === 'Verified' ? 'badge-verified' : 'badge-urgent'}">${req.status}</span>
                </td>
                <td style="padding:0.75rem;">
                  ${req.status === 'Verified' ? `<span style="color:var(--status-success); font-weight:700;">✓ Approved</span>` : `
                    <button class="btn btn-sm btn-primary" onclick="approveVendorVerification('${req.id}')">Approve & Issue Badge</button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  `;
}

/* UI Vendor Card Component */
function renderVendorCard(v, state) {
  const isFav = state.favorites.includes(v.id);

  return `
    <div class="vendor-card">
      <img src="${v.coverImage}" class="vendor-card-img" alt="${v.name}" />
      <div class="vendor-card-overlay">
        <span class="badge ${v.verified ? 'badge-verified' : 'badge-gold'}">
          ${v.verified ? '✓ VERIFIED' : 'PENDING'}
        </span>
        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${v.id}')" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-pressed="${isFav}">❤️</button>
      </div>

      <div class="vendor-card-body">
        <div class="vendor-name">${v.name}</div>
        <div class="vendor-category">${v.categoryName} • ${v.location}</div>

        <div class="vendor-meta">
          <div class="rating-pill">⭐ ${v.rating} (${v.reviewCount})</div>
          <div class="price-tag">₹${v.startingPrice.toLocaleString('en-IN')} <span>starts</span></div>
        </div>

        ${v.urgentAvailable ? `<div style="font-size:0.78rem; color:var(--status-error); margin-bottom:0.8rem; font-weight:700;">⚡ ${v.urgentNotice}</div>` : ''}

        <div class="vendor-card-actions">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="openVendorDetail('${v.id}')">Profile & Calendar</button>
          <button class="btn btn-primary btn-sm" onclick="startCheckoutFromVendor('${v.id}')">Book Now</button>
        </div>
      </div>
    </div>
  `;
}

/* UI Package Card Component */
function renderPackageCard(p) {
  return `
    <div class="package-card ${p.featured ? 'featured' : ''}">
      <span class="package-badge">${p.badge || 'SPECIAL DEAL'}</span>
      <h3 class="package-title">${p.title}</h3>
      <div style="color:var(--text-secondary); font-size:0.85rem;">${p.guestCount} • ${p.duration || 'Flexible'}</div>

      <div class="package-price-box">
        <span class="original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
        <div class="deal-price">₹${p.dealPrice.toLocaleString('en-IN')}</div>
        <span class="badge badge-verified">SAVE ${p.savingsPct}% BUNDLE DEAL</span>
      </div>

      <ul class="package-inclusions">
        ${p.inclusions.map(inc => `<li>✓ ${inc}</li>`).join('')}
      </ul>

      <button class="btn btn-primary" style="margin-top:auto;" onclick="startCheckoutFromPackage('${p.id}')">
        Book Package
      </button>
    </div>
  `;
}

/* Modal Helper */
function renderModal(state) {
  if (!state.activeModal) return '';

  if (state.activeModal === 'payment_gateway') {
    const draft = state.checkoutDraft;
    if (!draft) return '';

    return `
      <div class="modal-overlay active">
        <div class="modal-container" style="max-width:550px;">
          <div class="modal-header">
            <div class="modal-title">Review & Pay Deposit</div>
            <button class="modal-close" onclick="closeModal()" aria-label="Close dialog">✕</button>
          </div>
          <div class="modal-body">
            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem; margin-bottom:1.5rem;">
              <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${draft.vendorName || draft.title}</h4>
              <div style="color:var(--text-secondary); font-size:0.88rem; margin:0.3rem 0;">Booking Date: <strong>${draft.date || state.selectedBookingDate || '2026-09-25'}</strong></div>
              <div style="border-top:1px solid var(--border-color); margin-top:0.8rem; padding-top:0.8rem;">
                <div style="display:flex; justify-content:space-between; font-size:0.88rem;"><span>Base Service Price:</span><span>₹${draft.totalAmount.toLocaleString('en-IN')}</span></div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem;"><span>Platform Protection Fee:</span><span>₹499</span></div>
                <div style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--status-success);"><span>Auresta Savings Discount:</span><span>-₹499</span></div>
                <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.1rem; margin-top:0.5rem; color:var(--text-primary);">
                  <span>Total Amount:</span><span>₹${draft.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <h3 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:1rem;">How would you like to pay?</h3>

            <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;">
              <label class="checkbox-item" style="padding:0.75rem; border:1px solid var(--border-color); border-radius:var(--radius-md); background:#FFF;">
                <input type="radio" name="payMethod" value="UPI" checked />
                <span><strong>UPI / QR</strong> (Google Pay, PhonePe, Paytm)</span>
              </label>
              <label class="checkbox-item" style="padding:0.75rem; border:1px solid var(--border-color); border-radius:var(--radius-md); background:#FFF;">
                <input type="radio" name="payMethod" value="Card" />
                <span><strong>Credit / Debit Card</strong> (Visa, Mastercard, RuPay)</span>
              </label>
              <label class="checkbox-item" style="padding:0.75rem; border:1px solid var(--border-color); border-radius:var(--radius-md); background:#FFF;">
                <input type="radio" name="payMethod" value="NetBanking" />
                <span><strong>Net Banking</strong> (All Major Indian Banks)</span>
              </label>
            </div>

            <div style="background:var(--bg-soft-gold); padding:0.85rem; border-radius:var(--radius-md); font-size:0.85rem; color:var(--text-primary); margin-bottom:1.5rem;">
              💳 <strong>Pay Now: ₹${draft.depositPaid.toLocaleString('en-IN')}</strong> (20% Deposit)<br/>
              🤝 <strong>Remaining Balance: ₹${draft.balanceDue.toLocaleString('en-IN')}</strong> (Payable directly on event day)
            </div>

            <button class="btn btn-primary" style="width:100%; padding:0.9rem; font-size:1rem;" onclick="confirmPaymentGateway()">
              Pay Deposit (₹${draft.depositPaid.toLocaleString('en-IN')}) & Confirm Booking
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.activeModal === 'booking_confirmed') {
    const booking = state.lastConfirmedBooking;
    if (!booking) return '';

    return `
      <div class="modal-overlay active">
        <div class="modal-container" style="max-width:520px; text-align:center;">
          <div class="modal-body" style="padding:2.5rem 1.75rem;">
            <div style="font-size:3rem; margin-bottom:0.5rem;">🎉</div>
            <h2 style="font-size:1.8rem; font-weight:700; color:var(--text-primary);">Booking Confirmed!</h2>
            <div style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:1.5rem;">Your reservation has been locked & vendor calendar synchronized in real time.</div>

            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem; text-align:left; margin-bottom:1.5rem;">
              <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1rem; margin-bottom:0.5rem;">
                <span>Voucher ID: ${booking.id}</span>
                <span class="badge badge-verified">✓ CONFIRMED</span>
              </div>
              <div style="font-size:0.9rem; color:var(--text-primary);"><strong>Vendor/Package:</strong> ${booking.vendorName}</div>
              <div style="font-size:0.9rem; color:var(--text-primary);"><strong>Event Date:</strong> ${booking.date}</div>
              <div style="font-size:0.9rem; color:var(--text-primary);"><strong>Deposit Paid:</strong> ₹${booking.depositPaid.toLocaleString('en-IN')}</div>
              <div style="font-size:0.9rem; color:var(--status-success); margin-top:0.4rem;"><strong>Remaining Due:</strong> ₹${booking.balanceDue.toLocaleString('en-IN')}</div>
            </div>

            <div style="display:flex; gap:0.75rem;">
              <button class="btn btn-outline" style="flex:1;" onclick="closeModal(); navigateTo('support');">Need Support?</button>
              <button class="btn btn-primary" style="flex:1;" onclick="closeModal(); navigateTo('my_event');">View My Event</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (state.activeModal === 'vendor_preview') {
    const p = state.vendorProfileDraft;

    return `
      <div class="modal-overlay active">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title">Public Profile Preview (${p.businessName})</div>
            <button class="modal-close" onclick="closeModal()" aria-label="Close dialog">✕</button>
          </div>
          <div class="modal-body">
            <div style="position:relative; margin-bottom:1.5rem;">
              <img src="${p.coverImage}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-xl);" />
              <span class="badge ${p.verificationStatus === 'Verified' ? 'badge-verified' : 'badge-urgent'}" style="position:absolute; top:16px; left:16px; font-size:0.9rem;">
                ${p.verificationStatus === 'Verified' ? '✓ VERIFIED VENDOR' : 'PENDING VERIFICATION'}
              </span>
            </div>

            <h1 style="color:var(--text-primary); font-size:1.8rem; font-weight:700;">${p.businessName}</h1>
            <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:0.8rem;">${p.categoryName} • ${p.location}</p>
            
            <div style="display:flex; gap:1rem; margin-bottom:1.5rem; font-size:0.88rem; font-weight:700;">
              <span>⭐ 4.9 Rating (128 Reviews)</span>
              <span>⚡ ${p.responseTime} Response</span>
              <span>📈 Total Bookings: 12</span>
            </div>

            <p style="color:var(--text-primary); font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">${p.description}</p>

            <button class="btn btn-primary" style="width:100%;" onclick="closeModal()">Close Preview</button>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

/* Footer Component */
function renderFooter(state) {
  return `
    <footer style="background:#FFFFFF; border-top:1px solid var(--border-color); padding:3.5rem 0 2rem 0; margin-top:4rem;">
      <div class="container">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:2rem; margin-bottom:2.5rem;">
          <div>
            <div class="logo" style="margin-bottom:0.5rem;">
              <div class="logo-icon">👑</div>
              <span>AURESTA</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:var(--text-secondary); margin-bottom:1rem; font-style:italic;">
              "Where Moments Turn Golden"
            </div>
            <p style="color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
              Plan, customize, and book your entire event in one place. Connecting verified vendors with event hosts across India.
            </p>
          </div>

          <div>
            <h4 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:1rem;">Explore</h4>
            <ul style="list-style:none; line-height:2; font-size:0.88rem;">
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('explore')">Find Vendors</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('packages')">Pre-Made Deals</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('builder')">Package Customizer</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('urgency')">Urgent Available Now</a></li>
            </ul>
          </div>

          <div>
            <h4 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:1rem;">For Vendors</h4>
            <ul style="list-style:none; line-height:2; font-size:0.88rem;">
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="switchRole('vendor')">Vendor Dashboard</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="switchRole('vendor')">Self-Service Profile Builder</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="switchRole('vendor')">Verification Desk</a></li>
            </ul>
          </div>

          <div>
            <h4 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:1rem;">Trust & Safety</h4>
            <ul style="list-style:none; line-height:2; font-size:0.88rem;">
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('support')">Auresta Chat Support</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;" onclick="navigateTo('support')">Refund & Cancellation Policy</a></li>
              <li><a href="#" style="color:var(--text-secondary); text-decoration:none;">Verified Reviews Policy</a></li>
            </ul>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; text-align:center; color:var(--text-secondary); font-size:0.82rem;">
          © 2026 Auresta Inc. All rights reserved. Where Moments Turn Golden.
        </div>
      </div>
    </footer>
  `;
}

/* Standalone Vendor Profile View with Interactive Date Selection (Requirements #12 & #13) */
function renderVendorDetailView(state) {
  const vendorId = state.activeVendorId || 'v-1';
  const vendor = window.CELEBRATION_DATA.vendors.find(v => v.id === vendorId) || window.CELEBRATION_DATA.vendors[0];
  const selectedDate = state.selectedBookingDate || '2026-09-25';

  return `
    <div class="container" style="padding-top:2rem;">
      <button class="btn btn-sm btn-outline" style="margin-bottom:1.5rem;" onclick="navigateTo('explore')">
        ← Back to Marketplace
      </button>

      <div class="marketplace-layout" style="grid-template-columns: 2fr 1fr;">
        <div>
          <div style="position:relative; margin-bottom:1.5rem;">
            <img src="${vendor.coverImage}" style="width:100%; height:320px; object-fit:cover; border-radius:var(--radius-xl);" />
            <span class="badge ${vendor.verified ? 'badge-verified' : 'badge-gold'}" style="position:absolute; top:16px; left:16px; font-size:0.9rem;">
              ${vendor.verified ? '✓ VERIFIED VENDOR' : 'PENDING VERIFICATION'}
            </span>
          </div>

          <h1 style="color:var(--text-primary); font-size:2.2rem; font-weight:700;">${vendor.name}</h1>
          <p style="color:var(--text-secondary); font-size:1rem; margin-bottom:1rem;">${vendor.categoryName} • ${vendor.location}</p>
          <p style="color:var(--text-primary); font-size:0.95rem; line-height:1.6; margin-bottom:2rem;">${vendor.description}</p>

          <h3 style="color:var(--text-primary); margin-bottom:1rem;">Portfolio Work</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:2.5rem;">
            ${vendor.portfolio.map(img => `
              <img src="${img}" style="width:100%; height:140px; object-fit:cover; border-radius:var(--radius-lg); border:1px solid var(--border-color);" />
            `).join('')}
          </div>

          <h3 style="color:var(--text-primary); margin-bottom:1rem;">Service Packages</h3>
          <div style="display:grid; gap:1rem; margin-bottom:2rem;">
            ${vendor.packages.map(pkg => `
              <div class="package-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; color:var(--text-primary); font-size:1.1rem;">${pkg.name}</div>
                  <div style="color:var(--text-secondary); font-size:0.88rem;">${pkg.desc}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary);">₹${pkg.price.toLocaleString('en-IN')}</div>
                  <button class="btn btn-sm btn-primary" style="margin-top:0.5rem;" onclick="startCheckoutFromVendor('${vendor.id}')">Select & Book</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- INTERACTIVE AVAILABILITY CALENDAR WITH DATE SELECTION -->
        <aside class="filter-sidebar" style="top:96px;">
          <h3 style="color:var(--text-primary); margin-bottom:0.5rem;">Select Booking Date</h3>
          <p style="color:var(--text-secondary); font-size:0.82rem; margin-bottom:1rem;">Click an open date cell below to select your date.</p>

          <div class="calendar-grid">
            ${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<div class="calendar-day-label">${d}</div>`).join('')}
            ${Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const isBooked = vendor.bookedDates.includes(dateStr) || dayNum === 20 || dayNum === 25;
              const isSelected = selectedDate === dateStr;

              return `
                <div class="calendar-date-cell ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}"
                     ${isBooked ? 'aria-disabled="true"' : `role="button" tabindex="0" aria-label="Select ${dateStr}" onkeypress="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectVendorProfileDate('${dateStr}')}"`}
                     onclick="${isBooked ? '' : `selectVendorProfileDate('${dateStr}')`}">
                  ${dayNum}
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top:1rem; padding:0.75rem; background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:0.85rem;">
            <strong>Selected Date:</strong> ${selectedDate}
          </div>

          <div style="margin-top:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <button class="btn btn-primary" onclick="startCheckoutFromVendor('${vendor.id}')">
              Book for ${selectedDate} (Starts ₹${vendor.startingPrice.toLocaleString('en-IN')})
            </button>
            <button class="btn btn-outline" onclick="openVendorChatDirect('${vendor.id}')">💬 Chat with Vendor</button>
          </div>
        </aside>
      </div>
    </div>
  `;
}

/* Event Handlers & Routing Helpers */
function navigateTo(view, params = {}) {
  window.appStore.setView(view, params);
}

function switchRole(role) {
  window.appStore.setRole(role);
}

function setSearchParam(key, val) {
  window.appStore.updateSearch({ [key]: val });
}

function setPackageFilter(key, val) {
  window.appStore.updatePackageFilters({ [key]: val });
}

function resetPackageFilters() {
  window.appStore.updatePackageFilters({ budgetRange: 'all', eventType: 'all' });
}

function toggleCategorySelection(catId) {
  window.appStore.toggleCategoryFilter(catId);
}

function resetCategorySelection() {
  window.appStore.updateSearch({ selectedCategories: [] });
}

function selectCategoryFilter(catId) {
  window.appStore.updateSearch({ eventType: catId, selectedCategories: [catId] });
  navigateTo('explore');
}

function selectVendorProfileDate(dateStr) {
  window.appStore.setSelectedBookingDate(dateStr);
}

function filterVendors(state) {
  let list = [...window.CELEBRATION_DATA.vendors];
  const p = state.searchParams;

  if (p.selectedCategories && p.selectedCategories.length > 0) {
    list = list.filter(v => p.selectedCategories.includes(v.category));
  }

  if (p.verifiedOnly) list = list.filter(v => v.verified);
  if (p.urgency === 'today') list = list.filter(v => v.urgentAvailable);

  if (p.sortBy === 'price_asc') {
    list.sort((a, b) => a.startingPrice - b.startingPrice);
  } else if (p.sortBy === 'price_desc') {
    list.sort((a, b) => b.startingPrice - a.startingPrice);
  } else if (p.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (p.sortBy === 'speed') {
    list.sort((a, b) => (a.urgentAvailable ? -1 : 1));
  }

  return list;
}

function toggleFav(vendorId) {
  window.appStore.toggleFavorite(vendorId);
}

function resetFilters() {
  window.appStore.updateSearch({
    category: 'all',
    selectedCategories: [],
    verifiedOnly: false,
    urgency: 'any',
    showUnavailable: false,
    sortBy: 'rating'
  });
}

function openVendorDetail(vendorId) {
  window.appStore.setView('vendor_detail', { vendorId });
}

function closeModal() {
  window.appStore.closeModal();
}

function addBuilderVendor(category, vendorId) {
  window.appStore.updateCustomPackage(category, vendorId);
}

function removeBuilderVendor(category) {
  window.appStore.updateCustomPackage(category, null);
}

function proceedCustomPackageCheckout(totalAmount) {
  if (totalAmount === 0) {
    alert('Please select at least one vendor for your package.');
    return;
  }
  const deposit = Math.round(totalAmount * 0.2);
  window.appStore.startCheckout({
    vendorId: 'v-custom',
    vendorName: 'Custom Auresta Event Package',
    totalAmount,
    depositPaid: deposit,
    balanceDue: totalAmount - deposit
  });
}

function startCheckoutFromVendor(vendorId) {
  const v = window.CELEBRATION_DATA.vendors.find(item => item.id === vendorId);
  if (!v) return;
  const deposit = Math.round(v.startingPrice * 0.2);
  window.appStore.startCheckout({
    vendorId: v.id,
    vendorName: v.name,
    totalAmount: v.startingPrice,
    depositPaid: deposit,
    balanceDue: v.startingPrice - deposit,
    date: window.appStore.state.selectedBookingDate
  });
}

function startCheckoutFromPackage(packageId) {
  const pkg = window.CELEBRATION_DATA.preMadePackages.find(p => p.id === packageId);
  if (!pkg) return;
  const deposit = Math.round(pkg.dealPrice * 0.2);
  window.appStore.startCheckout({
    vendorId: 'pkg-' + pkg.id,
    vendorName: pkg.title,
    packageName: pkg.title,
    totalAmount: pkg.dealPrice,
    depositPaid: deposit,
    balanceDue: pkg.dealPrice - deposit
  });
}

function confirmPaymentGateway() {
  const radios = document.getElementsByName('payMethod');
  let selectedMethod = 'UPI';
  for (let r of radios) {
    if (r.checked) selectedMethod = r.value;
  }
  if (window.confetti) window.confetti();
  window.appStore.processPayment(selectedMethod);
}

async function sendSupportMsg() {
  const input = document.getElementById('supportInput');
  if (!input || !input.value.trim()) return;

  const message = input.value.trim();
  input.value = '';

  window.appStore.sendSupportMessage('SUP-101', message);

  try {
    const response = await fetch(`${window.AURESTA_API_BASE_URL || 'http://localhost:5000/api'}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    if (data.success && data.response) {
      window.appStore.sendSupportMessage('SUP-101', data.response, 'support');
    } else {
      window.appStore.sendSupportMessage(
        'SUP-101',
        'Sorry, I could not process your request.'
      );
    }

  } catch (error) {
    console.error('AURESTA AI Error:', error);

    window.appStore.sendSupportMessage(
      'SUP-101',
      'Sorry, I could not connect to AURESTA AI.'
    );
  }
}

function openVendorChatDirect(vendorId) {
  const text = prompt('Enter message to send directly to vendor:');
  if (text && text.trim()) {
    window.appStore.sendVendorDirectMessage(vendorId, text.trim());
    alert('Message sent directly to vendor!');
  }
}

function toggleChecklistItem(id) {
  const activeEvt = window.appStore.state.events[0];
  const item = activeEvt.checklist.find(i => i.id === id);
  if (item) item.done = !item.done;
  window.appStore.save();
}

function updateVendorDraft(key, val) {
  window.appStore.updateVendorProfile({ [key]: val });
}

function submitProfileVerificationTrigger() {
  window.appStore.submitVendorProfileForVerification();
  alert('Profile verification request sent to Admin Desk! Switch to Admin View to approve.');
}

function openVendorPreviewModal() {
  window.appStore.openModal('vendor_preview');
}

function approveVendorVerification(vendorId) {
  window.appStore.verifyVendor(vendorId);
  alert('Vendor approved! Verified badge updated across Vendor View, Admin Desk, and Consumer Marketplace.');
}

/* Mobile Navigation Toggle */
function toggleMobileNav() {
  const nav = document.querySelector('.nav-right');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;
  const isOpen = nav.classList.toggle('nav-open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileNav() {
  const nav = document.querySelector('.nav-right');
  const toggle = document.querySelector('.nav-toggle');
  if (nav) nav.classList.remove('nav-open');
  if (toggle) {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}

let _globalListenersBound = false;
function bindEvents() {
  // Global event bindings (bound once; renderApp rebuilds the DOM on every state change)
  if (_globalListenersBound) return;
  _globalListenersBound = true;

  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-right');
    const toggle = document.querySelector('.nav-toggle');
    if (nav && nav.classList.contains('nav-open') && !nav.contains(e.target) && !(toggle && toggle.contains(e.target))) {
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (window.appStore.state.activeModal) closeModal();
    closeMobileNav();
  });
}
