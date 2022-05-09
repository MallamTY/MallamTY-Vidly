const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const {validate, User} = require('../model/users');
const express = require('express');
const { Schema } = require('mongoose');
const res = require('express/lib/response');
const router = express.Router();

router.get('/me', auth, async(req, res) =>{
     const user1 = await User.findById(req.user._id, ['-password', '-_id']);
     res.send(user1);
    res.send(user1); 

})
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('There is already a user with your email address')  


    //INSTEAD OF USING THIS LINES OF CODES, I WILL USE .pick METHOD FROM LODASH LIBRARY
    // user =  new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    //LINES OF CODES USING .pick method from the LODASH LIBRARY
    user = new User(_.pick(req.body, ['name', 'email', 'password','isAdmin']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt); //bcrypt.hash(password to be used, salt to be used)
    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email', 'isAdmin']));
    

});




module.exports = router;