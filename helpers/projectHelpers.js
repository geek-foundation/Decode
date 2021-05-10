var db = require('../config/connection');
var collections = require('../config/collections');


module.exports = {

	addProject:(project,callback)=>{
		// Add new project to database and pass it's id to a callback.

		db.get().collection(collections.PROJECT_COLLECTION).insertOne(project).then((data)=>{
			callback(data.ops[0]._id);
		});
	},

    addIssue:(issue,callback)=>{
    	// Add new issue to a project and pass data as callback.

    	db.get().collection(collections.ISSUE_COLLECTION).insertOne(issue).then((data)=>{
    		callback(data.ops[0]._id);
    	});

    },

    getProjects:(user_id,callback)=>{
    	// Get all Projects from database and pass the data as a callback.
    	db.get().collection(collections.PROJECT_COLLECTION).find({user_id:user_id}).toArray().then((data)=>{
    		callback(data);
    	});
    }

}