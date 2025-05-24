# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup &&
    # mkdir -p /var/cache/nginx /var/run && \
    # chown -R appuser:appgroup /var/cache/nginx /var/run /usr/share/nginx/html


COPY --from=builder --chown=appuser:appgroup /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

USER appuser
CMD ["nginx", "-g", "daemon off;"]