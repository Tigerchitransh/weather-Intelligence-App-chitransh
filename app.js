/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Atmosphere IQ - Weather Intelligence Engine
 * Pure modern client-side ES6+ JavaScript
 */

// =============================================================================
// Constants & WMO Weather Code Directory
// =============================================================================

const WMO_CODES = {
  0: { label: 'Clear Sky', category: 'clear', icon: 'sun' },
  1: { label: 'Mainly Clear', category: 'clear', icon: 'sun-cloud' },
  2: { label: 'Partly Cloudy', category: 'cloudy', icon: 'partly-cloudy' },
  3: { label: 'Overcast', category: 'cloudy', icon: 'overcast' },
  45: { label: 'Fog', category: 'fog', icon: 'fog' },
  48: { label: 'Depositing Rime Fog', category: 'fog', icon: 'fog' },
  51: { label: 'Light Drizzle', category: 'rain', icon: 'drizzle' },
  53: { label: 'Moderate Drizzle', category: 'rain', icon: 'drizzle' },
  55: { label: 'Dense Drizzle', category: 'rain', icon: 'drizzle' },
  56: { label: 'Freezing Drizzle', category: 'snow', icon: 'sleet' },
  57: { label: 'Dense Freezing Drizzle', category: 'snow', icon: 'sleet' },
  61: { label: 'Slight Rain', category: 'rain', icon: 'rain' },
  63: { label: 'Moderate Rain', category: 'rain', icon: 'rain' },
  65: { label: 'Heavy Rain', category: 'rain', icon: 'heavy-rain' },
  66: { label: 'Light Freezing Rain', category: 'snow', icon: 'sleet' },
  67: { label: 'Heavy Freezing Rain', category: 'snow', icon: 'sleet' },
  71: { label: 'Slight Snow Fall', category: 'snow', icon: 'snow' },
  73: { label: 'Moderate Snow Fall', category: 'snow', icon: 'snow' },
  75: { label: 'Heavy Snow Fall', category: 'snow', icon: 'heavy-snow' },
  77: { label: 'Snow Grains', category: 'snow', icon: 'snow' },
  80: { label: 'Slight Rain Showers', category: 'rain', icon: 'rain' },
  81: { label: 'Moderate Showers', category: 'rain', icon: 'rain' },
  82: { label: 'Violent Showers', category: 'rain', icon: 'heavy-rain' },
  85: { label: 'Slight Snow Showers', category: 'snow', icon: 'snow' },
  86: { label: 'Heavy Snow Showers', category: 'snow', icon: 'heavy-snow' },
  95: { label: 'Thunderstorm', category: 'storm', icon: 'thunderstorm' },
  96: { label: 'Thunderstorm with Hail', category: 'storm', icon: 'thunderstorm' },
  99: { label: 'Severe Thunderstorm', category: 'storm', icon: 'thunderstorm' }
};

// Popular preset cities with exact coordinates for immediate, verified queries
const PRESET_CITIES = [
  { name: 'Tokyo', country: 'Japan', admin1: 'Tokyo Prefecture', lat: 35.6895, lon: 139.6917 },
  { name: 'London', country: 'United Kingdom', admin1: 'England', lat: 51.5085, lon: -0.1257 },
  { name: 'New York', country: 'United States', admin1: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'Paris', country: 'France', admin1: 'Île-de-France', lat: 48.8566, lon: 2.3522 },
  { name: 'San Francisco', country: 'United States', admin1: 'California', lat: 37.7749, lon: -122.4194 },
  { name: 'Sydney', country: 'Australia', admin1: 'New South Wales', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', country: 'United Arab Emirates', admin1: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', country: 'Singapore', admin1: '', lat: 1.3521, lon: 103.8198 }
];

