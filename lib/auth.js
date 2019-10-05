const sha1 = require('sha1');

class Auth{

	// Used to create registered user hash
	static token(userId){
		return sha1('' + Date.now() + userId + Math.random() + Math.random()) +
			sha1('' + Math.random() + Math.random());
	}

	
}

module.exports = Auth