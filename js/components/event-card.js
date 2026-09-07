/* =========================================================
   AURESTA — EVENT CARD
   ========================================================= */

function renderEventCard(event = {}) {

    const {
        id = '',
        title = 'Auresta Event',
        type = 'Celebration',
        image = '',
        location = '',
        date = ''
    } = event;

    return `
        <article
            class="event-card"
            data-event-id="${id}"
        >

            ${image ? `
                <img
                    src="${image}"
                    alt="${title}"
                    class="event-card-image"
                >
            ` : ''}


            <div class="event-card-content">

                <span class="badge badge-gold">
                    ${type}
                </span>


                <h3>
                    ${title}
                </h3>


                ${location ? `
                    <p>
                        📍 ${location}
                    </p>
                ` : ''}


                ${date ? `
                    <p>
                        📅 ${date}
                    </p>
                ` : ''}


                <button
                    class="btn btn-secondary"
                    data-action="view-event"
                    data-event-id="${id}"
                >
                    View Event
                </button>

            </div>

        </article>
    `;
}