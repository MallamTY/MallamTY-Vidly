
const winston = require('winston');
module.exports = function(err, req, res, next){
//line 4 - of this module is used for winston to log errors
//logging level which determines the important of the message to log include;
// 1. error
// 2. warning
// 3. info
// 4. verbose 
// 5. debug

winston.error(err.message, err); //winston.log(param1, param2) .Param1 = logging level, .Param 2 = Metadata

    res.status(500).send('Internal Error, please check back later!!!!!!!!!!!!!!!!!!');
    next();
}