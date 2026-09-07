/* =========================================================
   AURESTA — NAVBAR COMPONENT
   ========================================================= */

function renderNavbar(state = {}) {
    return `
        <nav class="navbar">
            <div class="navbar-container">

                <a href="#" class="navbar-logo">
                    <span class="navbar-logo-mark">✦</span>
                    <span class="navbar-logo-text">AURESTA</span>
                </a>

                <div class="navbar-links">

                    <a href="#" data-page="home" class="nav-link">
                        Home
                    </a>

                    <a href="#" data-page="explore" class="nav-link">
                        Explore Vendors
                    </a>

                    <a href="#" data-page="packages" class="nav-link">
                        Packages & Deals
                    </a>

                    <a href="#" data-page="bookings" class="nav-link">
                        My Bookings
                    </a>

                    <a href="#" data-page="support" class="nav-link">
                        Help Centre
                    </a>

                </div>

                <div class="navbar-actions">

                    <button
                        class="btn btn-outline"
                        data-action="profile"
                    >
                        Profile
                    </button>

                </div>

            </div>
        </nav>
    `;
}