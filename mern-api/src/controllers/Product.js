const product = require('../models/Product')
const path = require('path')
const fs = require('fs')

exports.getAllProducts = (req, res, next) => {
    product.find().then(result => {
        res.status(201).json({
            message:'Data Product diperoleh',
            data: result
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.createProducts = (req, res, next) => {

    if(!req.file){
        const err = new Error('Image harus diupload');
        throw err;
    }

    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const image = req.file.path

    product.count().then(counts =>{

        const createProduct = new product({

            id:counts+1,
            title:title,
            price:price,
            description:description,
            category:category,
            image:image,
        })
    
        console.log(createProduct);
    
        createProduct.save().then(result => {
            res.status(201).json({
                message:'Berhasil tambah product',
                data:result
            })
        })
        .catch(err => {
            console.log(err)
        })

    });
}

exports.updateProduct = (req, res, next) => {


    // if(!req.file){
    //     const err = new Error('Image harus diupload');
    //     throw err;
    // }

    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const image = req.file.path
    const id = req.body.id

    console.log(title)

    product.findById(id).then(post => {
        
        if(!post){
            res.status(401).json({
                message:'Data tidak ditemukan',
                data:null
            })
        }

        post.title = title
        post.price = price
        post.description = description
        post.category = category
        if(req.file){
            post.image = image
        }

        return post.save()
    })
    .then(result => {
        res.status(201).json({
            message:'Data berhasil diupdate',
            data:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({
            message:'Data tidak ditemukan',
            data:null
        })
        next()
    })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.body.id

    console.log(id)

    product.findById(id).then(result => {
        if(result){
            clearImage(result.image)
            product.deleteOne({_id:id}).then(results => {
                res.status(401).json({
                    message:'Data berhasil dihapus',
                    data:results
                })
            })        
        } else{
            res.status(401).json({
                message:'Data tidak ditemukan',
                data:null
            })
        } 
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({
            message:'Data tidak ditemukan',
            data:null 
        })
    })
}

const clearImage = (filePath) => {
    console.log('Path : ',filePath)
    console.log('Direktori:',__dirname)
    
    filePath = path.join(__dirname,'../..',filePath)
    fs.unlink(filePath, err => console.log(err))
}


exports.getProductById = (req, res, next) => {
    product.findById(req.params.postId)
    .then(result => {
        if(!result){
            const error = new Error('Product tidak ditemukan')
            error.errorStatus = 404
            throw error
        }

        res.status(200).json({
            message:'Data Berhasil ditemukan',
            data:result
        })

    })
    .catch(err => {
        next(err)
    }) 
}