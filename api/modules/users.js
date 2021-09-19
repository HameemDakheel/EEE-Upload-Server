const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  salt: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    unique: true,
    required: true,
  },
  privileges: {
    type: String,
    default: "sub-user",
	unique: true,
},
defaultPath:{
	type:String,
	required:true,
}
});

User.methods.setPassword = function (password){
  this.salt = crypto.randomBytes(32).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

}

User.methods.checkPassword = function (password) {
  // let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

  // return this.hash === hash;
  return this.password === password;
};

User.methods.generateToken = function (){
  let token = jwt.sign({id: this._id ,username:this.userName}, process.env.JWT_SECRET, {
    expiresIn:'3h'
  });
  console.log(token);
  return token
}

mongoose.model('User', User);