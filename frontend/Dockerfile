FROM node:16-alpine as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY app/package.json ./
COPY app/package.json ./

RUN npm install
COPY app/ ./
RUN npm run build

FROM nginx:stable-alpine as production-stage
EXPOSE 3000

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
