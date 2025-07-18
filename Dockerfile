FROM node:20-alpine AS builder

WORKDIR /app

COPY  package*.json  ./

RUN npm ci

COPY .  .

RUN npm run build:prod

FROM nginx:alpine 

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

