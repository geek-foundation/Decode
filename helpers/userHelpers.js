var db = require("../config/connection");
var collections = require("../config/collections");

let bcrypt = require("bcrypt");

module.exports = {
	signUp: (userData) => {
		return new Promise(async(resolve, reject) => {
			userData.password = await bcrypt.hash(userData.password, 10);

			db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
				resolve(data.ops[0])
			});
		});
	},

    login: (data)=>{
    	return new Promise(async(resolve, reject)=>{
    		let loggedIn =false;
    		let response ={};
    		let user = await db.get().collection(collections.USER_COLLECTION).findOne({email:data.email});
    		if(user){
    			bcrypt.compare(data.password, user.password).then((status)=>{
    				if(status){
    					response.user = user;
                        response.status = true;
                        resolve(response);
    				}else{
    					resolve({status:false});
    				}
    			});
    		}else{
    			resolve({status:false});
    		}
    	})
    }

};
