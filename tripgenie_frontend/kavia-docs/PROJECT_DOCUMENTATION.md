# TripGenie – Vistara: AI-Powered Travel Planner  
*Project Documentation — Kavia AI Style*

---

## 1. Problem Overview: What Does TripGenie Solve?

Modern travelers juggle destination research, itinerary planning, hotel booking, activity sequencing, and budget constraints. Existing solutions force users to manually sift through fragmented information, producing stress, missed opportunities, and generic recommendations.  

**TripGenie (marketed as Vistara)** directly solves:  
- Personalized, AI-generated day-by-day travel itineraries based on user interests, budget, and travel group.
- Automatic recommendations for attractions, hotels, and unique local experiences.
- No-code, visually structured trip planning—reducing manual research and cognitive overload.
- Seamless, shareable plans with export (PDF) and cross-device sync.

---

## 2. Technology Stack

- **Frontend:** React 18, Vite for ultra-fast development/reload, functional modern approach.
- **Styling:** Tailwind CSS with a fire- and travel-inspired theme; lightweight, custom-styled components.
- **State & Context:** React context (ThemeContext) for dark/light mode; custom hooks for trip, auth, and async data.
- **Data & Auth:** Firebase Firestore for cloud storage of user trips and authentication via Google OAuth.
- **AI Model:** Google Generative AI (Gemini) for tailored itinerary and hotel generation logic.  
- **API Integrations:** 
  - Google Places & Photos (dynamic attraction/hotel imagery, address resolution)
  - Geoapify for autocomplete destination input.
- **PDF Export:** jsPDF + autotable for instant downloadable itineraries.
- **Other:** Vite for build optimization, ESLint/Prettier for consistent code, Shadcn/UI for accessible primitives.

---

## 3. Implementation Details & Unique Logic

### a. Itinerary Generation and Trip Customization  
- **TripGenie uses a custom AI model (Gemini via @google/generative-ai) through the code in `src/services/AIModel.js`**  
  - It dynamically builds prompts based on user selections (destination, days, party size, budget) to request a full JSON-formatted itinerary from Gemini, including hotel recommendations and daily activity lists.
  - The flexibility of prompt-building allows extending destination support or adding custom constraints.
