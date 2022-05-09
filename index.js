

const mongoose = require('mongoose');
const express = require("express");
const winstonMongodb = require('winston-mongodb');
const winston = require('winston');

const app = express();
require('config');


//require('./startup/logging')(); 
require('./startup/routes')(app);
require('./startup/dbConnect')();
require('./startup/prod')(app);

//const config = require('config');
// const startUpDebugger = require('debug')('app:startup'); //reqire('debug') returns a function which I passed parameter "app:startup" to
// const dbDebugger = require('debug')('app:db');
// const { urlencoded } = require("express");
// const helmet = require('helmet');
// const morgan = require('morgan'); //morgan module is used for logging HTTP request. Check Documentations for proper knowledge
// const { schema } = require("joi/lib/types/object");
// const config = require('config');
// //const logger = require('./logger');
// //const authenticator = require('./logger');


// if (!config.get('jwtPrivateKey')){
//     console.error("FATAL ERROR: jwtPrivateKey not found");  Lines for jsonwebtoke
//     process.exit(1);
// }




// genreAPI.use(express.urlencoded({extended : true}));
// genreAPI.use(express.static('Public'));
// genreAPI.use(helmet());
// genreAPI.use(logger);


const port = process.env.port || 7000;
const server = app.listen(port, () => winston.info(`Your application is now Listening and Waiting for Connection on port ${port}`));

module.exports = server;


 