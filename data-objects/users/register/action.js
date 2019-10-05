//IMPORT LIB
const ApplyValidationResponse = require('lib/applyValidationResponse');
var User = require('lib/user')
const schema = require('./register.validation');

//CREATE NEW ACTION CALLED REGISTER
async function Register(data){
    //JOI VALIDATION
    const response = await new ApplyValidationResponse().validate(schema, data);
    if (response.failed)
      return response;
    //CALL REGISTER FUNCTION
    const __resp = await new User().register(data);
    //RETRUN RESPONSE
    return __resp;
}
//EXPORT ACTION
module.exports = Register;