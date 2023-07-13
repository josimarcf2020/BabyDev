require('dotenv').config({path:'variaveis.env'});

const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("ACcess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    server.use(cors());
    next();
});

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
const routes = require('./routes');

server.use('/api', routes);
server.use(cors());

server.listen(process.env.PORT, ()=>{
    console.log(`Ouvindo porta http://localhost:${process.env.PORT}`);
});