# AURESTA — System Architecture

## 1. Project Overview

Auresta is an event discovery, planning, booking, and management platform designed to simplify the process of organising events.

The platform allows users to explore event categories, discover vendors, compare vendor information, view packages, create customised packages, calculate costs, make bookings, manage event information, and access support.

Auresta provides three main views:

- User View
- Vendor View
- Admin View

The current system combines a browser-based frontend, JavaScript application logic, client-side state management, browser storage, and a Node.js/Express backend for authentication and AI-support functionality.

---

## 2. Business Problem

Planning an event often requires users to search for multiple vendors separately, compare prices and ratings, check availability, select suitable services, and coordinate bookings.

This can make event planning time-consuming and difficult to manage.

Auresta addresses this problem by bringing major event-planning activities into a single platform.

The system allows users to:

- Select an event type.
- Enter event requirements.
- Explore vendors.
- Filter and sort vendors.
- View vendor profiles.
- Check vendor availability.
- Explore packages and deals.
- Build customised packages.
- Calculate package costs.
- Proceed to checkout.
- Complete a booking flow.
- View booking information.
- Use Chat Support.

The platform also provides Vendor and Admin views for vendor-related management activities.

---

## 3. Target Users

### 3.1 User

The User is the main customer of the platform.

Users can:

- Explore event categories.
- Search for vendors.
- Filter vendors.
- Sort vendors.
- View vendor details.
- Check availability.
- Explore packages.
- Build custom packages.
- Calculate package costs.
- Book vendors or packages.
- View booking information.
- Manage event information.
- Save favourites.
- Contact Chat Support.

### 3.2 Vendor

The Vendor provides event-related services through Auresta.

Vendor functionality includes:

- Vendor Portal access.
- Vendor profile management.
- Vendor service information.
- Vendor package information.
- Availability information.
- Vendor verification submission.
- Public profile preview.

### 3.3 Admin

The Admin manages selected platform-level activities.

Admin functionality includes:

- Admin Portal.
- Verification Desk.
- Vendor verification review.
- Vendor verification approval.

---

## 4. Main Auresta Features

### User Features

The current User View contains:

- Home
- Explore Vendors
- Packages & Deals
- Build Package
- Need It Now
- My Event
- Chat Support
- Vendor Details
- Vendor Availability Calendar
- Favourites
- Booking and Checkout
- Booking Confirmation

### Vendor Features

The Vendor View contains:

- Vendor Portal
- Vendor Profile Management
- Public Profile Preview
- Vendor Verification Submission
- Vendor Packages
- Vendor Availability

### Admin Features

The Admin View contains:

- Admin Portal
- Verification Desk
- Vendor Verification Review
- Vendor Verification Approval

### Authentication Features

The backend authentication implementation includes:

- Signup
- Login
- Google Authentication
- JWT Authentication
- Protected User Information
- Password Hashing
- Request Validation
- Authentication Rate Limiting

---

## 5. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Structure | HTML5 | Main application structure |
| Styling | CSS3 | Layout, styling and responsive design |
| Application Logic | JavaScript | UI rendering and business logic |
| Data Layer | JavaScript | Vendors, packages, categories and initial application data |
| State Management | Custom JavaScript StateStore | Central application state |
| Browser Storage | localStorage | Client-side state persistence |
| Backend Runtime | Node.js | Server-side execution |
| Backend Framework | Express.js | API and server routing |
| Database | PostgreSQL | Persistent user/account data |
| Authentication | JWT | Authenticated API access |
| Password Security | bcryptjs | Password hashing |
| Google Authentication | Google Auth Library | Google ID-token verification |
| Validation | express-validator | Request validation |
| Rate Limiting | express-rate-limit | Authentication endpoint protection |
| Security | Helmet | HTTP security headers |
| Backend Configuration | Render | Backend deployment configuration |
| Frontend Hosting | GitHub Pages | Frontend hosting |

---

## 6. High-Level Architecture

