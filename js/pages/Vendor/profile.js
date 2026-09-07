/* =========================================================
   AURESTA — VENDOR PROFILE
   ========================================================= */

function renderVendorProfilePage() {
    return `
        <section class="page vendor-profile-page">

            <div class="page-header">

                <span class="section-eyebrow">
                    YOUR BUSINESS
                </span>

                <h1>
                    Vendor Profile
                </h1>

                <p>
                    Manage the information customers
                    see about your business.
                </p>

            </div>


            <form class="card vendor-profile-form">

                <div class="form-group">

                    <label class="form-label">
                        Business Name
                    </label>

                    <input
                        type="text"
                        class="form-input"
                        placeholder="Your business name"
                    >

                </div>


                <div class="form-group">

                    <label class="form-label">
                        Service Category
                    </label>

                    <select class="form-select">

                        <option>
                            Select category
                        </option>

                        <option>
                            Photography
                        </option>

                        <option>
                            Catering
                        </option>

                        <option>
                            Decoration
                        </option>

                        <option>
                            Makeup
                        </option>

                        <option>
                            Entertainment
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label class="form-label">
                        About Your Business
                    </label>

                    <textarea
                        class="form-textarea"
                        placeholder="Tell customers about your services"
                    ></textarea>

                </div>


                <div class="form-group">

                    <label class="form-label">
                        Starting Price
                    </label>

                    <input
                        type="number"
                        class="form-input"
                        placeholder="₹"
                    >

                </div>


                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Save Profile
                </button>

            </form>

        </section>
    `;
}