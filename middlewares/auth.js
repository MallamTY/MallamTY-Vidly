const jwt = require('jsonwebtoken');
const { token } = require('morgan');


require('dotenv').config();
let jwtToken = process.env.WebToken;

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');


    try{
        const decoded = jwt.verify(token, jwtToken);
        req.user = decoded;
        next()
    }

    catch(ex){
        res.status(400).send('Invalid token.');
    }
    
}


module.exports = auth