```text
                         AURESTA PLATFORM
                                |
             +------------------+------------------+
             |                  |                  |
             v                  v                  v
          USER VIEW         VENDOR VIEW        ADMIN VIEW
             |                  |                  |
             +------------------+------------------+
                                |
                                v
                       Auresta Frontend
                                |
             +------------------+------------------+
             |                  |                  |
             v                  v                  v
         index.html         styles.css         JavaScript
                                                   |
                                      +------------+------------+
                                      |            |            |
                                      v            v            v
                                  data.js      state.js      app.js
                                      |            |            |
                                      +------------+------------+
                                                   |
                                                   v
                                            Business Logic
                                                   |
                       +---------------------------+--------------------+
                       |                           |                    |
                       v                           v                    v
                 Vendor Logic               Package Logic        Booking Logic
                       |                           |                    |
                       +---------------------------+--------------------+
                                                   |
                                                   v
                                            Application State
                                                   |
                              +--------------------+-------------------+
                              |                                        |
                              v                                        v
                         localStorage                            Backend APIs
                                                                      |
                                           +--------------------------+---------+
                                           |                                    |
                                           v                                    v
                                   Authentication API                    AI Support API
                                           |                                    |
                                           v                                    v
                                      PostgreSQL                       Auresta AI Agent
```

---

## 7. Frontend Architecture

The Auresta frontend is organised around HTML, CSS and JavaScript modules.

### 7.1 `index.html`

`index.html` is the main entry point of the Auresta application.

It loads:

- Google Fonts
- Lucide icons
- Canvas Confetti
- `css/styles.css`
- `js/data.js`
- `js/state.js`
- `js/app.js`

The page title is:

```text
AURESTA - Where Moments Turn Golden
```

### 7.2 `css/styles.css`

The stylesheet controls the visual presentation of the application.

It includes styling for:

- Navigation
- Layouts
- Buttons
- Forms
- Cards
- Vendor sections
- Package sections
- Dashboards
- Modals
- Responsive layouts
- Visual effects

### 7.3 `js/data.js`

`data.js` contains the main frontend application data.

It includes:

- Event categories
- Service categories
- Vendors
- Vendor ratings
- Vendor review counts
- Vendor pricing
- Vendor locations
- Vendor availability
- Vendor packages
- Initial events
- Initial bookings
- Gallery data
- Predefined packages

### 7.4 `js/state.js`

`state.js` implements the central `StateStore`.

The application state contains information such as:

- Current role
- Current view
- Search parameters
- Package filters
- Selected booking date
- Authentication state
- Favourites
- Events
- Bookings
- Support tickets
- Vendor messages
- Custom package
- Checkout information
- Vendor profile information
- Vendor verification information

The state is persisted in browser storage using `localStorage`.

### 7.5 `js/app.js`

`app.js` contains the main application rendering and interaction logic.

It handles:

- Application rendering
- Navigation
- Role-based views
- Vendor filtering
- Vendor sorting
- Vendor profiles
- Package selection
- Package calculation
- Booking workflow
- Checkout
- Booking confirmation
- Support interaction
- Vendor verification interfaces

---

## 8. Role-Based Architecture

Auresta separates the main application experience according to the user's role.

```text
                         Auresta
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
           User           Vendor         Admin
             |              |              |
             v              v              v
         User View      Vendor Portal   Admin Portal
             |              |              |
             v              v              v
       Booking/Event    Profile and     Verification
       Management       Availability    Management
```

### User View

The User navigation contains:

- Home
- Explore Vendors
- Packages & Deals
- Build Package
- Need It Now
- My Event
- Chat Support

### Vendor View

The Vendor navigation contains:

- Vendor Portal
- Preview Public Profile

### Admin View

The Admin navigation contains:

- Admin Portal
- Verification Desk

---

## 9. User Workflow

The main Auresta user workflow is:

```text
User Opens Auresta
        |
        v
Enter Event Requirements
        |
        +--> Event Type
        +--> Location
        +--> Date
        +--> Guests
        +--> Budget
        |
        v
Explore Vendors / Packages
        |
        +--> Filter Vendors
        +--> Sort Vendors
        +--> View Vendor
        +--> Select Package
        +--> Build Custom Package
        |
        v
Booking / Checkout
        |
        v
Continue as Guest OR Login/Signup
        |
        v
Select Booking Details
        |
        v
Select Payment Method
        |
        v
Confirm Booking
        |
        v
Booking Confirmation
        |
        v
My Event
```

