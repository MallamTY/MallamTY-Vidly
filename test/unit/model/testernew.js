const {User} = require('../../../model/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    isAdmin: true }
const user = new User(payload);
const token = user.generateAuthToken();
const decoded = jwt.verify(token, 'jwtPrivateKey')
console.log(decoded)
console.log(payload);