/* =========================================================
   AURESTA — ADMIN DASHBOARD
   ========================================================= */

function renderAdminDashboardPage() {
    return `
        <section class="page admin-dashboard">

            <div class="page-header">

                <span class="section-eyebrow">
                    ADMIN PORTAL
                </span>

                <h1>
                    Auresta Dashboard
                </h1>

                <p>
                    Monitor platform activity and
                    business performance.
                </p>

            </div>


            <div class="dashboard-stats">


                <div class="card">

                    <span>
                        Total GMV
                    </span>

                    <h2>
                        ₹0
                    </h2>

                    <p>
                        Total transaction value
                        processed through Auresta.
                    </p>

                </div>


                <div class="card">

                    <span>
                        Total Commission
                    </span>

                    <h2>
                        ₹0
                    </h2>

                    <p>
                        Commission generated
                        through platform transactions.
                    </p>

                </div>


                <div class="card">

                    <span>
                        Vendors
                    </span>

                    <h2>
                        0
                    </h2>

                    <p>
                        Vendors registered
                        on the platform.
                    </p>

                </div>


                <div class="card">

                    <span>
                        Pending Verification
                    </span>

                    <h2>
                        0
                    </h2>

                    <p>
                        Vendor profiles awaiting review.
                    </p>

                </div>


            </div>


            <div class="card">

                <h2>
                    Platform Overview
                </h2>

                <p>
                    Use the Admin Portal to manage
                    vendor verification and monitor
                    Auresta's overall performance.
                </p>

            </div>

        </section>
    `;
}