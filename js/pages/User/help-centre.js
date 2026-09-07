/* =========================================================
   AURESTA — HELP CENTRE PAGE
   ========================================================= */

function renderHelpCentrePage() {
    return `
        <section class="page help-centre-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    WE'RE HERE FOR YOU
                </span>

                <h1>
                    Help Centre
                </h1>

                <p>
                    Need help? Our support team is
                    here to assist you.
                </p>

            </div>


            <div class="support-grid">


                <div class="support-card">

                    <h3>
                        Booking Help
                    </h3>

                    <p>
                        Questions about your existing
                        or upcoming bookings.
                    </p>

                    <button class="btn btn-secondary">
                        Get Booking Help
                    </button>

                </div>


                <div class="support-card">

                    <h3>
                        Refund Help
                    </h3>

                    <p>
                        Need assistance with a refund
                        or payment reversal?
                    </p>

                    <button class="btn btn-secondary">
                        Request Refund Help
                    </button>

                </div>


                <div class="support-card">

                    <h3>
                        Cancellation
                    </h3>

                    <p>
                        Submit a request to cancel
                        an applicable booking.
                    </p>

                    <button class="btn btn-secondary">
                        Request Cancellation
                    </button>

                </div>


                <div class="support-card">

                    <h3>
                        Payment Help
                    </h3>

                    <p>
                        Get assistance with
                        payment-related issues.
                    </p>

                    <button class="btn btn-secondary">
                        Get Payment Help
                    </button>

                </div>


                <div class="support-card">

                    <h3>
                        General Support
                    </h3>

                    <p>
                        Have another question?
                        We're happy to help.
                    </p>

                    <button
                        class="btn btn-primary"
                        data-action="open-support-chat"
                    >
                        Chat With Auresta
                    </button>

                </div>


            </div>

        </section>
    `;
}