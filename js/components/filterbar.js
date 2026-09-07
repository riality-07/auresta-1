/* =========================================================
   AURESTA — VENDOR FILTER BAR
   ========================================================= */

function renderFilterBar() {

    return `
        <div class="filter-bar">

            <div class="filter-item">

                <label>
                    Category
                </label>

                <select
                    class="form-select"
                    id="vendor-category-filter"
                >
                    <option value="all">
                        All Categories
                    </option>

                    <option value="photography">
                        Photography
                    </option>

                    <option value="catering">
                        Catering
                    </option>

                    <option value="decoration">
                        Decoration
                    </option>

                    <option value="makeup">
                        Makeup
                    </option>

                    <option value="entertainment">
                        Entertainment
                    </option>

                    <option value="planning">
                        Event Planning
                    </option>

                </select>

            </div>


            <div class="filter-item">

                <label>
                    Location
                </label>

                <input
                    type="text"
                    class="form-input"
                    id="vendor-location-filter"
                    placeholder="Location"
                >

            </div>


            <div class="filter-item">

                <label>
                    Maximum Price
                </label>

                <input
                    type="number"
                    class="form-input"
                    id="vendor-price-filter"
                    placeholder="₹"
                    min="0"
                >

            </div>


            <div class="filter-item">

                <label>
                    Sort By
                </label>

                <select
                    class="form-select"
                    id="vendor-sort"
                >

                    <option value="relevance">
                        Relevance
                    </option>

                    <option value="rating">
                        Highest Rated
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                </select>

            </div>


            <button
                class="btn btn-primary"
                data-action="apply-filters"
            >
                Apply Filters
            </button>

        </div>
    `;
}