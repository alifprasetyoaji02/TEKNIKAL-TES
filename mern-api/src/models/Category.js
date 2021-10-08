const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({

    id: {
        type:Number,
    },
    name:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    image:{
        type:String,
        required:true,
        min:6,
        max:300
    }

},{
    timestamps : true   
})

module.exports = mongoose.model('Category',Category)
