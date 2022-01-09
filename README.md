<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

Test task for Yalantis Node.js School - Secret santa

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
Default port: 3000

## Test

```bash
# unit tests
$ npm run test
```

## Documentation

```bash
http://localhost:3000/swagger
```
Opens swagger documentation for application in browser


## Endpoints

### Create user
```bash
POST http://localhost:3000/user
```

Required data: 

`firstName`:string

`lastName`:string

`listOfWishes`: array of strings (e.g ['Wish #1', 'Wish #2']). 

All fields are required

### Get user by id

```bash
GET http://localhost:3000/user/:id
```
Existing user id must be passed as parameter `:id`

Returns user with list of wishes 

### Get list of Secret Santa

```bash 
POST http://localhost:3000/shuffle
```
Returns list of users and secret santa. List is stored in database 
and if endpoint is requested second time it will return same list

### Clear list of Secret Santa

```bash
DELETE http://localhost:3000/shuffle
```
Deletes list of Secret Santa from database
