FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
ENV WATCHPACK_POLLING=true

RUN npm ci --only=production

RUN npm run build

FROM build-stage AS test-stage
RUN CI=true npm test


FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html