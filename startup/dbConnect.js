
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
// const def = require('../routes/config/default.json');
// const test = require('../routes/config/test.json');
// const db = def.db
// const dbTest = test.db

//require('dotenv').config();
//let dbToken = process.env.dbToken
module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db)//This returns a promise
    .then(() => winston.info(`\n \n Connection to ${db} database established to..................\n\n`))


}