---

## 10. Guest Booking and Authentication Design Decision

Auresta contains authentication and signup/login functionality, but login is not made mandatory before a user can proceed through the core booking flow.

This is an intentional design decision.

The backend is hosted/configured through Render, and a backend service can experience a startup or wake-up delay. Depending on the server condition and the user's internet connection, the backend may take approximately 20 seconds to several minutes to become responsive.

If login were mandatory at the beginning of the user journey, users could be blocked from the main Auresta experience while waiting for the authentication service.

Therefore, Auresta follows a guest-friendly approach.

```text
Browse Auresta
      |
      v
Explore Vendors / Packages
      |
      v
Select Booking
      |
      +--------------------+
      |                    |
      v                    v
Continue as Guest       Login / Signup
      |                    |
      +---------+----------+
                |
                v
          Continue Booking
                |
                v
             Checkout
```

This design keeps the core booking journey accessible while authentication remains available to users who want to use an authenticated account.

---

## 11. Vendor Filtering and Ranking Algorithm

### 11.1 Problem

Auresta contains multiple vendors across different service categories.

Displaying all vendors without processing the available information can make vendor selection difficult.

Auresta therefore applies filtering and sorting logic to reduce the available options according to the user's requirements.

### 11.2 Inputs

The vendor processing logic uses:

- Vendor dataset
- Selected service categories
- Verified-only preference
- Urgent availability requirement
- Vendor price
- Vendor rating
- Vendor availability
- Selected sorting preference

### 11.3 Processing

```text
Load Vendor Dataset
        |
        v
Apply Category Filter
        |
        v
Apply Verified-Only Filter
        |
        v
Apply Urgent Availability Filter
        |
        v
Apply Sorting Rule
        |
        +--> Lowest Price
        +--> Highest Price
        +--> Highest Rating
        +--> Fast/Urgent Availability
        |
        v
Filtered and Ranked Vendor List
```

### 11.4 Example

Input:

```text
Category = Decoration
Verified Only = Yes
Urgent = Yes
Sort = Highest Rating
```

Output:

```text
Only verified decoration vendors
with urgent availability are displayed,
ordered by rating.
```

### 11.5 Code Location

The main implementation is located in:

```text
js/app.js
```

The main function is:

```text
filterVendors()
```

---

## 12. Package and Budget Processing

Auresta allows users to select predefined packages or create a customised package.

The system calculates the total amount based on the selected services/vendors.

The deposit is calculated as:

```text
Deposit = Total Amount × 20%
```

The remaining balance is:

```text
Balance = Total Amount - Deposit
```

For example:

```text
Total = ₹10,000

Deposit = ₹10,000 × 20%
        = ₹2,000

Balance = ₹10,000 - ₹2,000
        = ₹8,000
```

The checkout interface also displays:

- Base service price
- Platform protection fee
- Savings/discount information
- Total amount
- Deposit
- Balance

The current interface displays a protection fee and corresponding savings adjustment that offset each other, so the displayed final total remains unchanged.

---

## 13. Booking Processing

The Auresta booking process is implemented through the application state and frontend business logic.

```text
Select Vendor / Package
        |
        v
Select Booking Date
        |
        v
Review Booking
        |
        v
Select Payment Method
        |
        +--> UPI
        +--> Card
        +--> Net Banking
        |
        v
Confirm Payment
        |
        v
Create Booking Record
        |
        v
Update Application State
        |
        v
Update Event Information
        |
        v
Update Vendor Booked Dates
        |
        v
Display Booking Confirmation
```

The booking record contains information such as:

- Booking ID
- Vendor
- Event
- Booking date
- Package
- Booking status
- Total amount
- Deposit paid
- Balance due
- Payment method

The current payment flow is a simulated checkout/payment confirmation process. It is not connected to an external payment gateway.

---

## 14. Support and AI Architecture

Auresta contains a Chat Support interface.

The frontend communicates with the backend AI endpoint:

```text
POST /api/ai/chat
```

The flow is:

