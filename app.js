//IMPORT
require('app-module-path').addPath(__dirname);
const express = require('express')

//DOTENV CONFIG
require('dotenv').config()

//CREATE EXPRESS OBJECT
const app = express()
const routes = require('./routes/index');
//ERROR HANDLING WITH PRETTY-ERROR
const {DEBUG} = require('config/debugger')
if (DEBUG){
  require('pretty-error').start();
}

//MDEDIA GETTER
app.use('/media', express.static('storage/files'));

app.get('/', (req, res) => res.send('Hello World!'))

//BODY-PARSER FOR REQUEST DATA
var bodyParser = require('body-parser')

//MULTER FOR FORM-DATA AND FILES
var multer = require('multer');

//LOGGER
const logger = require('morgan');
app.use(logger('common'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//ALLOW ACCESS CONTROL ORIGIN
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MULTER INTEGRATION
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/").pop();
        const hash = Math.random().toString(36).substr(2, 8);
        const name = [file.fieldname, hash, Date.now()].join('-') + '.' + ext;
        cb(null, name);
    }
  });
app.use(multer({ storage: storage }).any());

//CONNECT ALL API ROUTE
app.use('/api', routes);

module.exports = app;