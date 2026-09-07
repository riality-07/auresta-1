/* =========================================================
   AURESTA — PACKAGE CARD
   ========================================================= */

function renderPackageCard(pkg = {}) {

    const {
        id = '',
        name = 'Event Package',
        description = '',
        image = '',
        price = '₹ —',
        originalPrice = '',
        discount = '',
        services = []
    } = pkg;

    return `
        <article
            class="package-card"
            data-package-id="${id}"
        >

            ${image ? `
                <img
                    src="${image}"
                    alt="${name}"
                    class="package-card-image"
                >
            ` : ''}


            ${discount ? `
                <span class="badge badge-gold">
                    ${discount} OFF
                </span>
            ` : ''}


            <h3 class="package-card-title">
                ${name}
            </h3>


            ${description ? `
                <p class="package-card-description">
                    ${description}
                </p>
            ` : ''}


            ${services.length ? `
                <ul class="package-card-services">

                    ${services.map(service => `
                        <li>
                            ✓ ${service}
                        </li>
                    `).join('')}

                </ul>
            ` : ''}


            <div class="package-card-pricing">

                <span class="package-card-price">
                    ${price}
                </span>

                ${originalPrice ? `
                    <span class="package-card-original-price">
                        ${originalPrice}
                    </span>
                ` : ''}

            </div>


            <button
                class="btn btn-primary"
                data-action="select-package"
                data-package-id="${id}"
            >
                Select Package
            </button>

        </article>
    `;
}