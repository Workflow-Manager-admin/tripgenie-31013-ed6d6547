/**
 * ============================================================================
 *  constants.js (TripMosaic Vistara) - Global UI/content constants for the app.
 *  This module centralizes all UI text, prompts, table structure, and enum constants
 *  used throughout the frontend. Update these for localization, future A/B tests, or
 *  if requirements change—keeping all user-facing text in one place.
 *
 *  Groups:
 *   - HERO: Landing/hero section content.
 *   - ABOUT_TEXT: About page summary/CTA.
 *   - TESTIMONIALS: Customer testimonials/quotes.
 *   - CREATE_TRIP: Form/flow field labels and error text.
 *   - SELECT_TRAVEL_LIST, SELECT_BUDGET_OPTIONS: Option lists for forms.
 *   - GENERATE_TRIP_PROMPT: Gemini AI prompt template.
 *   - PHOTO_REF_URL: Google Places media endpoint.
 *   - FOOTER_DESCRIPTION: Copyright/footer attribution.
 * ============================================================================a
 */

/** Content for the homepage hero/introduction section. */
export const HERO = {
  title: "Hi, I'm Vistara, your personal travel planner",
  titleDescription:
    "Get tailor-made travel plans that align with your preferences, interests, and budget. Discover destinations and experiences curated just for you.",
  buttonLable: "Start Planning Your Trip for Free",
};

/** Content for the app About/Info/CTA section. */
export const ABOUT_TEXT = {
  title: "Smarter planning. Better travel. Powered by AI.",
  buttonLable: "Plan a New Trip",
  description:
    "Meet Vistara, your intelligent travel companion. Whether you're looking for must-see attractions, the perfect accommodations, flights, or road trips—Vistara simplifies your journey from idea to itinerary. Say goodbye to tab overload and disorganized travel tools. Just share your preferences and let Vistara create personalized travel experiences, complete with expert suggestions and curated content. Your next unforgettable trip starts here.",
};

/** Testimonials: strings for display on Testimonials page. */
export const TESTIMONIALS = {
  title: "What Travelers Are Saying About Vistara",
  review1:
    "Vistara made planning my vacation so simple! The itinerary matched my style perfectly, and the recommendations were incredibly thoughtful.",
  review2:
    "This is hands-down the best trip planner I've used. Vistara delivered a detailed, personalized plan and the visuals made it exciting to explore!",
  review3:
    "Exceptional travel assistant! Vistara took the stress out of planning and replaced it with joy. The itineraries were accurate and engaging.",
  review4:
    "A total game-changer! Vistara's plans were insightful, well-organized, and beautifully presented. I felt like I had a personal travel expert.",
  review5:
    "Planning a holiday has never been this easy. Vistara created a seamless itinerary and inspired me with stunning destination ideas and videos!",
};

/** Labels and error messages for CreateTrip form/flow. */
export const CREATE_TRIP = {
  title: "Ready for your next great escape? 🌅✈️",
  titleDescription:
    "Tell us about your dream destination, and we’ll plan the perfect trip just for you.",
  destinantionLabel: "What's your destination of choice?",
  timeLineLabel: "Select Your Travel Timeline",
  noOfPeopleLabel: "Who's joining you on this trip?",
  budgetLabel: "What’s your travel budget?",
  signInLabel: "Sign in with Google",
  signInDescription: "Securely sign in using your Google account",
  noOfDaysError: "Please plan a trip with less than 10 days.",
  fillAllTheDeatilsError: "Kindly complete all the required fields.",
  noOfDays: "{noOfDays}",
  noOfPeople: "{noOfPeople}",
  budget: "{budget}",
};

/**
 * Option list for selector buttons in trip creation:
 * "Who is travelling?" - maps to forms radio/buttons.
 */
export const SELECT_TRAVEL_LIST = [
  {
    id: 1,
    title: "Just Me",
    desc: "Solo adventure, self-discovery",
    icon: "✈",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "A romantic journey for two",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "Making memories with your loved ones",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Thrilling adventures with your crew",
    icon: "👯‍♂️",
    people: "More than 5 People",
  },
];

/** Option list for "budget" field in the trip planner flow. */
export const SELECT_BUDGET_OPTIONS = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Value-focused travel options",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balance between cost and comfort",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium experiences with no compromise",
    icon: "💸",
  },
];

/**
 * Prompt template for AI itinerary generation (Gemini API).
 *  Replace braces {} with values using .replace before calling the API.
 */
export const GENERATE_TRIP_PROMPT =
  "Generate a travel plan for location: {location}, for {noOfDays} days for {noOfPeople} with a {budget} budget. Provide a hotel list including hotel name, address, price, image URL, geo-coordinates, rating, and descriptions. Also, suggest a detailed itinerary including place name, place details, image URL, geo-coordinates, ticket pricing, and travel time. Format the result in JSON with an array structure, with day-by-day plans and optimal visiting times.";

/**
 * Google Places API URL template for image/photo fetching.
 * Replace {NAME} with the photo reference key from API results.
 */
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key=AIzaSyCYJiw6Cf4JEQ_ybTzw9iXwBZOtKIKYl3s";

/** Copyright/footer note (shows at site bottom) */
export const FOOTER_DESCRIPTION = "© 2025 All rights reserved by Vistara";
