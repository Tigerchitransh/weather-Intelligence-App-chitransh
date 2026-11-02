# Atmosphere IQ - Weather Intelligence SPA

Atmosphere IQ is a production-ready, meteorological intelligence single page web application providing hyper-local forecasts, 7-day outlooks, and automated lifestyle, commuting, and safety heuristics.

Built with clean semantic HTML, modular CSS with dark/light themes, and pure client-side modern JavaScript (ES6+), the app requires zero backend runtime and can be deployed directly to static hosting services like Cloudflare Pages or GitHub Pages.

---

## Features

- **Global Geocoding & City Search**: Search any city worldwide via Open-Meteo Geocoding API with administrative region breakdown, error alerts, and quick-filter chips for global hubs (Tokyo, London, New York, Paris, San Francisco, Sydney, Dubai, Singapore).
- **GPS Location Detection**: Instant "My Location" detection via `navigator.geolocation` with reverse-geocoding fallback.
- **Dynamic Current Weather Hero**: Live temperature, WMO weather code translation, custom inline SVGs, and an instant °C / °F toggle persisted in `localStorage`.
- **7-Day Meteorological Forecast**: Proportional weekly thermal range rails, daily precipitation sums, and mobile scroll-snap layout.
- **Smart Insights & Advisory Panel**:
  1. *Precipitation & Umbrella Advisory*: Immediate gear advice and multi-day dry window tracking.
  2. *Thermal & Heat Advisory*: High heat alerts (> 30°C), frost warnings (≤ 0°C), and chilly layer alerts (< 10°C).
  3. *Outdoor Activity & Commute Safety*: Identifies fog hazards (WMO 45/48), thunderstorm risks (WMO 95–99), and optimal recreation windows.
  4. *7-Day Trend Analysis*: Computes thermal differentials across the first and second half of the forecast week.
- **WCAG AA Compliance**: High contrast ratios, accessible ARIA live status regions, and keyboard-friendly interactive elements.

---

## File Architecture

```
.
├── index.html         # Semantic HTML structure & accessibility regions
├── styles.css         # Design system, CSS variables, dark/light themes
├── app.js             # ES6+ state management, API queries, heuristics & DOM rendering
├── package.json       # Optional dev & build dependencies
├── .npmrc             # legacy-peer-deps=true to avoid ERESOLVE conflicts in CI/CD
└── vite.config.ts     # Vite bundler configuration
```

---

## Local Development

### Prerequisites
- Node.js (v18+)
- npm or bun

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Deployment Guide: AI Studio → GitHub → Cloudflare Pages

### Step 1: Sync or Push from AI Studio to GitHub

#### Option A: Direct Export via AI Studio UI (Recommended)
1. In the top-right toolbar of **Google AI Studio Build**, click the **Export** / **GitHub** icon.
2. If prompted, authorize GitHub and select your target repository (`weather-Intelligence-App-chitransh`) or create a new repository.
3. Select the branch (e.g., `main`).
4. Confirm commit and push. All repository files—including `index.html`, `styles.css`, `app.js`, `package.json`, and `.npmrc`—will be committed to your repository.

#### Option B: Manual Git CLI Push
```bash
# Clone or navigate into the project directory
git init
git add .
git commit -m "feat: atmosphere iq weather intelligence spa"

# Link to remote GitHub repository
git remote add origin https://github.com/Tigerchitransh/weather-Intelligence-App-chitransh.git
git branch -M main
git push -u origin main --force
```

---

### Step 2: Connect Repository to Cloudflare Pages

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the sidebar, navigate to **Compute (Workers & Pages)** > **Pages**.
3. Click **Create application** > select the **Pages** tab > click **Connect to Git**.
4. Authorize your GitHub account and select your repository:
   - `Tigerchitransh/weather-Intelligence-App-chitransh`
5. Click **Begin setup**.

---

### Step 3: Configure Build Settings in Cloudflare Pages

You can deploy using either of two methods:

#### Method 1: Vite Build Mode (Recommended)
Generates an optimized bundle with minified static assets in `dist`:

| Configuration Setting | Value |
| :--- | :--- |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(leave blank / default)* |

> **Dependency Resolution Note**: The project includes `.npmrc` with `legacy-peer-deps=true`, which prevents Cloudflare’s `npm install` step from failing on `ERESOLVE` peer dependency conflicts.

#### Method 2: Zero-Build Static Mode (Instant)
Because the application is written in vanilla HTML, CSS, and modern JavaScript, it can also be hosted directly without running any build command:

| Configuration Setting | Value |
| :--- | :--- |
| **Framework preset** | `None` |
| **Build command** | *(leave empty)* |
| **Build output directory** | `/` *(or leave blank)* |

---

### Step 4: Deploy and Verify

1. Click **Save and Deploy**.
2. Cloudflare Pages will clone the repo, install packages, and deploy the application.
3. Upon completion, you will receive a production URL (e.g. `https://weather-intelligence-app-xxx.pages.dev`).
4. Subsequent pushes to your `main` branch on GitHub will automatically trigger continuous deployments.

---

## License

Apache-2.0
