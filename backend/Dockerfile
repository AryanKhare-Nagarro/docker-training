# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

# Stage 2: Production
FROM node:18-alpine
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=dependencies --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .
USER appuser
CMD ["node", "index.js"]