/* =========================================================
   AURESTA — VENDOR CARD
   ========================================================= */

function renderVendorCard(vendor = {}) {

    const {
        id = '',
        name = 'Vendor',
        category = 'Event Service',
        image = '',
        rating = '—',
        reviews = 0,
        price = 'Contact for pricing',
        location = '',
        available = true
    } = vendor;

    return `
        <article
            class="vendor-card"
            data-vendor-id="${id}"
        >

            ${image ? `
                <img
                    src="${image}"
                    alt="${name}"
                    class="vendor-card-image"
                >
            ` : ''}


            <div class="vendor-card-content">

                <div class="vendor-card-category">
                    ${category}
                </div>


                <h3 class="vendor-card-title">
                    ${name}
                </h3>


                ${location ? `
                    <div class="vendor-card-location">
                        📍 ${location}
                    </div>
                ` : ''}


                <div class="vendor-card-rating">

                    <span>★</span>

                    <strong>
                        ${rating}
                    </strong>

                    <span>
                        (${reviews} reviews)
                    </span>

                </div>


                <div class="vendor-card-price">
                    ${price}
                </div>


                <div class="vendor-card-status">

                    ${available
                        ? `<span class="badge badge-success">
                            Available
                           </span>`
                        : `<span class="badge badge-danger">
                            Unavailable
                           </span>`
                    }

                </div>


                <div class="vendor-card-actions">

                    <button
                        class="btn btn-secondary"
                        data-action="view-vendor"
                        data-vendor-id="${id}"
                    >
                        View Profile
                    </button>

                    <button
                        class="btn btn-primary"
                        data-action="book-vendor"
                        data-vendor-id="${id}"
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </article>
    `;
}