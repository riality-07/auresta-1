# PLAN — AURESTA Two-Level Header Redesign

> **Status:** READY FOR APPROVAL — awaiting your voice-note acknowledgment before any code changes.
>
> **Plan date:** 2026-09-13 · **Goal:** Rebuild only the global header into a two-level composition matching the visual reference. No existing functionality may change.

---

## Overview

The current header crams every control (logo, consumer nav-links, role switcher, auth chip) into a single 76px row. The reference requires a calm, spacious, premium header with **two clearly separated levels**: the brand centered on top, all navigation in its own row underneath.

## Background / Inspection Findings

- The live header is `renderNavbar()` in **`js/app.js:47–129`** — one sticky `.navbar`, 76px, single row.
- `index.html` loads **only**: `js/data.js`, `js/state.js`, `js/services/api.js`, `js/auth.js`, `js/app.js` + `css/styles.css`.

> ⚠️ **Warning (wrong-base trap):** `frontend/` (a full duplicate tree), `js/components/*.js`, `css/components.css` and `css/responsive.css` are **NOT loaded** by index.html. They are dead files. The review base is the **root `js/` + `css/styles.css`**.

- There is **no separate sub-page navbar, and no email-verification page exists** in the code. One global header renders on every view, including login/signup.
- The tagline must be **derived from data, not the prompt**: `window.CELEBRATION_DATA.tagline` = **"Where Moments Turn Golden"** (`js/data.js:5`). Fallback: the same string.
- Profile placeholder: there is no placeholder field in the data. When logged in → circular avatar initial derived from `auth.user.name` + name + chevron. When logged out → the existing **Log In / Sign Up** buttons (functional, preserved).

## Current Header — Feature Inventory (everything preserved)

| Feature | Current location (app.js) | Handler | New location |
|---|---|---|---|
| Logo → Home | `.logo` | `navigateTo('home')` | Brand bar, centered |
| Home | `.nav-link` | `navigateTo('home')` | Level-2 navigation |
| Explore Vendors | `.nav-link` | `navigateTo('explore')` | Level-2 navigation |
| Packages & Deals | `.nav-link` | `navigateTo('packages')` | Level-2 navigation |
| Build Package | `.nav-link` | `navigateTo('builder')` | Level-2 navigation |
| NEED IT NOW | `.nav-link` + `.badge-urgent` | `navigateTo('urgency')` | Level-2, compact CTA |
| My Event | `.nav-link` | `navigateTo('my_event')` | Level-2 navigation |
| Chat Support | `.nav-link` | `navigateTo('support')` | Level-2 navigation |
| Vendor Portal | `.nav-link` (vendor role) | (static) | Level-2 (vendor role) |
| Preview Public Profile | `.nav-link` (vendor role) | `openVendorPreviewModal()` | Level-2 (vendor role) |
| Admin Portal | `.nav-link` (admin role) | (static) | Level-2 (admin role) |
| Verification Desk | `.nav-link` (admin role) | (static) | Level-2 (admin role) |
| Role switcher (3 roles) | `.role-switcher` + 3 `.role-btn` | `switchRole('consumer'/'vendor'/'admin')` | Level-2, compact dropdown |
| Profile + Logout | `.navbar-user-chip` (👤 name + Log Out) | `logoutUser()` | Brand bar top-right: avatar + name + chevron dropdown |
| Log In / Sign Up | auth block | `openAuthPage('login'/'signup')` | Brand bar top-right (logged-out) |
| Mobile hamburger | `.nav-toggle` ↔ `.nav-right.nav-open` | `toggleMobileNav()` / `closeMobileNav()` | Hamburger in brand bar; level-2 becomes drawer |

## Target Structure (Two Levels)

### Level 1 — Brand Bar (`.brand-bar`)

- Height ~130px desktop. Background: warm white / cream (uses `--bg-main`), 1px subtle bottom separator (`--border-color`). No heavy shadow.
- **AURESTA** wordmark, perfectly centered, elegant serif (`--font-heading` = Cormorant Garamond), ~48–56px, slightly expanded letter-spacing, moderate weight. The existing crown accent is kept but refined.
- **Tagline** directly beneath, DERIVED from `CELEBRATION_DATA.tagline`: **"WHERE MOMENTS TURN GOLDEN"** — uppercase, ~10–11px, high letter-spacing, centered.
- **Profile** top-right (margin ~40–56px): minimal trigger — circular avatar with initial (from `auth.user.name`), name, chevron. Click opens dropdown containing **Log Out** (`logoutUser()`). Logged-out: Log In / Sign Up (functional).
- Mobile: hamburger on the left (before profile); brand stays centered.

