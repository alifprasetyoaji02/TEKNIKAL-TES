const bcrypt = require('bcrypt')
const cart = require('../models/Cart')

exports.insertCart = (req, res, next) =>{

    const userId = req.body.userId
    const date = req.body.date

    const products = req.body.products
  
    console.log(JSON.parse(products))

    cart.count().then(counts =>{

        const addCart = new cart({

            id:counts+1,
            userId:userId,
            date:date,
            products:JSON.parse(products),

        })
    
        console.log(addCart);
    
        addCart.save().then(result => {
            res.status(201).json({
                message:'Berhasil tambah product ke cart',
                data:result
            })
        })
        .catch(err => {
            console.log(err)
        })

    });

}

exports.getCartByUserId = (req, res, next) => {

    const userId = req.body.userId

    cart.find({userId:userId}).then(result => { 
        res.status(201).json({
            message:'Data berhasil diperoleh',
            data:result
        })
    }) 
    .catch(err => {
        res.status(201).json({
            message:'Data tidak ditemukan',
            data:null
        })
    })
}