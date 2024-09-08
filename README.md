# SGP-API - Product Management API

This is a simple API for managing products.

## Technologies Used

- **Node.js**: Development platform.
- **NestJS**: A framework for building scalable Node.js applications.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **TypeORM**: ORM (Object-Relational Mapping) tool for TypeScript and JavaScript (ES7).
- **Swagger**: Tool for API documentation.
- **Class-validator**: Library for object validation.
- **MySQL**: Relational database management system.

## Prerequisites

You will need to have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) or a cloud instance.

## How to run the project locally

### Step 1: Clone the repository

``` bash
git clone https://github.com/rodrigofercav/sgp-api.git
```

### Step 2: Install dependencies:

Navigate to the project directory and install the dependencies::

``` bash
cd dir-do-projeto
npm install
```

### Step 3: Configure the database and app port

Create a database in MySQL and configure the credentials in the .env file (use the '.env sample' as a guide):

```python
## Environment variables
## This is a sample file, you need to rename this file to .env and fill the variables with your own values

## App variables
APP_PORT=3000

## Database variables
DB_HOST=localhost
DB_PORT=3306
DB_NAME=database_name
DB_USER=user
DB_PASS=password
```
Once this is done correctly, the `products` table will be automatically created in the database when the app starts.

### Step 4: Start the server locally

To test in the local environment (dev), run:

```bash
npm run start:dev
```
Application is running on `localhost:3000` (check port in the `.env`).

### Step 5: Check the API documentation

The documentation via Swagger will be available on `http://localhost:3000/api` (check port in the `.env`).
