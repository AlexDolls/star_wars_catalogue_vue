# Star Wars Movies Catalogue

A modern, animated single-page application showcasing the Star Wars film collection with detailed information about characters, starships, vehicles, and species.

## Features

- **Movie Catalogue**: Browse all Star Wars films with key information
  - Title, release date, director, and producer
  - Opening crawl text
  - Episode number badges

- **Search Functionality**: Real-time search to filter movies by title

- **Detailed Movie Views**: Click any movie to see full details with:
  - Complete opening crawl
  - Drill-down access to related resources

- **Drill-Down Components**: Explore detailed information for:
  - **Characters**: Name, height, mass, hair color, skin color, eye color, birth year
  - **Starships**: Name, model, manufacturer, length, crew, passengers, starship class
  - **Vehicles**: Name, model, manufacturer, cost, length, speed, crew, passengers, cargo capacity, consumables, vehicle class
  - **Species**: Name, classification, designation, average height, skin colors, hair colors, eye colors, average lifespan, homeworld (with planet name lookup), language

- **URL Routing**: Shareable URLs for each movie and drill-down view
  - `/` - Movies list
  - `/movie/:id` - Movie detail page
  - `/movie/:id/:type` - Drill-down pages (characters, starships, vehicles, species)

- **Animated UI**: 
  - Twinkling starfield background
  - Smooth page transitions
  - Pulsing loading spinners
  - Interactive hover effects
  - Card animations

## API

This application uses the [SWAPI (Star Wars API)](https://swapi.dev/api) to fetch all data.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Animations and styling

## Project Setup

### Prerequisites

- Node.js (^20.19.0 || >=22.12.0)

### Installation

```sh
npm install
```

### Development

Start the development server with hot-reload:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for Production

```sh
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── LoadingSpinner.vue
│   ├── MovieCard.vue
│   └── DrillDownButton.vue
├── pages/              # Page components
│   ├── MoviesList.vue
│   ├── MovieDetail.vue
│   └── DrillDown.vue
├── router/             # Vue Router configuration
│   └── index.js
├── services/           # API service layer
│   └── swapi.js
└── assets/             # Styles and static assets
    ├── main.css
    └── base.css
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## License

This project is for demonstration purposes.
