# YouTube Video Listing UI

A React.js frontend project that builds a clean, YouTube-style video browsing interface using the public Videos API from FreeAPI.

The app fetches video data from an external endpoint and displays it as responsive video cards with thumbnail, title, channel name, views, publish time, and duration.

## Live Purpose

This project is designed as a frontend practice/demo app focused on:

- API data fetching in React
- state handling for loading/error/success views
- clean card-based UI layout
- responsive design behavior

## API Used

- Endpoint: `https://api.freeapi.app/api/v1/public/youtube/videos`
- Method: `GET`
- Data source: public YouTube-style video feed from FreeAPI

## Features Implemented

- Fetches video list from API on initial page load
- Handles loading and error states gracefully
- Parses nested API response structure into card-friendly fields
- Displays:
  - video thumbnail
  - video duration badge
  - video title
  - channel name
  - formatted view count
  - relative publish time
- Responsive grid layout for desktop and mobile
- Hover interaction for improved card discoverability

## Tech Stack

- React.js
- Vite
- CSS (custom styling, no UI framework)
- ESLint

## Project Structure

```text
src/
  App.jsx       # API fetch + data mapping + UI rendering
  App.css       # Component-level styles for layout and cards
  index.css     # Global app styles
  main.jsx      # React app entry
```

## Getting Started

### 1) Clone

```bash
git clone git@github.com:Rajput-Suraj/youtube-video-listing.git
cd youtube-video-listing
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run lint` - run ESLint checks
- `npm run preview` - preview the production build locally

## Review Checklist

If you are reviewing this project, check:

- API integration correctness and error handling
- UI structure and visual hierarchy of video cards
- Responsive behavior on narrow and wide viewports
- Readability and maintainability of React component logic
- Styling consistency and spacing

## Future Improvements

- Search and filter support
- Category chips
- Pagination or infinite scrolling
- Video details page
- Skeleton loaders

---

Built as a learning-focused frontend project using React + Vite.
