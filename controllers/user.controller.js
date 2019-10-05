//IMPORT DATABASE ROOT SCEMA
const db = require('models/index.js');
//IMPORT REGISTER
const RegisterUser = require('data-objects/users/register/action');
//IMPORT LOGIN
const LoginUser = require('data-objects/users/login/action')

//REGISTER FUNCTION
module.exports.register = async function (req, res) {
    //GET DATA
    var data = req.body;
    //CALL ACTION
    const __resp = await RegisterUser(data)
    //RETURN RESPONSE
    return res.send(__resp);
}

//LOGIN FUNCTION
module.exports.login = async function (req, res) {
    //GET DATA
    var data = req.body;
    //CALL ACTION
    const __resp = await LoginUser(data)
    //RETURN RESPONSE
    return res.send(__resp);
}