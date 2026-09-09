/* =========================================================
   AURESTA — USER BOOKINGS PAGE
   ========================================================= */

function renderBookingsPage() {
    return `
        <section class="page bookings-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    YOUR EVENTS
                </span>

                <h1>
                    My Bookings
                </h1>

                <p>
                    Keep track of your upcoming and
                    completed event bookings.
                </p>

            </div>


            <!-- UPCOMING BOOKINGS -->

            <section>

                <h2>
                    Upcoming Events
                </h2>

                <div
                    class="bookings-list"
                    id="upcoming-bookings"
                >

                    <div class="card">

                        <span class="badge badge-success">
                            Confirmed
                        </span>

                        <h3>
                            Your upcoming event
                        </h3>

                        <p>
                            Event details will appear here
                            once a booking is confirmed.
                        </p>

                        <button
                            class="btn btn-secondary"
                            data-action="view-booking"
                        >
                            View Event Details
                        </button>

                    </div>

                </div>

            </section>


            <!-- PAST BOOKINGS -->

            <section>

                <h2>
                    Past Events
                </h2>

                <div
                    class="bookings-list"
                    id="past-bookings"
                >
                    <!-- Past bookings -->
                </div>

            </section>

        </section>
    `;
}