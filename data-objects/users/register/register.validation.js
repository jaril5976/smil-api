//LIB IMPORT
const Joi = require('joi');
const Regex = require('lib/regex.js');
//VALIDATION SCHEMA
const schema = Joi.object().options({ abortEarly: false }).keys({
    name:Joi.string().label('Name').required(),
    email:Joi.string().regex(new Regex().Email()).label('Email').required(),
    password: Joi.string().regex(new Regex().Password()).label('Password').required()
});
//EXPORT SCHEMA
module.exports = schema;