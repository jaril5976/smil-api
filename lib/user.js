//LIB IMPORT
const db = require('models/index');
const bcrypt = require('bcrypt');
const Response = require('./response');
const Auth = require('./auth');

//CLASS DECLARATION
class User{

  //REGISTER FUNCTION
	async register(data){
        const resp = new Response();
        //CHECK EMAIL EXIST
        const ifEmailUnique = await this.checkIfDataUnique('email', data.email);
        if (!ifEmailUnique) return resp.setError('email', 'Email Already Exists');
        //ENCRYPT PASSWORD
        data.password = await bcrypt.hash(data.password, 10);
        //CREATE USER
        var __resp = await db.User.create(data);
        //SEND RESPONSE
        return resp.setData(__resp);
    }

    async checkIfDataUnique(key, data) {
        const user = await db.User.count({
          where: {
            [key]: data
          },
        });
        if (user > 0) return false;
        return true;
    }

    //LOGIN FUNCTION
    async login(data){
      //CHECK USER EXIST OR NOT
      const resp = new Response();
      const query = {
        where: {
          email: data.email
        }
      };
      const user = await db.User.findOne(query);
      if (!user) {
        return resp.setError('email', 'Invalid Email');
      }
      //CHECK PASSWORD MATCH OR NOT
      const matched = await bcrypt.compare(data.password, user.password);
      if (!matched) {
        return resp.setError('password', 'Invalid Password');
      }
      //SEND RESPONSE
      return resp.setData({
        user,
        access_token: Auth.token(user.id)
      });
    }
}
//EXPORT LIB
module.exports = User