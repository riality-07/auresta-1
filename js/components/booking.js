/* =========================================================
   AURESTA — EVENT / BOOKING FORM
   ========================================================= */

function renderBookingForm() {

    return `
        <form
            class="booking-form"
            id="booking-form"
        >

            <div class="form-group">

                <label class="form-label">
                    Event Type
                </label>

                <select
                    name="eventType"
                    class="form-select"
                    required
                >
                    <option value="">
                        Select celebration
                    </option>

                    <option value="wedding">
                        Wedding
                    </option>

                    <option value="birthday">
                        Birthday Party
                    </option>

                    <option value="anniversary">
                        Anniversary
                    </option>

                    <option value="engagement">
                        Engagement
                    </option>

                    <option value="corporate">
                        Corporate Event
                    </option>

                    <option value="baby-shower">
                        Baby Shower
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label class="form-label">
                    Event Date
                </label>

                <input
                    type="date"
                    name="eventDate"
                    class="form-input"
                    required
                >

            </div>


            <div class="form-group">

                <label class="form-label">
                    Budget
                </label>

                <input
                    type="number"
                    name="budget"
                    class="form-input"
                    placeholder="Enter your budget"
                    min="0"
                >

            </div>


            <div class="form-group">

                <label class="form-label">
                    Guest Count
                </label>

                <input
                    type="number"
                    name="guestCount"
                    class="form-input"
                    placeholder="Number of guests"
                    min="1"
                >

            </div>


            <div class="form-group">

                <label class="form-label">
                    Location
                </label>

                <input
                    type="text"
                    name="location"
                    class="form-input"
                    placeholder="Event location"
                >

            </div>


            <button
                type="submit"
                class="btn btn-primary"
            >
                Find Vendors
            </button>

        </form>
    `;
}