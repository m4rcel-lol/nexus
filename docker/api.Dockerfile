FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build --workspace @nexus/shared
RUN npm run prisma:generate
RUN npm run build --workspace @nexus/api

FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json* ./
COPY --from=build /app/apps/api/package.json apps/api/package.json
COPY --from=build /app/packages/db/package.json packages/db/package.json
COPY --from=build /app/packages/db/prisma packages/db/prisma
COPY --from=build /app/packages/shared/package.json packages/shared/package.json
COPY --from=build /app/packages/shared/dist packages/shared/dist
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/node_modules node_modules
EXPOSE 4000
CMD ["node", "apps/api/dist/index.js"]
