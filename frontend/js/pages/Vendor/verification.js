/* =========================================================
   AURESTA — VENDOR VERIFICATION
   ========================================================= */

function renderVendorVerificationPage() {
    return `
        <section class="page vendor-verification-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    TRUST & VERIFICATION
                </span>

                <h1>
                    Profile Verification
                </h1>

                <p>
                    Submit your information to have
                    your vendor profile reviewed by Auresta.
                </p>

            </div>


            <div class="card">

                <div class="verification-status">

                    <span class="badge badge-warning">
                        Verification Pending
                    </span>

                </div>


                <form class="verification-form">

                    <div class="form-group">

                        <label class="form-label">
                            Business Name
                        </label>

                        <input
                            type="text"
                            class="form-input"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label class="form-label">
                            Contact Information
                        </label>

                        <input
                            type="text"
                            class="form-input"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label class="form-label">
                            Verification Information
                        </label>

                        <textarea
                            class="form-textarea"
                            placeholder="Provide the required verification information"
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Submit for Verification
                    </button>

                </form>

            </div>

        </section>
    `;
}