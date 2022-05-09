
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const { mongo } = require('mongoose');
const { required } = require('joi/lib/types/lazy');
const boolean = require('joi/lib/types/boolean');


require('dotenv').config();

let jwtToken = process.env.webToken;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        //maxlength: 50
    },

    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 11,
        maxlength: 255
    },

    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },

    isAdmin: Boolean
});


//This is responsible for creating generateAuthToken method for the userSchema
userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, jwtToken);
    return token;
}

const User = mongoose.model('User', userSchema);


function validateUser(user){
    const schema = {
        name : Joi.string().min(5).max(50).required(),
        email: Joi.string().min(11).max(150).email().required(),
        password : Joi.string().min(8).max(1024).required(),
        isAdmin: Joi.boolean()
    }

    return Joi.validate(user, schema);
    
}

exports.User = User;
exports.validate = validateUser;
