/* =========================================================
   AURESTA — FOOTER COMPONENT
   ========================================================= */

function renderFooter(state = {}) {
    return `
        <footer class="footer">

            <div class="footer-container">

                <div class="footer-brand">

                    <div class="footer-logo">
                        <span>✦</span>
                        <span>AURESTA</span>
                    </div>

                    <p>
                        Where Moments Turn Golden.
                    </p>

                    <p>
                        Your all-in-one platform for
                        planning, discovering and celebrating events.
                    </p>

                </div>


                <div class="footer-column">

                    <h4>Explore</h4>

                    <a href="#" data-page="home">
                        Home
                    </a>

                    <a href="#" data-page="explore">
                        Explore Vendors
                    </a>

                    <a href="#" data-page="packages">
                        Packages & Deals
                    </a>

                </div>


                <div class="footer-column">

                    <h4>Support</h4>

                    <a href="#" data-page="bookings">
                        My Bookings
                    </a>

                    <a href="#" data-page="support">
                        Help Centre
                    </a>

                    <a href="#" data-action="contact">
                        Contact Us
                    </a>

                </div>


                <div class="footer-column">

                    <h4>Auresta</h4>

                    <a href="#">
                        About Us
                    </a>

                    <a href="#">
                        Become a Vendor
                    </a>

                    <a href="#">
                        Terms & Conditions
                    </a>

                    <a href="#">
                        Privacy Policy
                    </a>

                </div>

            </div>


            <div class="footer-bottom">

                <p>
                    © ${new Date().getFullYear()} Auresta.
                    All rights reserved.
                </p>

                <p>
                    Where Moments Turn Golden.
                </p>

            </div>

        </footer>
    `;
}