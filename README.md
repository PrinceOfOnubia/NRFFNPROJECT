# NRFFN — Nigerian Realtors Financial Freedom Network

A premium real estate wealth-building ecosystem: referral + commission engine, CRM, property marketplace, training academy and leadership/incentive system — all under one unified platform.

> Building Wealth Through Real Estate & Technology

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **lucide-react** icons
- Frontend-only with mock data (`lib/**/data.ts`) — no backend required to run

## Design language

Premium light-mode system — royal blue (`#1046a3`) + wealth gold (`#c9a227`), liquid glass surfaces, fluid typography, real photography.

- `.nlp` — public landing (`app/styles/landing.css`)
- `.npl` — authenticated portals (`app/styles/portal.css`)
- `.nauth` — auth screens

## Surfaces

| Area | Route | Component |
|------|-------|-----------|
| Landing | `/` | `app/page.tsx` |
| Auth | `/login`, `/{role}/login`, `/{role}/register` | `components/auth/AuthScreen.tsx` |
| Realtor portal | `/associate/*` | `components/associate/AssociateApp.tsx` |
| Investor portal | `/client/*` | `components/client/ClientApp.tsx` |
| Admin / Super Admin | `/admin/*`, `/super-admin/*` | `components/admin/AdminApp.tsx` |

### Key features

- **5-level commission engine** + wallet (available / pending / withdrawn)
- **Referral engine** with live QR code & network tree
- **CRM** kanban with WhatsApp, notes & lead stages
- **Academy** with courses, progress, quizzes & certification
- **Incentives** rank ladder with rewards & travel
- **Marketplace** of verified properties (4 ownership models)
- **Admin / Super Admin** control: users, memberships, properties, commissions, revenue, audit logs, roles, system health

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## License

Proprietary — © NRFFN Ltd.
