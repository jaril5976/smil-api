//IMPORTS
const express = require('express');

//ROUTES IMPORT
const user = require('./user');

//EXPRESS OBJECT
const app = express()

//ROUTES INTEGRATION
app.use('/user', user);

//EXPORT APP
module.exports = app;