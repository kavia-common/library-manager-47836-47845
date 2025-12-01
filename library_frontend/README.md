# Ocean Library (Nuxt 3)

A simple, modern book library frontend built with Nuxt 3 using the "Ocean Professional" theme.

- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

No backend is required. Data is stored in-memory and persisted to `localStorage` for demo purposes.

## Features
- Browse a seeded list of books in a responsive grid
- Search by title/author, filter by tag/genre
- Book details page with edit and delete
- Add/edit books with basic validation
- Optional star rating when feature flag enabled
- Ocean Professional styling: rounded corners, subtle shadows, gradient headers, smooth transitions
- Accessible labels, focus styles, and alt text

## Quick start
Install dependencies and run:

```bash
# from this directory
npm install
npm run dev
```

Visit: http://localhost:3000

## Health / Debug
- Server health: `GET /health` returns `OK`
- API health: `GET /api/health` returns `{ status: 'ok', timestamp }`
- The top blue banner in the UI shows "SSR OK" to confirm server-side render; it toggles to "Hydrated" when the client has mounted.

If you only see the Nuxt logo, check browser console for hydration errors and visit `/health` to ensure the server is reachable.

## Routes
- `/` — Books List (search and filter)
- `/books/:id` — Book Details
- `/books/new` — Add Book
- `/books/:id/edit` — Edit Book

## Data persistence
Books are kept in-memory and synchronized to `localStorage` using the key `ocean-library-books-v1`. Reloading the page keeps your changes. Clearing browser storage restores seeded demo data.

## Environment variables (optional)
The app works fully client-side without any environment variables. If present, these will be read but are not required:

- `NUXT_PUBLIC_API_BASE`
- `NUXT_PUBLIC_BACKEND_URL`
- `NUXT_PUBLIC_FRONTEND_URL`
- `NUXT_PUBLIC_WS_URL`
- `NUXT_PUBLIC_NODE_ENV`
- `NUXT_PUBLIC_NEXT_TELEMETRY_DISABLED`
- `NUXT_PUBLIC_ENABLE_SOURCE_MAPS`
- `NUXT_PUBLIC_PORT`
- `NUXT_PUBLIC_TRUST_PROXY`
- `NUXT_PUBLIC_LOG_LEVEL`
- `NUXT_PUBLIC_HEALTHCHECK_PATH`
- `NUXT_PUBLIC_FEATURE_FLAGS`
- `NUXT_PUBLIC_EXPERIMENTS_ENABLED`

### Feature flags
If `NUXT_PUBLIC_FEATURE_FLAGS` includes `experiments:bookRating` (as JSON or token), a 1–5 star rating appears in forms and on cards.

Examples:
- JSON: `{"experiments":{"bookRating":true}}`
- Tokens: `experiments:bookRating`

## Styling
Theme CSS is defined in `assets/styles/theme.css` and loaded globally. If you want Tailwind, you can add it later—but this app uses lightweight CSS variables and utility classes by default.

## Build/Preview
```bash
npm run build
npm run preview
```
Preview/Dev serves on `0.0.0.0:3000` to support remote previews.

### Allowed hosts / Preview proxies
If you see "Blocked request. This host is not allowed." ensure the preview hostname is allowed in Vite. This project:

- Hardcodes the preview host: `vscode-internal-34023-qa.qa01.cloud.kavia.ai`
- Allows wildcard domain: `*.cloud.kavia.ai`
- Reads optional `ALLOWED_HOSTS` env (comma-separated) to augment the allowlist.
- Enables `server.host = true` and `strictPort = true` for consistent binding.
- Sets HMR client port from `HMR_CLIENT_PORT` or `NUXT_PUBLIC_PORT` when present.
- Sets `server.origin` and HMR `host` to the external preview host when detected/configured.

Examples:
```bash
# add extra host(s) if needed
ALLOWED_HOSTS="my-proxy.example.com,another.host" npm run dev

# set explicit HMR client port (useful behind TLS proxies)
HMR_CLIENT_PORT=3000 npm run dev

# explicitly set external origin and HMR host when needed
NUXT_PUBLIC_FRONTEND_URL="https://vscode-internal-34023-qa.qa01.cloud.kavia.ai:3000" \
HMR_HOST="vscode-internal-34023-qa.qa01.cloud.kavia.ai" \
npm run dev
```

Verification checklist:
- Visit `/health` -> should return `OK`
- Visit `/api/health` -> should return `{ status: 'ok', timestamp }`
- Top banner should show "SSR OK · Hydrated" after client mounts
- No "Blocked request" message in the browser console/network panel

## Notes
- No backend calls are made; any provided URLs are ignored unless you wire them in future.
- Keep dependencies minimal and avoid modifying preview/startup tooling.
