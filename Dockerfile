FROM node:20-alpine AS build

WORKDIR /app

ENV ROLLUP_SKIP_NODEJS_NATIVE=true

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
