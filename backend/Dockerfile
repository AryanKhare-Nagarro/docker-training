# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY backend/package.json ./
RUN npm install --omit=dev

# Stage 2: Production
FROM node:18-alpine
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=dependencies --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup backend/ .
USER appuser
EXPOSE 3000
CMD ["node", "index.js"]