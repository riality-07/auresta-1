/* =========================================================
   AURESTA — VENDOR BOOKINGS
   ========================================================= */

function renderVendorBookingsPage() {
    return `
        <section class="page vendor-bookings-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    VENDOR PORTAL
                </span>

                <h1>
                    Your Bookings
                </h1>

                <p>
                    Manage customer bookings
                    and upcoming services.
                </p>

            </div>


            <div
                class="vendor-bookings-list"
                id="vendor-bookings"
            >

                <div class="card">

                    <span class="badge badge-success">
                        Upcoming
                    </span>

                    <h3>
                        No bookings yet
                    </h3>

                    <p>
                        Your confirmed customer
                        bookings will appear here.
                    </p>

                </div>

            </div>

        </section>
    `;
}