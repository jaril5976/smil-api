//LIB IMPORT
const Response = require('./response');
const Joi = require('joi');

/**
 * @class ApplyValidationsJoi
 */
class ApplyValidationsJoi{

	/**
	 * Validate
	 * @param  {Object} validatorSchemaObj Validator Schema Object
	 * @param  {Object} data  Data to validate
	 * @return {Response}
	 */
	async validate(validatorSchemaObj,data,debug){
		let resp = new Response();
		var that = this
 	  const errors = Joi.validate(data, validatorSchemaObj, function(err, value) {
	    if (err) {
	 	    var _errors = [];
	 	    var newErrArr = [];
	 	    err.details.forEach(function(error, index, arr) {
	 	    	console.log('JARIL ERROR OBJECT:', error)
	 	    	if(!newErrArr.includes(error.context.key)){
		   		   _errors.push({
			            "field": error.path[error.path.length - 1],
			            "error": that.setErrorMessage(error)
		        	});
		   		   newErrArr.push(error.context.key)
		   		}
			});
			console.log('This is final error response', _errors)
			return resp.setErrors(_errors);
	    } else {
	    	return resp;
	    }
	  });
		return errors;
	}

	setErrorMessage(errorObj){
		var __ERROR = ''
		var __label = errorObj.context.label;

		//setting error messages
    	if(errorObj.type == 'any.empty')
    		__ERROR = this.setRequiredError(__label);

    	if(errorObj.type == 'string.regex.base')
    		__ERROR = this.setRegexError(__label);

    	if(errorObj.type == 'any.required')
    		__ERROR = this.setRequiredError(__label);

    	if(errorObj.type == 'any.allowOnly')
    		__ERROR = this.setRegexError(__label);

    	if(errorObj.type == 'object.allowUnknown')
    		__ERROR = this.setUnknownError(__label);

    	if(errorObj.type == 'number.base')
    		__ERROR = this.setNumberError(__label)

    	if(errorObj.type == 'object.base')
			__ERROR = this.setRequiredError(__label);
			
		if(errorObj.type == 'number.max')
			__ERROR = this.setMaxError(__label, errorObj.context.limit);
    	
    	return __ERROR;
	}

	setRequiredError(keyName){
		return `${keyName} is required`;
	}

	setRegexError(keyName){
		return `${keyName} is invalid`;
	}

	setUnknownError(keyName){
		return `${keyName} is not allowed`;
	}

	setNumberError(keyName){
		return `${keyName} must be a number`;
	}

	setMaxError(keyName, MaxValue){
		return `${keyName} must be less than or equal to ${MaxValue}`;
	}
}
//EXPORT LIB
module.exports = ApplyValidationsJoi;