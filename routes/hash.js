const bcrypt = require('bcrypt');
const { has } = require('lodash');

async function run(){
    //const salt
     const salt = await bcrypt.genSalt(8);
     const hashedPassword = await bcrypt.hash('MallamTY', salt) //bcrypt.hash(password to be used, salt to be used)
     console.log(hashedPassword)
     console.log(salt);
}

run()
