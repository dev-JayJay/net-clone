const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Keycloak = require('keycloak-connect');

const ServerController = require('./server.controller');


const app = express();
const PORT = 8081;


const memoryStore = new session.MemoryStore();

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// session middle-ware
app.use(session({
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}))

// keycloak configuration
const keycloak = new Keycloak({
    store: memoryStore,
},{
    clientId: 'my-app',              
    bearerOnly: true,               
    serverUrl: 'http://localhost:8080/',
    realm: 'myrealm',                
    credentials: {
      secret: 'your-client-secret',  
    }
})


app.get('/api/public', (req, res) => {
    res.send('This is a public API');
  });
  
  // app.get('/api/private', keycloak.protect(), (req, res) => {
  //   res.json({ message: 'This is a protected API' });
  // });
  
  // app.get('/api/admin', keycloak.protect('admin'), (req, res) => {
  //   res.json({ message: 'This is an admin protected API' });
  // });

  app.get('/login', (req, res) => {
    res.redirect(keycloak.loginUrl());
  });

  app.get('/about',ServerController);

app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}/`)
})