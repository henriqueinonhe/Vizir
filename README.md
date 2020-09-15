# Vizir Admission Test

A simple app that calculates dial prices according to dial codes, dial length and FaleMais plan and displays it in a web page.

As the requirements for the project were very simple I extended them a little bit by fecthing dial codes price rate from a database instead of having these values hardcoded in the frontend and also by sending website's usage data to the database.

Stack used:
- MongoDB
- ExpressJS
- React
- Node
- Typescript
- Jest
- Puppeteer
- styled-components

Table of Contents:
1. [Requirements](#1-requirements)
2. [Installation](#2-installation)
3. [Running](#3-running)
    3.1 [Development](#31-development)
    3.2 [Production](#32-production)
4. [Tests](#4-tests)
5. [Database](#5-database)
6. [Documentation](#6-documentation)
7. [FAQ](#7-faq)

## 1. Requirements
To build the project *code* you need **[node](https://nodejs.org/en/)** and to build and run containers you need **[docker](https://www.docker.com/)**.

To inspect the database you'll need **[mongo shell](https://docs.mongodb.com/manual/mongo/)**

## 2. Installation

Clone the repo:
``` sh
git clone https://github.com/henriqueinonhe/Vizir
```

Install dependencies:
``` sh
cd Vizir/app && \
npm install 
```

## 3. Running

There are two possible modes: 
- development
- production

Website is accessible at `localhost:3000` and database is accessible at `localhost:3001`, **make sure to leave these ports open**. 

### 3.1 Development

Development build uses a local bind volume and must be used to run tests.

``` sh
#at .../Vizir/app
npm run dev-build && \
cd ../.. && \
docker-compose -f docker-compose.development.yaml up --build
```

Cleanup:
``` sh
docker-compose -f docker-compose.development.yaml down --rmi all -v
```

### 3.2 Production

Lighweight build that installs only dev dependencies inside container.
``` sh
#at .../Vizir/app
npm run prod-build && \
cd ../.. && \
docker-compose -f docker-compose.production.yaml up --build
```

Cleanup:
```sh
docker-compose -f docker-production.yaml down ---rmi all -v
```

## 4. Tests

The testing framework used is **Jest** and for UI tests **puppeteer** is used as well.

---

**Important!**
To run *integration* and *ui* tests you **must** have the *development* build running with containers.

---

To run **all** tests and collect coverage data:
``` sh
npm run test
```

Tests are also divided in **unit** tests, **integration** tests and **ui** tests, which are tagged accordingly and can be run individually:
1. Unit Tests - `npm run unit-test`
2. Integration Tests - `npm run integration-test`
3. UI Tests - `npm run ui-test`

Note: *coverage is only collected with `npm run test`*.

## 5. Database

Database (MongoDB) is accessible at `localhost:3001`, with crendentials:

- **username: telzir-backend-admin**
- **password: supersecretbackendadminpassword**

App data is stored at database `telzir` and it has two collections:
- `DialCodesPriceRateTableData` - for dial codes price rates storage
- `usageData` - for website usage data storage

To connect to database using mongo client run:
``` sh
mongo --host localhost:3001 --username telzir-backend-admin --password supersecretbackendadminpassword
```

## 6. Documentation

Source code is thoroughly documented and you can also generate a documentation website with **typedoc** by running:
```
# at .../Vizir/app
npm run docs
```

Documentation website entry point is located at `.../Vizir/app/docs/index.html`.

## 7. FAQ

### Is it possible to run the project without docker/containers?

Yes. But it does require you to make a few tweaks.

To run the web server you just need to run:
``` sh
npm run start
```

When it comes to the database, however, you'll have to provide your **own** MongoDB instance.

Once you have your own MongoDB instance, either locally or remotely, you need to patch `.env` to include your DB *URI* and you'll need to create a database named `telzir` and populate it with `init.js` script, located at `.../Vizir/database`.

---

### Is there a way to run tests **inside** the container, as opposted to running them in the host?

Yes, but I didn't implement it because **puppeteer** needs some tweaks to run inside containers and I really didn't have the time to properly implement and test it.

---

### Why the heck did you commit the `.env` file?

Yeah, I know, not the best thing ever, but the thing is, as database URI varies when acessing it from *host* (for running tests, for example) and when acessing it from inside the *container*, I thought it would be more convenient to provide a `.env` already configured, instead of having you configure it.

Also, this is a private repository and the database runs inside a container, we don't need to worry about any sensitive information leaking.

---



