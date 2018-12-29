var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var userSchema = mongoose.Schema({
	
	firstname : {type: String, index :true},
	lastname  : {type: String, index :true},
	email     : {type: String, index :true},
	gender    : {type: String, index :true},
	contact   : {type: Number, index :true},
	subject   : {type: String, index :true},
	imageURL  : { type: String, data: Buffer}
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);		