const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.isAuthenticatedUser = async (req,res,next) =>{
    const {token} = req.cookies;

    if(!token)
    {
        res.status(404).json({success:false,msg:'Login First To Access This Resource'})
    }
    else
    {
        const decoded = jwt.verify(token, process.env.Secret_Key);       
        req.user = await User.findOne(decoded.user_name);
        next();    
    }    
}

exports.authorizeRoles = (roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role))
        {
            res.json({
                success:false,
                msg:'User Cannot Access This resource'
            })
        }

        else{
            next();
        }
        
    }
}