// SVG Icon Generator for Weather & UI
function getSvgIcon(iconName, customClass = '') {
  const icons = {
    'sun': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4" fill="#fbbf24" stroke="#f59e0b" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="#f59e0b" />
      </svg>`,
    'sun-cloud': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41" stroke="#f59e0b" />
        <circle cx="12" cy="10" r="3" fill="#fbbf24" stroke="#f59e0b" />
        <path d="M17.5 19H9a5 5 0 0 1 0-10 4.8 4.8 0 0 1 2 .45 5.5 5.5 0 0 1 9.5 4.55A3.5 3.5 0 0 1 17.5 19z" fill="#94a3b8" stroke="#cbd5e1" opacity="0.9" />
      </svg>`,
    'partly-cloudy': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="10" cy="8" r="3" fill="#fbbf24" stroke="#f59e0b" />
        <path d="M10 2v2M3.93 4.93l1.41 1.41M16.07 4.93l-1.41 1.41" stroke="#f59e0b" />
        <path d="M19 19H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 19 19z" fill="#94a3b8" stroke="#cbd5e1" />
      </svg>`,
    'overcast': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 19H7a5 5 0 0 1 0-10 4.8 4.8 0 0 1 2.2.55 5.5 5.5 0 0 1 9.8 4.45A3.5 3.5 0 0 1 17.5 19z" fill="#64748b" stroke="#94a3b8" />
      </svg>`,
    'fog': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 10h16M2 14h20M6 18h12M5 6h14" stroke="#94a3b8" />
      </svg>`,
    'drizzle': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 15H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 15z" fill="#64748b" stroke="#94a3b8" />
        <line x1="8" y1="18" x2="8" y2="20" stroke="#38bdf8" />
        <line x1="12" y1="18" x2="12" y2="20" stroke="#38bdf8" />
        <line x1="16" y1="18" x2="16" y2="20" stroke="#38bdf8" />
      </svg>`,
    'rain': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 14H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 14z" fill="#475569" stroke="#94a3b8" />
        <line x1="8" y1="17" x2="6" y2="21" stroke="#38bdf8" stroke-width="2" />
        <line x1="12" y1="17" x2="10" y2="21" stroke="#38bdf8" stroke-width="2" />
        <line x1="16" y1="17" x2="14" y2="21" stroke="#38bdf8" stroke-width="2" />
      </svg>`,
    'heavy-rain': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 13H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 13z" fill="#334155" stroke="#64748b" />
        <line x1="7" y1="16" x2="5" y2="22" stroke="#0284c7" stroke-width="2.5" />
        <line x1="11" y1="16" x2="9" y2="22" stroke="#0284c7" stroke-width="2.5" />
        <line x1="15" y1="16" x2="13" y2="22" stroke="#0284c7" stroke-width="2.5" />
        <line x1="19" y1="16" x2="17" y2="22" stroke="#0284c7" stroke-width="2.5" />
      </svg>`,
    'snow': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 14H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 14z" fill="#64748b" stroke="#cbd5e1" />
        <circle cx="8" cy="18" r="1" fill="#e0f2fe" stroke="none" />
        <circle cx="12" cy="20" r="1" fill="#e0f2fe" stroke="none" />
        <circle cx="16" cy="18" r="1" fill="#e0f2fe" stroke="none" />
      </svg>`,
    'heavy-snow': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 13H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 13z" fill="#475569" stroke="#e2e8f0" />
        <circle cx="6" cy="17" r="1.5" fill="#e0f2fe" stroke="none" />
        <circle cx="10" cy="21" r="1.5" fill="#e0f2fe" stroke="none" />
        <circle cx="14" cy="17" r="1.5" fill="#e0f2fe" stroke="none" />
        <circle cx="18" cy="21" r="1.5" fill="#e0f2fe" stroke="none" />
      </svg>`,
    'sleet': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 14H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 14z" fill="#64748b" stroke="#94a3b8" />
        <line x1="8" y1="18" x2="6" y2="21" stroke="#38bdf8" stroke-width="2" />
        <circle cx="13" cy="19.5" r="1.5" fill="#e0f2fe" stroke="none" />
        <line x1="17" y1="18" x2="15" y2="21" stroke="#38bdf8" stroke-width="2" />
      </svg>`,
    'thunderstorm': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 13H7a4.5 4.5 0 0 1 0-9 4.2 4.2 0 0 1 1.8.4 5 5 0 0 1 8.8 4.2A3.2 3.2 0 0 1 17.5 13z" fill="#1e293b" stroke="#64748b" />
        <polygon points="12 13 9 18 13 18 11 23 16 16 12 16 14 13" fill="#facc15" stroke="#eab308" stroke-width="1" />
      </svg>`,
    'umbrella': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 12A10 10 0 0 0 2 12h20z"/>
        <path d="M12 12v8a2 2 0 0 0 4 0"/>
        <path d="M12 2v2"/>
      </svg>`,
    'thermometer': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>`,
    'activity': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>`,
    'trending-up': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>`,
    'trending-down': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
      </svg>`,
    'droplets': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>`,
    'compass': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>`,
    'refresh': `
      <svg class="${customClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>`
  };

  return icons[iconName] || icons['sun-cloud'];
}

// =============================================================================
// Application State
// =============================================================================

const state = {
  activeUnit: localStorage.getItem('atmosphere_iq_unit') || 'C',
  theme: localStorage.getItem('atmosphere_iq_theme') || 'dark',
  currentCity: PRESET_CITIES[0], // Tokyo default
  weatherData: null,
  isLoading: false,
  lastUpdated: null,
  activeFilterCity: 'Tokyo'
};

// =============================================================================
// Unit Conversion & Formatting Helpers
// =============================================================================

function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function formatTemp(celsiusVal, unit = state.activeUnit, showUnit = true) {
  if (celsiusVal === undefined || celsiusVal === null || isNaN(celsiusVal)) return '--';
  const val = unit === 'F' ? celsiusToFahrenheit(celsiusVal) : celsiusVal;
  const rounded = Math.round(val);
  return showUnit ? `${rounded}°` : `${rounded}`;
}

function formatPrecip(mmVal, unit = state.activeUnit) {
  if (mmVal === undefined || mmVal === null || isNaN(mmVal)) return '0.0 mm';
  if (unit === 'F') {
    const inches = (mmVal * 0.0393701).toFixed(2);
    return `${inches} in`;
  }
  return `${mmVal.toFixed(1)} mm`;
}

function formatDayLabel(dateStr, index) {
  if (index === 0) return 'Today';
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString(undefined, { weekday: 'short' });
}

