/**
 * @class Response
 */
class Response{
	constructor(){
		this.errors = null;
		this.data		= null;
	}

	/**
	 * True if response is a success.
	 * @return {Boolean} 
	 */
	get success(){
		return !this.errors;
	}

	/**
	 * True if response is a failure.
	 * @return {Boolean} 
	 */
	get failed(){
		return !this.success;
	}

	/**
	 * Set Errors
	 * @param {Response}
	 */
	setErrors(errors){
		this.errors = errors;
		return this;
	}

	/**
	 * Set Single Error
	 * @param {String} path    
	 * @param {String} message 
	 */
	setError(path,message){
		if(!this.errors)
			this.errors = [];
		this.errors.push({field:path,error:message});

		return this;
	}

	/**
	 * Set Data
	 * @param {Response}
	 */
	setData(data){
		this.data = data;
		return this;
	}

}
//EXPORT LIB
module.exports = Response;