//IMPORT
var express = require('express');
var router = express.Router();
var controllers = require('../controllers/user.controller');

//POST ROUTES
router.post('/register',controllers.register);
router.post('/login',controllers.login);

//EXPORT ROUTER
module.exports = router;