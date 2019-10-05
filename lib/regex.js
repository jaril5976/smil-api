class Regex{

	Phone(){
		const phone = /^[2-9]{1}[0-9]{9}$/;
		return phone;
	}

	Email(){
		const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return email;
	}

	Password(){
		const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		return password;
	}


	NameVal(){
		const name = /^[a-zA-Z_\-]+$/;  // /^[a-zA-Z ]*$/
		return name;
	}
}
//EXPORT LIB
module.exports = Regex;