```text
User
 |
 v
Chat Support Interface
 |
 v
Frontend API Request
 |
 v
/api/ai/chat
 |
 v
AI Controller
 |
 v
Auresta AI Agent
 |
 v
Ollama / Llama Model
 |
 v
AI Response
 |
 v
Chat Support Interface
```

The relevant backend files are:

```text
backend/routes/aiRoutes.js
backend/controllers/aiController.js
backend/ai-agent/agent.js
```

The current AI agent connects to a local Ollama service using the configured Llama model.

Therefore, the AI-support functionality is implemented in the project code, but it should not be described as a fully deployed cloud AI service.

---

## 15. Authentication Architecture

Auresta contains backend authentication functionality.

### Signup

```text
User Signup
    |
    v
Request Validation
    |
    v
Password Hashing
    |
    v
Create User
    |
    v
PostgreSQL
```

### Login

```text
User Login
    |
    v
Validate Request
    |
    v
Find User
    |
    v
Compare Password
    |
    v
Generate JWT
    |
    v
Authenticated User
```

### Google Authentication

Auresta also supports Google authentication through Google ID-token verification.

### Protected User Endpoint

The backend provides:

```text
GET /api/auth/me
```

This endpoint requires authentication.

### Relevant Files

```text
backend/routes/authRoutes.js
backend/controllers/authController.js
backend/middleware/authMiddleware.js
backend/middleware/rateLimiters.js
```

---

## 16. Database Architecture

Auresta uses PostgreSQL for persistent user/account information.

The current verified database schema contains a `users` table.

### Users Entity

The `users` table includes:

- `id`
- `name`
- `email`
- `password_hash`
- `google_id`
- `avatar_url`
- `role`
- `created_at`
- `updated_at`

The user identifier uses UUID.

The supported roles are:

```text
consumer
vendor
admin
```

Indexes are provided for important account lookup fields such as email and Google ID.

The database implementation is located in:

```text
backend/config/db.js
backend/config/schema.sql
backend/config/migrate.js
```

### Current-State Note

The current verified PostgreSQL schema does not yet demonstrate the complete six-entity database structure described in the CIA-III minimum requirements.

Therefore, the current implementation should be documented honestly as having PostgreSQL persistence for user/account information, while several other application data structures are currently managed through frontend application data, state and browser storage.

---

## 17. Current Data Flow

The current Auresta data flow is:

```text
User Interaction
       |
       v
Auresta UI
       |
       v
JavaScript Event Handler
       |
       v
Application State
       |
       +--------------------+
       |                    |
       v                    v
Business Logic          Data Layer
       |                    |
       +----------+---------+
                  |
                  v
        Processed Business Result
                  |
                  v
             Updated UI
                  |
                  v
              localStorage
```

For authentication:

```text
Frontend
   |
   v
Express API
   |
   v
Authentication Controller
   |
   v
PostgreSQL
   |
   v
JWT / User Response
   |
   v
Frontend
```

---

## 18. Current Deployment Architecture

The Auresta frontend is hosted through GitHub Pages.

The repository also contains Render deployment configuration for the Node.js backend.

```text
                    GitHub Repository
                           |
             +-------------+-------------+
             |                           |
             v                           v
       GitHub Pages                  Render Config
             |                           |
             v                           v
       Auresta Frontend             Node.js Backend
                                         |
                                         v
                                    PostgreSQL
```

The Render configuration is stored in:

```text
render.yaml
```

It contains configuration for:

- Node runtime
- Backend start command
- Production environment
- PostgreSQL connection
- JWT configuration
- CORS configuration
- Google authentication configuration

The presence of `render.yaml` represents backend deployment configuration and should not by itself be treated as proof that the backend is continuously running in production.

---

## 19. Security Architecture

Auresta includes multiple security mechanisms.

### Password Security

Passwords are hashed using bcrypt rather than stored directly.

### JWT Authentication

JWT is used for authenticated API access.

### Protected Routes

Authentication middleware verifies the Bearer token before protected requests are processed.

### Request Validation

`express-validator` is used to validate authentication requests.

### Rate Limiting

Authentication endpoints use rate limiting to reduce repeated login/signup attempts.

### HTTP Security

Helmet is included in the Express backend for security-related HTTP headers.

### CORS

CORS configuration controls frontend/backend communication.

The security-related implementation uses:

