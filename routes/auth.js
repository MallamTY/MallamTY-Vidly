//const config = require('config'); //for jsonwebtoken
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../model/users');
const express = require('express');
const { Schema } = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email address or password');

  
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email address or password');

    const token = user.generateAuthToken();
    res.send(token);

    

});



function validate(user){
    const schema = {
        email: Joi.string().min(11).max(255).email().required(),
        password : Joi.string().min(8).max(1024).required(),
    }

    return Joi.validate(user, schema);
    
};

module.exports = router;