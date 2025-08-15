# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

Install dependencies (first-time setup):
    npm install

Start a local development server with hot-reload:
    npm run dev

Create an optimized production build:
    npm run build

Preview the production build locally:
    npm run preview

### Notes
• The project currently has no configured linter or test runner. Add ESLint / Vitest if needed.
• Vite adds TypeScript type-checking at build time; use `tsc --noEmit` if you need a standalone check.

## Repository Architecture (big-picture)

1. React SPA entry points
   • `index.html` – loads the bundled assets produced by Vite.
   • `index.tsx` – bootstraps React, wraps the top-level `App` component with context providers.

2. State & business logic layer
   • `hooks/useSchedule.ts` – centralised application state (teachers, schedule entries, work logs). Handles async fetching via the API service, derives computed metrics with `useMemo`, and maintains a `currentTime` interval for real-time dashboards.
   • `hooks/usePlanMode.tsx` – toggles between live “operational” mode and draft “planning” mode, exposing the active `ScheduleProposal`.

3. Service layer
   • `services/api.ts` – single source of truth for data access. Currently mocks a backend; swap this file when integrating a real API.

4. UI composition
   • `components/` – reusable, mostly stateless UI pieces (dashboard charts, schedule grid, popovers, modals, pickers, etc.). They receive data & callbacks from the hooks, keeping render logic isolated from business rules.

5. Types
   • `types.ts` – canonical TypeScript definitions for `ScheduleEntry`, `WorkLog`, `ScheduleProposal`, `CapacityProfile`, etc. Components and hooks import from here to stay consistent.

### Data Flow at a Glance
```
useSchedule  ─┐            derives + mutates
usePlanMode ─┤             ▼
            App.tsx  ──► visual components
                           ▲  user events (edit/save)
                           └───────────────────────────
```
The uni-directional flow keeps side-effects localised in the hooks while the UI remains declarative.

