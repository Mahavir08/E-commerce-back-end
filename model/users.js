const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    first_name : {
        type:String,
        required:[true, 'Please Enter Your First Name'],
        maxLength:[20 , 'First Name Cannot Exceed 20 Characters']
    },

    last_name : {
        type:String,
        required:[true, 'Please Enter Your Last Name'],
        maxLength:[20 , 'Last Name Cannot Exceed 20 Characters']
    },

    user_name : {
        type:String,
        required:[true, 'Please Enter Your User Name'],
        unique:[true,'User Name Must be Unique']
    },

    password:{
        type:String,
        required:[true,'Please Enter Your Password'],
        minLength:[8 , 'Password Must Have Atleast 8 Characters']
    },

    role:{
        type:String,
        default:'User'
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('User',userSchema);