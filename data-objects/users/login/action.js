//IMPORT LIB
const ApplyValidationResponse = require('lib/applyValidationResponse');
var User = require('lib/user')
const schema = require('./login.validation');

//CREATE NEW ACTION CALLED LOGIN
async function Login(data){
    //JOI VALIDATION
    const response = await new ApplyValidationResponse().validate(schema, data);
    if (response.failed)
      return response;
    //CALL LOGIN FUNCTION
    const __resp = await new User().login(data);
    //RETRUN RESPONSE
    return __resp;
}
//EXPORT ACTION
module.exports = Login;