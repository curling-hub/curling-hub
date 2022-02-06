FROM node:16-alpine3.15 AS dev-env
COPY ./package*.json /root/app/
WORKDIR /root/app/
RUN npm install

FROM dev-env AS build
WORKDIR /root/app/
COPY . /root/app/
RUN npm run build

FROM node:16-alpine3.15 AS runtime
ENV PORT=3000
EXPOSE $PORT
WORKDIR /root/app/
COPY --from=build /root/app/public ./public
COPY --from=build /root/app/.next/standalone ./
COPY --from=build /root/app/.next/static ./.next/static
ENTRYPOINT [ "node", "./server.js" ]