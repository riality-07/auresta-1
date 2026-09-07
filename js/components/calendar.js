/* =========================================================
   AURESTA — CALENDAR COMPONENT
   ========================================================= */

function renderCalendar(options = {}) {

    const {
        month = new Date().getMonth(),
        year = new Date().getFullYear(),
        unavailableDates = []
    } = options;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = new Date(year, month)
        .toLocaleString('default', { month: 'long' });

    let days = '';

    for (let i = 0; i < firstDay; i++) {
        days += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {

        const dateString =
            `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const unavailable =
            unavailableDates.includes(dateString);

        days += `
            <button
                class="calendar-day ${unavailable ? 'unavailable' : 'available'}"
                ${unavailable ? 'disabled' : ''}
                data-date="${dateString}"
            >
                ${day}
            </button>
        `;
    }

    return `
        <div class="calendar">

            <div class="calendar-header">

                <button
                    class="calendar-nav"
                    data-action="previous-month"
                >
                    ‹
                </button>

                <h3>
                    ${monthName} ${year}
                </h3>

                <button
                    class="calendar-nav"
                    data-action="next-month"
                >
                    ›
                </button>

            </div>


            <div class="calendar-weekdays">

                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>

            </div>


            <div class="calendar-grid">
                ${days}
            </div>


            <div class="calendar-legend">

                <span>
                    <i class="available-indicator"></i>
                    Available
                </span>

                <span>
                    <i class="unavailable-indicator"></i>
                    Unavailable
                </span>

            </div>

        </div>
    `;
}