- **Trip creation logic:**
  - Managed in `src/pages/CreateTrip.jsx` (form logic decoupled via the `useForm` custom hook).
  - On submit, AI is queried, response is parsed, validated, and stored in Firebase under a unique trip ID.
  - All relevant validation, error handling, and user feedback is handled for edge cases (e.g., users can't plan trips longer than 10 days).
- **PDF Export:**
  - `TripPdf.jsx` and `useGeneratePDF.js` allow users to export the entire itinerary in a tabled PDF format, with headings for location, details, and cost—all handled via consistently styled modals and buttons.
- **Hotel & Activity Visualization:**
  - Google Places APIs and images fetched and rendered per-venue based on the response from Gemini.
  - Every trip can be visualized, browsed, shared, and independently customized.
- **Dark/Light Mode:**
  - `ThemeContextProvider.jsx` synchronizes dark mode across the entire UI, with one-click UI toggles and Tailwind-powered class changes at the HTML root.

### b. Usage of Custom Hooks  
- Modular hooks (e.g., `useMyTrip`, `useViewTrip`, `usePlacePhoto`) abstract async data fetching and state, keeping component logic concise and reusable.  
- All key hooks are Kavia AI-style documented, facilitating future extension.

### c. Routing and SPA Model  
- Client-side routing using `react-router-dom` for fast SPA navigation (landing page, create trip, my trips, view trip).
- Top-level providers (`main.jsx`) wrap the app in Google OAuth, theme context, and SPA routes, giving a clean boundary between global state, navigation, and rendering.

---

## 4. Project Structure & Architecture

```
tripgenie_frontend/
  src/
    components/        # Reusable UI elements: Navbar, Forms, Cards, PDF, Theming
    pages/             # Top-level user-facing screens (Landing/Hero, CreateTrip, MyTrips, ViewTrip)
    hooks/             # All custom state/data logic, including PDF generation and auth
    services/          # API connectors: Gemini AI, Firebase, Google Places
    context/           # Theme and potential future user contexts
    utils/             # Constants, pure utility code, mock data, static assets
    assets/            # Static images/branding
  kavia-docs/          # Documentation written and maintained by Kavia AI
  tailwind.config.js   # Fire-inspired color design, responsive settings
  package.json         # All dependency and build scripts
  vite.config.js       # Vite-specific config
```

**Architecture Diagram (mermaid):**  

```mermaid
graph TD
  User -- Web/App UI --> ReactApp[React SPA (Vite)]
  ReactApp --> ThemeContext
  ReactApp --> FirebaseDB[(Firebase Firestore)]
  ReactApp --> GoogleOAuth
  ReactApp --> AIModel[Gemini API]
  ReactApp --> GooglePlacesAPI
  ReactApp --> PDFExport[jsPDF+autotable]
  ThemeContext -- dark/light --> TailwindCSS
  FirebaseDB --sync/save--> UserTrips
  pages -- modular routes --> components
  components -- async --> hooks
  hooks -- data fetch / mutate --> services
```

---

## 5. Build, Deployment, and Readiness Notes

**Build**
- Dev server: `npm run dev`
- Full build: `npm run build`
- Lint: `npm run lint`

**Deployment:**
- Static build is ready for Vercel/Netlify or any static host.
- Includes `vercel.json` for route rewrites (SPA support).
- All envs (API keys, Firebase, Google OAuth) must be set or present in code (`firebase.js`, `AIModel.js`).

**Continuous Readiness:**
- Preconfigured ESLint and strict TypeScript options (see `eslint.config.js`, `tsconfig.json`).
- Code is well-commented in the Kavia AI style.
- All critical paths (trip creation, PDF export, live theming, API error handling) robustly tested.
- No server backend is required; entirely serverless, supporting rapid deployments.

---

## 6. Usage Guide: Getting Started as an End User

1. Visit the deployed TripGenie/Vistara app in your browser.
2. Sign in via Google (OAuth popup)—your profile and trips are secured via Firebase.
3. Choose "Create a Trip"
   - Enter your dream destination (Geoapify autocomplete helps with precision)
   - Pick trip duration, group size, and budget
   - Hit "Plan My Trip"
   - The AI instantly prepares a structured itinerary with hotel & activity suggestions.
4. View trip details, recommended hotels, and places to visit.
5. Export the itinerary as a downloadable PDF.
6. Explore your past trips (My Trips), each fully visualizable and shareable.

---

## 7. Notable Implementation Challenges & Solutions

- **AI Model Query Context:**  
  Handling prompt/response structure for appropriate day-wise detailed responses from Gemini required iterative refinement of prompt templates, with logic to validate returned JSON and fallback gracefully in UI on model errors.
- **Multi-stage API/Authentication Flow:**  
  Google OAuth and Google Places APIs, integrated with Firebase, involved resolving async loading, and synchronizing login state across providers. Custom hooks and Kavia-style context logic improved maintainability.
- **Dynamic Theming:**  
  Theme context (with full Tailwind root integration) ensures automatic propagation of dark/light mode at all UI levels.
- **Complex PDF Export:**  
  Dynamic user input (e.g. itinerary with varying days/places) is gracefully formatted thanks to the modular jsPDF/autotable approach.
- **SPA Routing and Session Persistence:**  
  User and trip session data persisted in localStorage and Firestore, allowing full reloads and device switching.

---

## 8. Kavia AI-Style Code Comments Reference

TripGenie follows Kavia AI documentation style in every file throughout the `/src` directory:
- **Comment structure:**  
  Every major file begins with a descriptive docblock including module purpose, main logic flow, and public interface, making on-boarding rapid for developers.
- **Throughout hooks, components, services:**  
  Code is accompanied by concise, explanatory comments for each function, indicating usage, inputs/outputs, implementation logic, and error handling.
- **Extensible, maintainable:**  
  The project is designed for quick handover, future feature expansion, and robust documentation through code.

---

## 9. Summary

TripGenie (Vistara) unifies modern AI, rich web tech, and elegant, maintainable engineering to automate and personalize the travel-planning journey. From its tightly-consistent code comments to resilient UX patterns, the project is built with clarity, speed, and user empowerment at its core.

---
