const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path:'config/config.env'})

function tokenGenerator (user, statusCode , res){

    const {user_name} = user;

    const options = {
        expires: new Date(Date.now() + 90000),
        httpOnly:true,
    }

    const authToken = jwt.sign(user_name,process.env.Secret_Key);

    res.status(statusCode).cookie('token',authToken,options).json({
        success:true,
        authToken,
        msg:'TRUE'
    })
}

module.exports = tokenGenerator;