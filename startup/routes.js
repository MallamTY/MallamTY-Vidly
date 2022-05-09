
const express = require('express');
const customerHome = require('../routes/customerAPIWithMongo');
const genreHome = require('../routes/genreAPIWithMongo');
const user = require('../routes/userAPIWithMongo');
const rental = require('../routes/rentals');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const createdError = require('../middlewares/error');




module.exports = function(app){
app.use(express.json()); 
app.use('/vidly.com/api/genres', genreHome);
app.use('/vidly.com/api/customers', customerHome);
app.use('/vidly.com/api/users', user);
app.use('/vidly.com/api/rentals', rental);
app.use('/vidly.com/api/returns', returns);
app.use('/api/auth', auth);
app.use(createdError);
}
