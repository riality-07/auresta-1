/* =========================================================
   AURESTA — VENDOR DASHBOARD
   ========================================================= */

function renderVendorDashboardPage() {
    return `
        <section class="page vendor-dashboard">

            <div class="page-header">

                <span class="section-eyebrow">
                    VENDOR PORTAL
                </span>

                <h1>
                    Welcome, Vendor
                </h1>

                <p>
                    Manage your Auresta business
                    from one place.
                </p>

            </div>


            <div class="dashboard-stats">

                <div class="card">
                    <span>Total Revenue</span>
                    <h2>₹0</h2>
                </div>

                <div class="card">
                    <span>Total Bookings</span>
                    <h2>0</h2>
                </div>

                <div class="card">
                    <span>Your Rating</span>
                    <h2>— ★</h2>
                </div>

            </div>


            <div class="card">

                <h2>
                    Your Business
                </h2>

                <p>
                    Keep your profile, availability,
                    bookings and services updated.
                </p>

            </div>

        </section>
    `;
}