function formatShortDate(dateStr) {
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// =============================================================================
// API Integrations
// =============================================================================

/**
 * Geocode city name to coordinates via Open-Meteo Geocoding API
 */
async function geocodeCity(cityName) {
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName.trim())}&count=1&language=en&format=json`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) {
      throw new Error(`Geocoding server responded with status ${res.status}`);
    }
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }
    const match = data.results[0];
    return {
      name: match.name,
      country: match.country || '',
      admin1: match.admin1 || '',
      lat: match.latitude,
      lon: match.longitude,
      timezone: match.timezone || 'auto'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Geocoding request timed out. Please check your internet connection.');
    }
    throw err;
  }
}

/**
 * Reverse geocode coordinates to friendly city/region name
 */
async function reverseGeocode(lat, lon) {
  try {
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(bdcUrl, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      const name = data.locality || data.city || data.principalSubdivision || 'Detected Location';
      const country = data.countryName || '';
      const admin1 = data.principalSubdivision || '';
      return { name, country, admin1, lat, lon };
    }
  } catch {
    // Attempt fallback to OpenStreetMap Nominatim
    try {
      const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      const res2 = await fetch(osmUrl);
      if (res2.ok) {
        const d2 = await res2.json();
        const addr = d2.address || {};
        return {
          name: addr.city || addr.town || addr.village || addr.suburb || 'Local Spot',
          country: addr.country || '',
          admin1: addr.state || '',
          lat,
          lon
        };
      }
    } catch {
      // Ignore fallback error
    }
  }

  // Graceful fallback to coordinates
  return {
    name: 'Current Coordinates',
    country: 'Local Device',
    admin1: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
    lat,
    lon
  };
}

/**
 * Fetch 7-day meteorological forecast from Open-Meteo
 */
async function fetchForecast(lat, lon) {
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) {
      throw new Error(`Meteorological API responded with status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Weather forecast query timed out. Please try again.');
    }
    throw err;
  }
}

// =============================================================================
// Meteorological Intelligence & Advisory Heuristics
// =============================================================================

