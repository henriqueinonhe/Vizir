FROM mongo

WORKDIR /docker-entrypoint-initdb.d

COPY ./init.js .

ENV MONGO_INITDB_ROOT_USERNAME=telzir-backend-admin
ENV MONGO_INITDB_ROOT_PASSWORD=supersecretbackendadminpassword
ENV MONGO_INITDB_DATABASE=telzir

EXPOSE 27017