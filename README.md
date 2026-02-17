
# News App

Test task implementation with shared architecture:

The main client is implemented on Next.js, and the mobile application acts as a wrapper over the web application.  
Business logic is unified and reused across platforms, reducing duplication and simplifying support.

---

## Architecture

Single source of truth:

shared logic → web client (Next.js) → mobile wrapper (React Native)

The project separates domain logic from UI.  
Fetching, pagination, search, filters, favorites and storage logic live in `/src` and are reused by both platforms.

### Why this approach

Traditional approach:
- separate React Native app
- separate Web app
- duplicated API logic
- duplicated state handling
- inconsistent behavior

Current approach:
- one business logic layer
- identical behavior on web and mobile
- faster feature development
- simpler maintenance

---

## Tech Stack

### Shared logic
- TypeScript
- Feature based structure
- Platform independent hooks and services

### Web
- Next.js (App Router)
- Server routes as API proxy
- Responsive UI
- SEO friendly pages

### Mobile
- React Native (Expo)
- Web wrapper over main client
- Native integrations (storage, biometrics, notifications)

---

## Features

### News feed
- Pagination
- Search
- Category filtering
- Sorting
- Pull to refresh
- Infinite scroll

### Article page
- Detailed article view
- External link open
- Back navigation

### Favorites
- Add/remove favorite
- Persistent storage
- Shared state between platforms

### UX states
- Skeleton loading
- Empty state
- Error state with retry

---

## Project Structure

src/
- entities — types
- features — business logic
- shared — api and storage

web/
- Next.js application (main client)

mobile/
- React Native wrapper

---

## Run

Install dependencies:

npm install

Run web:

cd web/news-app-web
npm run dev

Run mobile:

cd mobile
npm start
