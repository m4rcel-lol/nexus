# Nexus

Nexus is a self-hosted, open-source communicator foundation built with Next.js, Express, Socket.IO, LiveKit, PostgreSQL, Prisma, Redis, and MinIO.

## Architecture

```text
nexus/
  apps/
    api/                  Express, Socket.IO, uploads, LiveKit token API
      src/
        realtime/         Presence and realtime message events
        routes/           Upload, LiveKit, and admin routes
    web/                  Next.js app router frontend
      src/
        app/              Root app and /admin dashboard
        components/       Shadcn-style UI and communicator layouts
        store/            Zustand client state
  packages/
    db/
      prisma/schema.prisma
    shared/               Cross-app constants such as the 100MB upload limit
  docker/                 Production Dockerfiles
  infra/livekit/          LiveKit runtime config
```

## Included Foundations

- Servers, categories, text/voice/video channels, roles, permissions, direct conversations, messages, attachments, custom emoji, themes, and staff/admin state in Prisma.
- Staff badges render from `User.isAdmin`, the same flag used by admin authorization.
- Upload limit is exactly `100 * 1024 * 1024` bytes in both backend and frontend.
- Socket.IO handles presence heartbeats, channel joins, and validated message creation.
- LiveKit token API issues voice/video room grants.
- MinIO stores local S3-compatible file uploads.

## Run Locally

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run typecheck
npm test
```

## Run The Full Stack

```bash
cp .env.example .env
docker compose up --build
```

The web app listens on `http://localhost:3000`, the API on `http://localhost:4000`, MinIO console on `http://localhost:9001`, and LiveKit on `ws://localhost:7880`.

## Production Notes

- Replace every default secret in `.env`.
- Put TLS and public WebRTC IP/TURN configuration in front of LiveKit for internet deployments.
- Add real authentication before exposing `/admin`; the current backend route already requires an admin requester identity header, but the UI page is a shell.
- Run Prisma migrations before starting the API in production.
