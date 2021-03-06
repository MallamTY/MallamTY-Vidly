const mongoose = require('mongoose');
const Joi = require("joi");

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
        
}))

function validateUpdateCustomer(customer){
    const schema = {
        name : Joi.string().min(5).max(50),
        phone : Joi.string().min(5).max(50),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
    
}

exports.Customer = Customer;
exports.validate = validateUpdateCustomer;