### Level 2 — Navigation Bar (`.main-nav`)

- Height ~74px. Background: white (`#FFFFFF`). No top border, 1px subtle bottom separator. No shadow.
- Single horizontal row, centered, max content width ~1440px.
- Consumer items (icons 18–20px, icon–text gap 8–10px, text 15–16px, weight 500, dark warm neutral): **Home · Explore Vendors · Packages & Deals · Build Package · My Event · Chat Support**.
- Vendor role: **Vendor Portal · Preview Public Profile** (role-specific, as today). Admin role: **Admin Portal · Verification Desk** (role-specific, as today).
- **Active page:** dark text + elegant thin gold underline (1–2px hairline `--primary-gold`). Hover: subtle color/opacity transition (150–250ms).
- **NEED IT NOW CTA:** toward the right, compact (~42px tall), moderately rounded (not an oversized capsule), 16–20px horizontal padding, weight 600, background `--primary-gold`, dark text, existing ⚡ icon kept. `onclick` stays `navigateTo('urgency')`.
- **Role dropdown (compact):** to the right — "User View ▾" style control, ~40px, 1px subtle warm-neutral border, transparent background, moderately rounded. Dropdown lists all three roles; each selection calls `switchRole(...)` (functionally identical to today's 3 buttons).

## Responsive Behavior

- **Desktop 1366 / 1440 / 1536 / 1920:** both levels stay balanced and spacious; content max 1440px.
- **Tablet (≤860px):** brand bar and nav bar keep the two-level hierarchy; spacing/nav gaps scale down; hamburger appears.
- **Mobile:** navigation becomes one clean drawer (no squeeze). Brand stays centered, profile accessible, CTA accessible without dominating. All routes and handlers remain identical (`closeMobileNav` + Escape-close preserved).

## Files to Change (only these)

| # | File | Change |
|---|---|---|
| 1 | `js/app.js` | Only `renderNavbar()` (47–129) + class-name references in `toggleMobileNav` / `closeMobileNav` / `bindEvents`. No logic, route, or auth change. |
| 2 | `css/styles.css` | Add brand-bar / main-nav / role-dropdown / profile-trigger / mobile-drawer styles, adapt old navbar rules, update both `@media (max-width:860px)` blocks to the new class names. |

> **Out of scope:** backend, `api.js`, `data.js`, `state.js`, `auth.js` logic, page views, footer, modals, `frontend/`, README, config, git (no commit/push).

## Implementation Steps (after approval, done in one pass)

1. Rewrite `renderNavbar()` into two levels, keeping every existing `onclick` handler and role condition.
2. Add new header CSS in `styles.css` (under the existing navbar section) and adapt the old navbar rules; keep both mobile media-query blocks in sync.
3. Update mobile helpers to the new class names.
4. Keep the same `?v=20260911_redesign1` stamp or bump it to `…_redesign2` so browsers fetch the new CSS.

## Test Plan (after implementation)

- Each nav item clicks and renders the correct view (home, explore, packages, builder, my_event, support).
- NEED IT NOW → `urgency` view.
- Role switch via dropdown: consumer / vendor / admin — all three behave identically.
- Profile dropdown when logged in: avatar initial, name, Log Out (`logoutUser()`).
- Logged out: Log In / Sign Up buttons show and `openAuthPage` works (auth view, same global header).
- Mobile drawer opens/closes; Escape and outside-click close it; no console errors.
- Tagline displays "Where Moments Turn Golden" (derived, not hardcoded).
- Desktop 1366 and 1920 visually reviewed (brand dominant, two levels, active page unmistakable).

## Reviewer Role (mandatory)

- **Reviewer checks the change against the correct base** before sign-off: root `js/app.js` and `css/styles.css` only — never `frontend/` or `js/components/`.
- Reviewer verifies **none** of the non-negotiable rules are violated: no removed functionality, no broken routes/logic/auth/role-switch/logout, no backend/API/DB change, no duplicate nav systems, no mock visuals, no excessive gradients/glassmorphism/neon, no text wrapping, no git commits.

## Acceptance Criteria

- AURESTA dominates and sits centered above the navigation.
- Navigation is clearly separated (own row) below the brand.
- Active page is unmistakable (thin gold underline).
- NEED IT NOW is a compact CTA, not dominant.
- Profile is clean and unobtrusive, top-right.
- User View is accessible but visually secondary.
- Header feels premium/editorial, not dashboard-like; generous whitespace.
- No existing functionality is lost.