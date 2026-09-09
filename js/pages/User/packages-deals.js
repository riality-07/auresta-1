/* =========================================================
   AURESTA — PACKAGES & DEALS PAGE
   ========================================================= */

function renderPackagesDealsPage() {
    return `
        <section class="page packages-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    CURATED FOR YOU
                </span>

                <h1>
                    Packages & Deals
                </h1>

                <p>
                    Choose a ready-made package or
                    create your own celebration.
                </p>

            </div>


            <!-- READY-MADE PACKAGES -->

            <section class="packages-section">

                <div class="section-heading">

                    <h2>
                        Curated Packages
                    </h2>

                    <p>
                        Save time and money with
                        our ready-made event packages.
                    </p>

                </div>


                <div
                    class="packages-grid"
                    id="packages-grid"
                >
                    <!-- Package cards will appear here -->
                </div>

            </section>


            <!-- BUILD YOUR OWN -->

            <section class="custom-package-section">

                <div class="card">

                    <span class="badge badge-gold">
                        MAKE IT YOURS
                    </span>

                    <h2>
                        Build Your Own Package
                    </h2>

                    <p>
                        Select the services you need
                        and create a package designed
                        specifically for your event.
                    </p>


                    <div class="custom-package-services">

                        <label>
                            <input
                                type="checkbox"
                                value="photography"
                            >
                            Photography
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="catering"
                            >
                            Catering
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="decoration"
                            >
                            Decoration
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="makeup"
                            >
                            Makeup
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="entertainment"
                            >
                            Entertainment
                        </label>

                    </div>


                    <button
                        class="btn btn-primary"
                        data-action="build-package"
                    >
                        Build My Package
                    </button>

                </div>

            </section>

        </section>
    `;
}