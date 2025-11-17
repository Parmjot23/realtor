# Premium Real Estate (React + Vite)

A modern, data-driven realtor experience built with React and Vite. Listings are loaded from `public/listings.json` so that future updates only require editing a single JSON file—no code changes necessary.

## Getting Started

```bash
cd realtor-react
npm install
npm run dev
```

The dev server will print a local URL (default `http://localhost:5173`). Vite has hot-module reload so UI updates immediately as you edit the code.

### Production build

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

Output files land in `dist/` and can be deployed to any static host (Netlify, Vercel, S3, etc.).

## Project Structure

```
realtor-react/
├── public/
│   └── listings.json       # Realtor info + property data (only file to edit for new listings)
├── src/
│   ├── App.jsx             # Main single-page layout + UI logic
│   ├── App.css             # Component styling + responsive rules
│   ├── index.css           # Global resets
│   └── main.jsx            # React entry point
└── package.json
```

## Updating Listings

1. Open `public/listings.json`.
2. Update the `realtor` object for new branding/contact info.
3. Append or edit objects inside the `listings` array (each listing needs an `id`, `title`, `address`, `price`, `type`, etc.).
4. Restart the dev server (or refresh the browser) to see the new data.

## Features

- Responsive hero, listings grid, services, testimonials, and contact sections
- Search, filter, and sort controls (type, bedrooms, price range, newest/price/size sort)
- Listing modal with detailed specs + features
- Contact form with inline success messaging
- Smooth scroll animations and polished visual design

Feel free to customize colors/typography in `src/App.css` or extend the layout with additional sections and components. Since everything is static, deployment is as simple as hosting the `dist/` folder.*** End Patch