```text
bcryptjs
jsonwebtoken
express-validator
express-rate-limit
helmet
cors
```

---

## 20. Proposed Scalable Architecture

If Auresta grows significantly beyond its current implementation, the architecture can be expanded into a cloud-based scalable system.

```text
                         Users
                           |
                           v
                    CDN / Edge Layer
                           |
                           v
                    Load Balancer
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
      App Server       App Server       App Server
          |                |                |
          +----------------+----------------+
                           |
                           v
                    Application Services
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
    Authentication     Booking Service   Vendor Service
          |                |                |
          +----------------+----------------+
                           |
              +------------+------------+
              |                         |
              v                         v
       PostgreSQL Cluster          Redis Cache
              |
              v
       Read Replicas / Backup
              |
              v
        Object Storage
```

A scalable implementation could use cloud services for:

- Load balancing
- Application hosting
- Managed PostgreSQL
- Object storage
- CDN
- Caching
- Monitoring
- Backup
- Security

---

## 21. Scaling to 1 Million Users

At 1 million registered users, the current single-instance style architecture would need to be expanded.

### Application Scaling

Multiple backend instances should run behind a load balancer.

### Database Scaling

The database layer can use:

- Connection pooling
- Read replicas
- Query optimisation
- Indexing
- Database monitoring

### Storage Scaling

Vendor images, portfolios and other large files should be stored using scalable object storage.

### Network Scaling

A CDN can serve static content and media closer to users.

### Traffic Management

A load balancer can distribute incoming requests across multiple application instances.

### Caching

Frequently accessed information such as vendor listings, categories and packages can be cached.

### Security

The system should include:

- HTTPS
- Authentication controls
- Rate limiting
- Secure secrets management
- Database access controls
- Monitoring

### Monitoring

The system should monitor:

- API response time
- Error rate
- CPU usage
- Memory usage
- Database performance
- Request volume
- Authentication failures

---

## 22. Scaling to 5 Million Users

At 5 million users, Auresta would require stronger horizontal scaling and data-management strategies.

### Application Layer

Multiple application instances should be deployed across availability zones or equivalent infrastructure.

### Load Balancing

A load balancer distributes traffic between application instances.

### Database Layer

The database architecture should support:

- Primary database
- Read replicas
- Connection pooling
- Indexing
- Query optimisation
- Partitioning where appropriate

### Caching

Redis or an equivalent caching layer can reduce repeated database queries.

### Storage

Large files should use scalable object storage.

### Network

A CDN should distribute static content and media efficiently.

### Traffic Management

Autoscaling can add or remove application instances according to traffic.

### Security

The architecture should include:

- HTTPS
- Web application firewall
- Rate limiting
- Identity and access management
- Secure secret management
- Database security

### Monitoring and Operations

A production-scale platform should use:

- Centralised logging
- Monitoring
- Alerts
- Database backups
- Recovery procedures

---

## 23. Quantitative Scalability Model

For scalability planning, the following assumptions are used:

```text
Initial users = 10,000
Annual growth = 25%
Peak simultaneous activity = 10%
```

The expected user growth is calculated as:

```text
Future Users = Current Users × 1.25
```

### User Growth

| Year | Expected Users |
|---|---:|
| Initial | 10,000 |
| Year 1 | 12,500 |
| Year 2 | 15,625 |
| Year 3 | 19,531 |
| Year 4 | 24,414 |
| Year 5 | 30,518 |

For larger-scale scenarios:

| Registered Users | 10% Peak Active Users |
|---:|---:|
| 100,000 | 10,000 |
| 500,000 | 50,000 |
| 1,000,000 | 100,000 |
| 5,000,000 | 500,000 |

If a planning assumption of 5 requests per minute per active user is used:

```text
Requests per second =
Active Users × 5 / 60
```

Therefore:

| Registered Users | Peak Active Users | Approx. Requests/Second |
|---:|---:|---:|
| 100,000 | 10,000 | 833 |
| 500,000 | 50,000 | 4,167 |
| 1,000,000 | 100,000 | 8,333 |
| 5,000,000 | 500,000 | 41,667 |

These values are planning assumptions for scalability analysis and are not measured production traffic.
