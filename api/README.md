# E-Store API

E-Store API is a RESTFul API built with Node JS (Express), Written in TypeScript and for the Database MongoDB with Mongoose is used.

## Getting started

### Install all dependencies

```
npm install
```

### Setting Environment

#### Create a Database

You have two options

- Option [1] Create a local database using mongo shell
- Option [2] Create a cluster on mongodb.com

#### Adding Environment variables

In the project root folder add `.env` file and add the following variables

```
# node environment
NODE_ENV=development

# database
PORT=8000
DATABASE_LOCAL_URL=''

# jwt
JWT_SECRET='anything you want'

```

### Build the server

```
npm run build
```

### Run the server in development mode

```
npm run start
```

### Run the server in production mode

```
npm run start:prod
```

## Linting and Formatting

### Prettier

```
npm run prettier
```

### ESLint

#### To check code only.

```
npm run lint
```

#### To check code and fix.

```
npm run lint:fix
```

## Usage

This server will be running on `port:8000`

### Endpoints.

- Some enpoints will need a JWT to be provided Request Headers Authorization in the following format `Authorization` : `Bearer <token>`.
- Endpoints to access and modify database are available in the [REQUIREMENTS.md](https://github.com/toukhyy/e-store/api/blob/master/REQUIREMENTS.md) file.
