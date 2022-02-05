FROM node:16-alpine3.15 AS dev-env
COPY ./package*.json /root/app/
WORKDIR /root/app/
RUN npm install

FROM node:16-alpine3.15 AS prod-env
COPY ./package*.json /root/app/
WORKDIR /root/app/
RUN npm install --production

FROM dev-env AS build
WORKDIR /root/app/
COPY . /root/app/
RUN npm run build

FROM node:16-alpine3.15 AS runtime
ENV PORT=3000
EXPOSE $PORT
WORKDIR /root/app/
COPY --from=prod-env /root/app/node_modules/ ./node_modules/
COPY --from=build /root/app/public ./public
COPY --from=build /root/app/.next/standalone ./
COPY --from=build /root/app/.next/static ./.next/static