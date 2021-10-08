const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    
    address:{
        geolocation:{
            lat:{
                type:String,
                require:false,
                min:6,
                max:256
            },
            long:{
                type:String,
                require:false,
                min:6,
                max:256
            }
        },
        city:{
            type:String,
            required:false,
            min:6,
            max:256
        },
        street:{
            type:String,
            required:false,
            min:6,
            max:256
        },
        number:{
            type:Number,
            required:false,
        },
        zipcode:{
            type:String,
            required:false,
            min:6,
            max:256
        }
    },
    id: {
        type:Number,
    },
    email: {
        type:String,
        required: true,
        min:6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    username: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    name:{
        firstName: {
            type:String,
            required:false,
            min:6,
            max:256
        },
        lastName: {
            type:String,
            required:false,
            min:6,
            max:256
        }
    },
    phone: {
        type: String,
        required: false,
        min:6,
        max:255
    }
},{
    timestamps : true   
})

module.exports = mongoose.model('User',User)