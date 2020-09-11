FROM node:lts

EXPOSE 3000

COPY . ./app

WORKDIR /app
RUN npm install
RUN npm run build

CMD [ "npm" , "run", "start"]