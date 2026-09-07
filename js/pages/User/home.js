/* =========================================================
   AURESTA — USER HOME PAGE
   ========================================================= */

function renderHomePage() {
    return `
        <section class="page home-page">

            <!-- HERO -->

            <div class="hero-section">

                <div class="hero-content">

                    <span class="badge badge-gold">
                        WHERE MOMENTS TURN GOLDEN
                    </span>

                    <h1>
                        Plan Your Perfect
                        <span>Celebration.</span>
                    </h1>

                    <p>
                        Discover trusted vendors, curated packages,
                        and everything you need for your special event.
                    </p>

                </div>

            </div>


            <!-- EVENT SEARCH -->

            <section class="event-planner-section">

                <div class="section-heading">

                    <span class="section-eyebrow">
                        PLAN YOUR EVENT
                    </span>

                    <h2>
                        Tell us what you're planning.
                    </h2>

                    <p>
                        Enter your requirements and discover
                        vendors that match your event.
                    </p>

                </div>


                <form
                    class="booking-form"
                    id="event-search-form"
                >

                    <div class="form-group">

                        <label class="form-label">
                            Celebration
                        </label>

                        <select
                            name="eventType"
                            class="form-select"
                            required
                        >
                            <option value="">
                                Select event type
                            </option>

                            <option value="wedding">
                                Wedding
                            </option>

                            <option value="birthday">
                                Birthday
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
                            placeholder="₹ Your budget"
                        >

                    </div>


                    <div class="form-group">

                        <label class="form-label">
                            Guests
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

            </section>


            <!-- IMMEDIATE VENDOR -->

            <section class="immediate-vendor-section">

                <div class="card">

                    <span class="badge badge-gold">
                        NEED HELP NOW?
                    </span>

                    <h2>
                        Need a vendor immediately?
                    </h2>

                    <p>
                        Find available event professionals
                        who can provide their services quickly.
                    </p>

                    <button
                        class="btn btn-primary"
                        data-action="immediate-vendor"
                    >
                        Find a Vendor Now
                    </button>

                </div>

            </section>


            <!-- PREVIOUS EVENTS -->

            <section class="events-section">

                <div class="section-heading">

                    <span class="section-eyebrow">
                        GET INSPIRED
                    </span>

                    <h2>
                        Events we've brought to life.
                    </h2>

                </div>


                <div
                    class="events-grid"
                    id="previous-events"
                >
                    <!-- Event cards will be rendered here -->
                </div>

            </section>

        </section>
    `;
}