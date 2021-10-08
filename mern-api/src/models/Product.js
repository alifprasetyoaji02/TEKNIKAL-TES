const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Product = new Schema({
    
    id: {
        type:Number,
    },
    title:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps : true   
})

module.exports = mongoose.model('Product',Product)
