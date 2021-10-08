const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({

    id:{
        type:Number,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:false
    },
    products:{
        type:Array,
        required:false
    }
},{
    timestamps : true   
})

module.exports = mongoose.model('Cart',Cart)

