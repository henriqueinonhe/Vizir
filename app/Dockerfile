FROM node:lts-alpine

EXPOSE 3000

COPY . ./app

WORKDIR /app
RUN npm install --only=prod
RUN npm run prod-build

ENTRYPOINT [ "npm" , "run", "start" ]