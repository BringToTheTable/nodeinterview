# User Authentication Service


The repostory contains minimal implementation for user authentication . 

## API List

- POST /v1/auth/register -  For User registration
- POST /v1/auth/login   - For Login
- POST /v1/user/profile -  To get the profile details
- POST /v1/user/signout - To Sign out


## Envornment Set Up

Service  requires [Node.js](https://nodejs.org/) v12+ to run.

Either run MongoDB locally or add MONGODB_URL in .env file in root directory

```sh
MONGODB_URL=mongodb://127.0.0.1:27017/nodeqn
```


Install the dependencies and devDependencies and start the server.

with npm 
```sh
npm install
```
with yarn
```sh
yarn
```

For running tests

```sh
npm test
```


For starting app

```sh
npm start
```

## Task

-  Currently, register API (POST /v1/auth/register)  allow to give email id which is used to sign up before. Write  
logic in this API to prevent it. It should throw 400 BAD REQUEST error when user tries to sign up using already existing email id .  

- Currently, invoking API (GET /v1/user/signout),  black list JWT token which user is being used. Write a logic to preven black listing token to be used.  It should throw 400 BADREQUEST error when user tries to access API with black listed token  

`Since we follow test driven development, test cases for above scenarios are already written and it is failing now. After the above implementation, it is expected that all test cases will be passed`

To Run test

```sh
npm test
```

