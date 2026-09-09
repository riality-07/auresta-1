/* =========================================================
   AURESTA — EXPLORE VENDORS PAGE
   ========================================================= */

function renderExploreVendorsPage() {
    return `
        <section class="page explore-vendors-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    DISCOVER
                </span>

                <h1>
                    Explore Vendors
                </h1>

                <p>
                    Find the perfect professionals
                    for your celebration.
                </p>

            </div>


            <!-- FILTERS -->

            <section class="vendor-filters">

                <div class="filter-bar">

                    <div class="filter-item">

                        <label>
                            Category
                        </label>

                        <select class="form-select">
                            <option>All Categories</option>
                            <option>Photography</option>
                            <option>Catering</option>
                            <option>Decoration</option>
                            <option>Makeup</option>
                            <option>Entertainment</option>
                            <option>Event Planning</option>
                        </select>

                    </div>


                    <div class="filter-item">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            class="form-input"
                            placeholder="Search location"
                        >

                    </div>


                    <div class="filter-item">

                        <label>
                            Budget
                        </label>

                        <input
                            type="number"
                            class="form-input"
                            placeholder="Maximum price"
                        >

                    </div>


                    <div class="filter-item">

                        <label>
                            Sort By
                        </label>

                        <select class="form-select">

                            <option>
                                Relevance
                            </option>

                            <option>
                                Highest Rated
                            </option>

                            <option>
                                Price: Low to High
                            </option>

                            <option>
                                Price: High to Low
                            </option>

                        </select>

                    </div>


                    <button class="btn btn-primary">
                        Apply Filters
                    </button>

                </div>

            </section>


            <!-- VENDORS -->

            <section class="vendor-results">

                <div class="results-header">

                    <h2>
                        Available Vendors
                    </h2>

                    <span>
                        Showing recommended vendors
                    </span>

                </div>


                <div
                    class="vendor-grid"
                    id="vendor-results"
                >
                    <!-- Vendor cards will be rendered here -->
                </div>

            </section>

        </section>
    `;
}