/* =========================================================
   AURESTA — ADMIN VENDOR VERIFICATION
   ========================================================= */

function renderAdminVendorVerificationPage() {
    return `
        <section class="page admin-verification-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    ADMIN PORTAL
                </span>

                <h1>
                    Vendor Verification
                </h1>

                <p>
                    Review and manage vendor
                    verification requests.
                </p>

            </div>


            <div
                class="verification-list"
                id="admin-verification-list"
            >

                <div class="card">

                    <span class="badge badge-warning">
                        Pending Review
                    </span>

                    <h3>
                        Vendor Application
                    </h3>

                    <p>
                        Vendor verification requests
                        will appear here.
                    </p>


                    <div class="verification-actions">

                        <button
                            class="btn btn-primary"
                            data-action="approve-vendor"
                        >
                            Approve
                        </button>

                        <button
                            class="btn btn-secondary"
                            data-action="review-vendor"
                        >
                            Review Details
                        </button>

                    </div>

                </div>

            </div>

        </section>
    `;
}