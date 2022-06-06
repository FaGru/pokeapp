# `Pokeapp`

## `MERN-Stack Project`

Fullstack application made with MongoDB, Express, React & Nodejs (MERN) and TypeScript.
The app is using the [PokeApi](https://pokeapi.co/) for constructing RESTful API.
PokeAPI provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to Pokémon.
The server (backend) provides User Registration and Login functionality with validations using React, NodeJs, ExpressJs and MongoDB and authentication using JWTs.


## `Current version`

Visit the latest version of [PokeApp](https://pokeapp-sand.vercel.app/)!

## `Tech Stack - Frontend`

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) / [Jest](https://jestjs.io/)
- [Zustand](https://www.npmjs.com/package/zustand)
- [styled components](https://styled-components.com/)
- [Axios](https://www.npmjs.com/package/axios)


## `Tech Stack - Backend`
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node](https://nodejs.dev/)
- [JSON Web Token](https://jwt.io/)
- [Axios](https://www.npmjs.com/package/axios)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://jwt.io/)



## `Project Setup Client`

First clone the project and go the the client folder:
```
git clone git@github.com:FaGru/pokeapp.git
```
```
cd pokeapp/client
```

Create .env file that include (Only if you run the backend not locally):
```
REACT_APP_API_URL
```

Install all client dependencies and start the localhost:
```
npm install && npm start
```


Run the Tests:
```
npm test
```

## `Project Setup Server`

Switch to server folder:
```
cd server
```

Create .env file that include (See .env.example):
```
MONGODB_URL & PORT & JWT_SECRET
```

Install all server dependencies and start the server:
```
npm install && npm start
```

