FROM node:lts-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

RUN npm ci --production

ENV DB_URI=DB_URI=mongodb://telzir-backend-admin:supersecretbackendadminpassword@database:27017/?retryWrites=true&w=majority

USER node

ENTRYPOINT [ "npm" , "run", "start" ]
