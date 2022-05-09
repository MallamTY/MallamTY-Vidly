const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    winston.handleExceptions(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.File({filename: 'uncaughtException.log'}));
    
    process.on('uncaughtRejection', (err) => {
        throw err;
    });
    
    winston.add(winston.transports.File, {filename: 'logfile.log'});
    //winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/Vidly'});
    const prom = Promise.reject( new Error('Could not start the application due to uncaught error encountered'));
     prom.then(() => console.log('Caught!!!!!!!!!!!!!!'));
}