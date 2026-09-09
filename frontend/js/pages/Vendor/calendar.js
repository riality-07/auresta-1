/* =========================================================
   AURESTA — VENDOR CALENDAR
   ========================================================= */

function renderVendorCalendarPage() {
    return `
        <section class="page vendor-calendar-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    AVAILABILITY
                </span>

                <h1>
                    Your Calendar
                </h1>

                <p>
                    Manage your availability and
                    keep track of upcoming services.
                </p>

            </div>


            <div class="card">

                <div class="calendar-status">

                    <span class="badge badge-success">
                        Available
                    </span>

                    <span class="badge badge-danger">
                        Unavailable
                    </span>

                </div>


                <div id="vendor-calendar">
                    <!-- Calendar component -->
                </div>

            </div>

        </section>
    `;
}