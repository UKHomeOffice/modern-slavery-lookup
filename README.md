# Save & Return Lookup UI Service
Provides a service layer to talk to a database to view records on a SQL table using the npm module knex.

**Reading:**  This service will connect to a SQL database, get the data back off a single table and show in the UI entries for a single table. Currently these can be accessed using either a save and return session ID or email.

## Local Setup
The migrations and seeds folders are used by knex to setup a local DB with dummy information for testing the service. These are not used in production where it is assumed a separate DB is setup for knex to connect to that is already setup.

Run the following commands to setup a test DB:
```
brew install postgres
brew services start postgresql
psql postgres
CREATE ROLE knex WITH LOGIN PASSWORD 'knex';
ALTER ROLE knex WITH SUPERUSER;
CREATE DATABASE knex_session;
\q
yarn run db:setup
```
If you download Postico for Mac (https://eggerapps.at/postico/), you can then inspect your postgres DB for example and look at the test entries inserted into the test table 'Reports'.

## Install & Run <a name="install-and-run"></a>
The application can be run on your local machine

### Dependencies <a name="dependencies"></a>
You will need to have the following installed:

[Node JS](https://nodejs.org/en/download/releases/) ( LTS Erbium v14.x )

[npm](https://www.npmjs.com/get-npm) ( v6.x )

[PostgreSQL](https://www.postgresql.org/download/) ( v12.x )

## Running the application

Ensure your database service is available and running.

Then to run the service use:

 ```npm start``` to run the server.

With the server running you can run the main app with save and return lookup UI functionality.
See details of how to do this in [modern slavery](https://github.com/UKHomeOffice/modern-slavery) application
