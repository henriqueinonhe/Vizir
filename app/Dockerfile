FROM node:lts-alpine

EXPOSE 3000

COPY . ./app

WORKDIR /app
RUN npm install --only=prod
RUN npm run prod-build

ENV DB_URI=DB_URI=mongodb://telzir-backend-admin:supersecretbackendadminpassword@database:27017/?retryWrites=true&w=majority


ENTRYPOINT [ "npm" , "run", "start" ]