function computeIntelligencePanels(current, daily, unit) {
  const todayPrecip = daily.precipitation_sum?.[0] ?? 0;
  const todayMaxC = daily.temperature_2m_max?.[0] ?? 20;
  const todayMinC = daily.temperature_2m_min?.[0] ?? 12;
  const currentCode = current.weather_code ?? 0;

  // ---------------------------------------------------------------------------
  // 1. Precipitation & Umbrella Advisory
  // ---------------------------------------------------------------------------
  let precipCard = {};
  if (todayPrecip > 0) {
    let severity = 'Moderate';
    let gear = 'Carry an umbrella and wear water-repellent footwear.';
    let tag = { label: 'Rain Expected', class: 'tag-warning' };

    if (todayPrecip < 1.0) {
      severity = 'Light Sprinkles';
      gear = 'Light passing mist or drizzle. A compact travel umbrella or water-resistant shell is sufficient.';
      tag = { label: 'Light Moisture', class: 'tag-info' };
    } else if (todayPrecip >= 6.0) {
      severity = 'Heavy Downpour';
      gear = 'Substantial rain accumulation projected. Carry a sturdy windproof umbrella and wear waterproof boots.';
      tag = { label: 'Umbrella Essential', class: 'tag-alert' };
    }

    precipCard = {
      tag,
      headline: `Rain expected today (${formatPrecip(todayPrecip, unit)}).`,
      detail: `${gear} High moisture levels will affect road conditions and outdoor movement.`,
      stat: `Today: ${formatPrecip(todayPrecip, unit)}`,
      sub: `${severity} Precipitation`
    };
  } else {
    // Scan ahead across days 1 to 6
    let nextRainDay = -1;
    let nextRainAmount = 0;
    for (let i = 1; i < daily.precipitation_sum.length; i++) {
      if (daily.precipitation_sum[i] > 0.1) {
        nextRainDay = i;
        nextRainAmount = daily.precipitation_sum[i];
        break;
      }
    }

    if (nextRainDay !== -1) {
      const nextDayName = formatDayLabel(daily.time[nextRainDay], nextRainDay);
      precipCard = {
        tag: { label: 'Dry Today', class: 'tag-favorable' },
        headline: 'No rain expected today. Umbrella not required.',
        detail: `Dry and clear paths for today. Next precipitation is modeled for ${nextDayName} (${formatPrecip(nextRainAmount, unit)}).`,
        stat: `Today: 0.0 mm`,
        sub: `Next rain on ${nextDayName}`
      };
    } else {
      precipCard = {
        tag: { label: 'Prolonged Dry', class: 'tag-favorable' },
        headline: 'Completely dry outlook for the entire 7-day model.',
        detail: 'Zero measurable precipitation is projected over the upcoming week. Ideal window for outdoor projects, washing, and travel.',
        stat: '7-Day Total: 0.0 mm',
        sub: 'Zero Rain Across Model'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Thermal & Heat Advisory
  // ---------------------------------------------------------------------------
  let thermalCard = {};
  if (todayMaxC >= 30) {
    thermalCard = {
      tag: { label: 'Heat Alert', class: 'tag-alert' },
      headline: `High heat alert: Peak high reaching ${formatTemp(todayMaxC, unit)}.`,
      detail: 'Intense thermal stress during peak hours (11:00 AM – 4:00 PM). Maintain regular hydration, prioritize shade, and avoid vigorous midday exertion.',
      stat: `High: ${formatTemp(todayMaxC, unit)}`,
      sub: 'Hydration & Shade Priority'
    };
  } else if (todayMinC <= 0) {
    thermalCard = {
      tag: { label: 'Freeze Warning', class: 'tag-alert' },
      headline: `Sub-zero freeze advisory: Overnight low of ${formatTemp(todayMinC, unit)}.`,
      detail: 'Freezing hazard with frost formation on exposed surfaces. Wear insulated thermal outerwear, protective gloves, and guard against slippery black ice.',
      stat: `Low: ${formatTemp(todayMinC, unit)}`,
      sub: 'Frost & Icy Hazard'
    };
  } else if (todayMinC < 10) {
    thermalCard = {
      tag: { label: 'Chilly Range', class: 'tag-warning' },
      headline: `Brisk conditions: Morning & evening lows dipping to ${formatTemp(todayMinC, unit)}.`,
      detail: 'Crisp diurnal temperatures. Multi-layering is recommended with a fleece, wool sweater, or medium outer jacket during morning transit.',
      stat: `Low: ${formatTemp(todayMinC, unit)}`,
      sub: 'Light Layers Recommended'
    };
  } else if (todayMaxC >= 20 && todayMinC >= 12) {
    thermalCard = {
      tag: { label: 'Optimal Comfort', class: 'tag-favorable' },
      headline: `Mild & comfortable thermal equilibrium (${formatTemp(todayMinC, unit)} to ${formatTemp(todayMaxC, unit)}).`,
      detail: 'Gentle, balanced temperatures without extreme thermal discomfort. Suitable for standard breathable apparel throughout the day.',
      stat: `Range: ${formatTemp(todayMinC, unit)} – ${formatTemp(todayMaxC, unit)}`,
      sub: 'Ideal Physiological Comfort'
    };
  } else {
    thermalCard = {
      tag: { label: 'Temperate Range', class: 'tag-info' },
      headline: `Temperate day: High of ${formatTemp(todayMaxC, unit)}, Low of ${formatTemp(todayMinC, unit)}.`,
      detail: 'Moderate ambient temperatures. Comfortable indoor and outdoor conditions with standard transitional seasonal wear.',
      stat: `High: ${formatTemp(todayMaxC, unit)}`,
      sub: 'Standard Seasonal Range'
    };
  }

  // ---------------------------------------------------------------------------
  // 3. Outdoor Activity & Commute Safety
  // ---------------------------------------------------------------------------
  let activityCard = {};
  if ([95, 96, 99].includes(currentCode)) {
    activityCard = {
      tag: { label: 'Severe Weather', class: 'tag-alert' },
      headline: 'Severe Thunderstorm Advisory: Active lightning hazard.',
      detail: 'Postpone all outdoor running, cycling, or recreational outings. Stay indoors away from windows and exercise heightened vigilance during transit.',
      stat: 'WMO 95-99 Storms',
      sub: 'Commute Hazard Alert'
    };
  } else if ([45, 48].includes(currentCode)) {
    activityCard = {
      tag: { label: 'Low Visibility', class: 'tag-warning' },
      headline: 'Fog Alert: Dense particulate mist reducing transit sightlines.',
      detail: 'Reduced horizontal visibility across motorways and cycle paths. Use low-beam headlamps, allow extra transit margins, and wear high-visibility gear.',
      stat: 'WMO 45 Fog',
      sub: 'Reduced Road Visibility'
    };
  } else if ([71, 73, 75, 77, 85, 86, 66, 67].includes(currentCode)) {
    activityCard = {
      tag: { label: 'Winter Traction', class: 'tag-alert' },
      headline: 'Winter Precipitation: Icy walkways & snow accumulation.',
      detail: 'Slick pavement and compromised vehicle braking distances. Utilize high-traction footwear and allocate additional buffer for regional transit.',
      stat: 'Snow / Freezing Rain',
      sub: 'Traction Footwear Advised'
    };
  } else if (todayPrecip > 1.5 || [61, 63, 65, 80, 81, 82].includes(currentCode)) {
    activityCard = {
      tag: { label: 'Wet Conditions', class: 'tag-warning' },
      headline: 'Wet Commute: Slick asphalt and standing water puddles.',
      detail: 'Road spray will reduce bicycle and pedestrian comfort. Outdoor cardio workouts not recommended; gym or indoor training preferred.',
      stat: `Precip: ${formatPrecip(todayPrecip, unit)}`,
      sub: 'Indoor Cardio Recommended'
    };
  } else if (currentCode === 3 && todayPrecip === 0) {
    activityCard = {
      tag: { label: 'Good For Running', class: 'tag-info' },
      headline: 'Overcast but Dry: Diffused light with zero rain.',
      detail: 'Stable dry conditions beneath an overcast cloud canopy. Excellent environment for long-distance running, dog walking, and errands with zero sun glare.',
      stat: 'Dry Cloud Canopy',
      sub: 'Optimal Low-Glare Conditions'
    };
  } else {
    activityCard = {
      tag: { label: 'Prime Conditions', class: 'tag-favorable' },
      headline: 'Prime Outdoor Recreation Window: Ideal ambient weather.',
      detail: 'Superb meteorological conditions. Highly favorable for outdoor running, cycling, park recreation, open-air dining, and community sports.',
      stat: 'Dry & Favorable',
      sub: 'High Outdoor Index'
    };
  }

  // ---------------------------------------------------------------------------
  // 4. 7-Day Trend Analysis
  // ---------------------------------------------------------------------------
  const highs = daily.temperature_2m_max;
  const firstHalfAvgC = (highs[0] + highs[1] + highs[2]) / 3;
  const secondHalfAvgC = (highs[3] + highs[4] + highs[5] + (highs[6] ?? highs[5])) / 4;
  const diffC = secondHalfAvgC - firstHalfAvgC;

  let trendCard = {};
  const absDiff = Math.abs(diffC);
  const diffDisplay = unit === 'F' ? (absDiff * 1.8).toFixed(1) : absDiff.toFixed(1);

  if (diffC >= 2.0) {
    trendCard = {
      icon: 'trending-up',
      tag: { label: 'Warming Trend', class: 'tag-warning' },
      headline: `Noticeable warming trend (+${diffDisplay}°${unit}) heading into the week.`,
      detail: `Later-week daytime highs will climb from an initial average of ${formatTemp(firstHalfAvgC, unit)} up to ${formatTemp(secondHalfAvgC, unit)}. Expect progressively warmer afternoons.`,
      stat: `+${diffDisplay}°${unit} Shift`,
      sub: 'Daytime Warming Trajectory'
    };
  } else if (diffC <= -2.0) {
    trendCard = {
      icon: 'trending-down',
      tag: { label: 'Cooling Trend', class: 'tag-info' },
      headline: `Cooling trend ahead: Temperatures drop by -${diffDisplay}°${unit}.`,
      detail: `A cooler air mass moves in for the second half of the model, bringing daily maximums down from ${formatTemp(firstHalfAvgC, unit)} toward ${formatTemp(secondHalfAvgC, unit)}.`,
      stat: `-${diffDisplay}°${unit} Shift`,
      sub: 'Upcoming Cooler Air Mass'
    };
  } else {
    trendCard = {
      icon: 'activity',
      tag: { label: 'Stable Pattern', class: 'tag-neutral' },
      headline: `Steady meteorological pattern: Daily highs remain consistent (±${diffDisplay}°${unit}).`,
      detail: `Daytime maximums oscillate stably around ${formatTemp(firstHalfAvgC, unit)} across all 7 days with minimal sudden temperature volatility.`,
      stat: `±${diffDisplay}°${unit} Variance`,
      sub: 'Consistent Barometric Profile'
    };
  }

  return { precipCard, thermalCard, activityCard, trendCard };
}

// =============================================================================
// DOM Rendering Engine
// =============================================================================

function renderHeroCard() {
  const heroCardEl = document.getElementById('weather-hero');
  if (!heroCardEl || !state.weatherData) return;

  const current = state.weatherData.current;
  const daily = state.weatherData.daily;
  const city = state.currentCity;
  const wmo = WMO_CODES[current.weather_code] || { label: 'Clear Sky', icon: 'sun' };

  const todayMax = daily.temperature_2m_max[0];
  const todayMin = daily.temperature_2m_min[0];
  const todayPrecip = daily.precipitation_sum[0] || 0;

  // City and state formatting
  const subtitle = [city.admin1, city.country].filter(Boolean).join(', ');
  const timezoneText = state.weatherData.timezone ? state.weatherData.timezone.replace('_', ' ') : 'Local Time';

  heroCardEl.innerHTML = `
    <div class="hero-main-row">
      <div class="location-meta">
        <div class="location-badges">
          <span class="live-badge">
            <span class="live-dot" aria-hidden="true"></span> Live Station
          </span>
          <span class="timezone-badge" title="Local Timezone">
            ${getSvgIcon('compass', 'btn-icon')} ${escapeHtml(timezoneText)}
          </span>
        </div>
        <h2 class="city-title">${escapeHtml(city.name)}</h2>
        <p class="region-subtitle">${escapeHtml(subtitle)}</p>
        <div class="geo-coordinates tabular-nums">
          <span>LAT ${city.lat.toFixed(4)}°</span>
          <span>•</span>
          <span>LON ${city.lon.toFixed(4)}°</span>
        </div>
      </div>

      <div class="hero-visual-wrapper">
        <div class="hero-condition-icon" aria-hidden="true">
          ${getSvgIcon(wmo.icon)}
        </div>
        <div class="hero-temp-block">
          <div class="hero-temp-value tabular-nums" aria-label="Current temperature: ${formatTemp(current.temperature_2m, state.activeUnit)}">
            ${formatTemp(current.temperature_2m, state.activeUnit, false)}
            <span class="hero-temp-unit">°${state.activeUnit}</span>
          </div>
          <div class="hero-condition-text">${escapeHtml(wmo.label)}</div>
        </div>
      </div>
    </div>

    <div class="metric-strip">
      <div class="metric-cell">
        <span class="metric-cell-label">
          ${getSvgIcon('thermometer')} Today's Range
        </span>
        <span class="metric-cell-value tabular-nums">
          ${formatTemp(todayMax, state.activeUnit)} / ${formatTemp(todayMin, state.activeUnit)}
        </span>
        <span class="metric-cell-sub">High & Low Spread</span>
      </div>

      <div class="metric-cell">
        <span class="metric-cell-label">
          ${getSvgIcon('droplets')} 24h Precipitation
        </span>
        <span class="metric-cell-value tabular-nums">
          ${formatPrecip(todayPrecip, state.activeUnit)}
        </span>
        <span class="metric-cell-sub">${todayPrecip > 0 ? 'Accumulation active' : 'Zero precipitation'}</span>
      </div>

      <div class="metric-cell">
        <span class="metric-cell-label">
          ${getSvgIcon('compass')} WMO Code
        </span>
        <span class="metric-cell-value tabular-nums">
          Code ${current.weather_code}
        </span>
        <span class="metric-cell-sub">${escapeHtml(wmo.label)}</span>
      </div>

      <div class="metric-cell">
        <span class="metric-cell-label">
          ${getSvgIcon('refresh')} Station Update
        </span>
        <span class="metric-cell-value tabular-nums">
          ${state.lastUpdated ? state.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}
        </span>
        <span class="metric-cell-sub">Synchronized</span>
      </div>
    </div>
  `;
}

function renderForecastGrid() {
  const container = document.getElementById('forecast-grid');
  if (!container || !state.weatherData) return;

  const daily = state.weatherData.daily;
  const count = Math.min(daily.time.length, 7);

  // Compute global weekly min & max for proportional rail calculations
  let globalMin = Math.min(...daily.temperature_2m_min.slice(0, count));
  let globalMax = Math.max(...daily.temperature_2m_max.slice(0, count));
  const span = Math.max(1, globalMax - globalMin);

  let html = '';
  for (let i = 0; i < count; i++) {
    const isToday = i === 0;
    const dateStr = daily.time[i];
    const dayLabel = formatDayLabel(dateStr, i);
    const shortDate = formatShortDate(dateStr);
    const code = daily.weather_code[i];
    const wmo = WMO_CODES[code] || { label: 'Clear', icon: 'sun' };
    const maxTemp = daily.temperature_2m_max[i];
    const minTemp = daily.temperature_2m_min[i];
    const precip = daily.precipitation_sum[i] || 0;

    // Proportional rail percentages
    const leftPct = Math.round(((minTemp - globalMin) / span) * 100);
    const rightPct = Math.round(((maxTemp - globalMin) / span) * 100);
    const widthPct = Math.max(14, rightPct - leftPct);

    html += `
      <article class="forecast-card ${isToday ? 'today' : ''}" tabindex="0" aria-label="${dayLabel}: ${wmo.label}, High ${formatTemp(maxTemp, state.activeUnit)}, Low ${formatTemp(minTemp, state.activeUnit)}">
        <div class="card-date-wrap">
          <span class="card-day-name">${dayLabel}</span>
          <span class="card-date-sub tabular-nums">${shortDate}</span>
        </div>

        <div class="card-weather-icon" aria-hidden="true">
          ${getSvgIcon(wmo.icon)}
        </div>

        <div class="card-condition-label" title="${escapeHtml(wmo.label)}">
          ${escapeHtml(wmo.label)}
        </div>

        <div class="card-temp-pair tabular-nums">
          <span class="card-temp-max">${formatTemp(maxTemp, state.activeUnit)}</span>
          <span class="card-temp-min">${formatTemp(minTemp, state.activeUnit)}</span>
        </div>

        <div class="temp-rail-wrapper" title="Proportional range: ${formatTemp(minTemp, state.activeUnit)} to ${formatTemp(maxTemp, state.activeUnit)}">
          <div class="temp-rail-fill" style="left: ${leftPct}%; width: ${widthPct}%;"></div>
        </div>

        <div class="card-precip-badge ${precip > 0 ? 'has-rain' : ''}">
          ${getSvgIcon('droplets')}
          <span>${formatPrecip(precip, state.activeUnit)}</span>
        </div>
      </article>
    `;
  }

  container.innerHTML = html;
}

function renderIntelligencePanels() {
  const container = document.getElementById('intelligence-grid');
  if (!container || !state.weatherData) return;

  const { precipCard, thermalCard, activityCard, trendCard } = computeIntelligencePanels(
    state.weatherData.current,
    state.weatherData.daily,
    state.activeUnit
  );

  container.innerHTML = `
    <!-- Card 1: Precipitation & Umbrella Advisory -->
    <div class="insight-card precip-card" tabindex="0">
      <div class="insight-top-bar">
        <div class="insight-icon-title">
          <div class="insight-avatar" aria-hidden="true">
            ${getSvgIcon('umbrella')}
          </div>
          <span class="insight-cat-label">Precipitation & Umbrella Advisory</span>
        </div>
        <span class="insight-status-tag ${precipCard.tag.class}">
          ${precipCard.tag.label}
        </span>
      </div>

      <div class="insight-body">
        <h3 class="insight-headline">${escapeHtml(precipCard.headline)}</h3>
        <p class="insight-detail">${escapeHtml(precipCard.detail)}</p>
      </div>

      <div class="insight-footer-meta">
        <span class="insight-stat-pill">${precipCard.stat}</span>
        <span>${escapeHtml(precipCard.sub)}</span>
      </div>
    </div>

    <!-- Card 2: Thermal & Heat Advisory -->
    <div class="insight-card thermal-card" tabindex="0">
      <div class="insight-top-bar">
        <div class="insight-icon-title">
          <div class="insight-avatar" aria-hidden="true">
            ${getSvgIcon('thermometer')}
          </div>
          <span class="insight-cat-label">Thermal & Heat Advisory</span>
        </div>
        <span class="insight-status-tag ${thermalCard.tag.class}">
          ${thermalCard.tag.label}
        </span>
      </div>

      <div class="insight-body">
        <h3 class="insight-headline">${escapeHtml(thermalCard.headline)}</h3>
        <p class="insight-detail">${escapeHtml(thermalCard.detail)}</p>
      </div>

      <div class="insight-footer-meta">
        <span class="insight-stat-pill">${thermalCard.stat}</span>
        <span>${escapeHtml(thermalCard.sub)}</span>
      </div>
    </div>

    <!-- Card 3: Outdoor Activity & Commute Safety -->
    <div class="insight-card activity-card" tabindex="0">
      <div class="insight-top-bar">
        <div class="insight-icon-title">
          <div class="insight-avatar" aria-hidden="true">
            ${getSvgIcon('activity')}
          </div>
          <span class="insight-cat-label">Outdoor Activity & Commute Safety</span>
        </div>
        <span class="insight-status-tag ${activityCard.tag.class}">
          ${activityCard.tag.label}
        </span>
      </div>

      <div class="insight-body">
        <h3 class="insight-headline">${escapeHtml(activityCard.headline)}</h3>
        <p class="insight-detail">${escapeHtml(activityCard.detail)}</p>
      </div>

      <div class="insight-footer-meta">
        <span class="insight-stat-pill">${activityCard.stat}</span>
        <span>${escapeHtml(activityCard.sub)}</span>
      </div>
    </div>

    <!-- Card 4: 7-Day Trend Analysis -->
    <div class="insight-card trend-card" tabindex="0">
      <div class="insight-top-bar">
        <div class="insight-icon-title">
          <div class="insight-avatar" aria-hidden="true">
            ${getSvgIcon(trendCard.icon || 'trending-up')}
          </div>
          <span class="insight-cat-label">7-Day Trend Analysis</span>
        </div>
        <span class="insight-status-tag ${trendCard.tag.class}">
          ${trendCard.tag.label}
        </span>
      </div>

      <div class="insight-body">
        <h3 class="insight-headline">${escapeHtml(trendCard.headline)}</h3>
        <p class="insight-detail">${escapeHtml(trendCard.detail)}</p>
      </div>

      <div class="insight-footer-meta">
        <span class="insight-stat-pill">${trendCard.stat}</span>
        <span>${escapeHtml(trendCard.sub)}</span>
      </div>
    </div>
  `;
}

function updateDOM() {
  renderHeroCard();
  renderForecastGrid();
  renderIntelligencePanels();
  updateQuickChipsUI();

  // Update footer timestamp
  const tsEl = document.getElementById('last-sync-time');
  if (tsEl && state.lastUpdated) {
    tsEl.textContent = state.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  // Update screen reader live region
  announceAria(`Weather loaded for ${state.currentCity.name}. Temperature is ${formatTemp(state.weatherData.current.temperature_2m, state.activeUnit)}.`);
}

function updateQuickChipsUI() {
  const chips = document.querySelectorAll('.city-chip');
  chips.forEach(chip => {
    const cityName = chip.dataset.city;
    if (cityName && cityName.toLowerCase() === state.currentCity.name.toLowerCase()) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

// =============================================================================
// Lifecycle & Loading Controller
// =============================================================================

function setLoading(isLoading, message = 'Fetching meteorological intelligence...') {
  state.isLoading = isLoading;
  const overlay = document.getElementById('loading-overlay');
  const overlayText = document.getElementById('loading-text');
  const searchBtn = document.getElementById('search-btn');
  const geoBtn = document.getElementById('geo-btn');

  if (overlay) {
    if (isLoading) {
      if (overlayText) overlayText.textContent = message;
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  }

  if (searchBtn) searchBtn.disabled = isLoading;
  if (geoBtn) geoBtn.disabled = isLoading;
}

function showError(message) {
  const alertEl = document.getElementById('alert-banner');
  const alertMsg = document.getElementById('alert-message');
  if (alertEl && alertMsg) {
    alertMsg.textContent = message;
    alertEl.classList.add('active');
    announceAria(`Error: ${message}`);
  }
}

function hideError() {
  const alertEl = document.getElementById('alert-banner');
  if (alertEl) {
    alertEl.classList.remove('active');
  }
}

function announceAria(msg) {
  const ariaEl = document.getElementById('aria-live-status');
  if (ariaEl) {
    ariaEl.textContent = msg;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =============================================================================
// Orchestration & Weather Actions
// =============================================================================

/**
 * Loads weather data for a city object { name, country, admin1, lat, lon }
 */
async function loadWeatherForCity(cityObj) {
  hideError();
  setLoading(true, `Querying meteorological data for ${cityObj.name}...`);

  try {
    const forecastData = await fetchForecast(cityObj.lat, cityObj.lon);
    
    // Crucial lifecycle step: Reset loading state BEFORE rendering to prevent any blank screen or stuck skeleton
    setLoading(false);

    state.currentCity = cityObj;
    state.weatherData = forecastData;
    state.lastUpdated = new Date();

    updateDOM();
  } catch (err) {
    setLoading(false);
    showError(err.message || 'Failed to load weather forecast data. Please check your network and try again.');
  }
}

/**
 * Search city by string query
 */
async function searchAndLoadCity(query) {
  if (!query || !query.trim()) return;
  const trimmed = query.trim();
  hideError();
  setLoading(true, `Searching geocoding database for "${trimmed}"...`);

  try {
    const result = await geocodeCity(trimmed);
    if (!result) {
      setLoading(false);
      showError(`Could not find "${trimmed}". Please verify spelling or try another city.`);
      return;
    }

    // Now query forecast
    setLoading(true, `Retrieving weather for ${result.name}, ${result.country}...`);
    const forecast = await fetchForecast(result.lat, result.lon);
    
    // Reset loading state before rendering
    setLoading(false);

    state.currentCity = result;
    state.weatherData = forecast;
    state.lastUpdated = new Date();

    updateDOM();
  } catch (err) {
    setLoading(false);
    showError(err.message || `Unable to locate "${trimmed}". Please try again.`);
  }
}

/**
 * Trigger GPS location detection with fallback reverse-geocoding
 */
function handleUseMyLocation() {
  if (!('geolocation' in navigator)) {
    showError('Geolocation is not supported by your browser.');
    return;
  }

  hideError();
  setLoading(true, 'Requesting device GPS coordinates...');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        setLoading(true, 'Resolving local region & weather profile...');
        const resolvedCity = await reverseGeocode(lat, lon);
        const forecast = await fetchForecast(lat, lon);

        // Reset loading state before rendering
        setLoading(false);

        state.currentCity = resolvedCity;
        state.weatherData = forecast;
        state.lastUpdated = new Date();

        updateDOM();
      } catch (err) {
        setLoading(false);
        showError(err.message || 'Error fetching weather for your detected coordinates.');
      }
    },
    (geoError) => {
      setLoading(false);
      let msg = 'Could not retrieve your location.';
      if (geoError.code === geoError.PERMISSION_DENIED) {
        msg = 'Location permission was denied. You can search for your city above or click any preset city.';
      } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
        msg = 'Location information is currently unavailable.';
      } else if (geoError.code === geoError.TIMEOUT) {
        msg = 'Location request timed out. Please try searching for your city.';
      }
      showError(msg);
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    }
  );
}

// =============================================================================
// Theme & Unit Toggles
// =============================================================================

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('atmosphere_iq_theme', theme);

  const themeIconContainer = document.getElementById('theme-icon');
  if (themeIconContainer) {
    themeIconContainer.innerHTML = theme === 'dark' 
      ? getSvgIcon('sun')
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

function setUnit(unit) {
  if (unit !== 'C' && unit !== 'F') return;
  state.activeUnit = unit;
  localStorage.setItem('atmosphere_iq_unit', unit);

  // Update button active state
  document.querySelectorAll('.unit-btn').forEach(btn => {
    if (btn.dataset.unit === unit) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Re-render UI immediately without any network calls
  if (state.weatherData) {
    updateDOM();
  }
}

// =============================================================================
// Initialization & Event Listeners
// =============================================================================

function setupEventListeners() {
  // Unit Toggles
  const unitBtns = document.querySelectorAll('.unit-btn');
  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setUnit(btn.dataset.unit);
    });
  });

  // Theme Toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // Search Form
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search-btn');

  if (searchInput && clearBtn) {
    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim().length > 0) {
        clearBtn.classList.add('visible');
      } else {
        clearBtn.classList.remove('visible');
      }
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value;
      if (query && query.trim()) {
        searchAndLoadCity(query);
      }
    });
  }

  // GPS Location button
  const geoBtn = document.getElementById('geo-btn');
  if (geoBtn) {
    geoBtn.addEventListener('click', handleUseMyLocation);
  }

  // Quick preset chips
  const chips = document.querySelectorAll('.city-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cityName = chip.dataset.city;
      const foundPreset = PRESET_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      if (foundPreset) {
        loadWeatherForCity(foundPreset);
      } else {
        searchAndLoadCity(cityName);
      }
    });
  });

  // Alert close button
  const alertCloseBtn = document.getElementById('alert-close-btn');
  if (alertCloseBtn) {
    alertCloseBtn.addEventListener('click', hideError);
  }

  // Refresh button in footer
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (state.currentCity) {
        loadWeatherForCity(state.currentCity);
      }
    });
  }
}

// Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme
  setTheme(state.theme);

  // Initialize Unit
  setUnit(state.activeUnit);

  // Bind Listeners
  setupEventListeners();

  // Load initial city (Tokyo)
  loadWeatherForCity(state.currentCity);
});
