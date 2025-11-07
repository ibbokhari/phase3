# Phase3 Frontend (React + Vite PWA)

## Quick start
```bash
npm i
npm run dev
```

Environment:
- Create `.env` from `.env.example`

Build:
```bash
npm run build && npm run preview
```

## Folder structure
- `src/pages` → Login, Join, Session
- `src/features` → psr, duties, sequence, chat, inventory, menus, assistant
- `src/lib` → api (REST), ws (WebSocket), store (Zustand), offline (SW helpers)
- `service-worker.js` → basic offline caching
