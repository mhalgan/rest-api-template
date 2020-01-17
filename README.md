# REST API Template

The initial project structure is based on this [tutorial](https://codesquery.com/build-scalable-nodejs-restapi-using-expressjs/), but it goes further and aims to implement a reusable scalable REST API template with the following features:

1. Mocha+Chai automated tests
2. Winston logs
3. JWT security
4. Swagger documentation

## Installing

Simply clone the project and run the following command to install all the dependencies:

```
yarn
```

## Running

You can run the server in development mode with the following command:

```
yarn dev
```

## IMPORTANT

The keys in the _.env_ file were generated at https://travistidwell.com/jsencrypt/demo/ and commited for demonstration purposes. Don't forget to uncomment the _.env_ line in the _.gitignore_ file and removes this file from your Github project.

NEVER COMMIT YOUR REAL KEYS!
