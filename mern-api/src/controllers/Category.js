const category = require('../models/Category')
const path = require('path')
const fs = require('fs')

exports.getAllCategory = (req, res, next) => {

    category.find().then(result => {
        
        res.status(201).json({
            message:'Data berhasil diperoleh',
            data:result
        })
    })
    .catch(err => {
        console.log(err)

        res.status(201).json({
            message:'Data tidak ditemukan',
            data:null
        })
    })
}

exports.createCategory = (req, res, next) => {
    
    if(!req.file){
        const err = new Error('Image harus diupload');
        throw err;
    }

    const name = req.body.name
    const image = req.file.path

    category.count().then(counts => {

        const createCategory = new category({
            image:image,
            id:counts+1,
            name:name
        })

        createCategory.save().then(result => {
            res.status(201).json({
                message: 'Berhasil tambah kategory',
                data:result
            })
        })
        .catch(err => {
            console.log(err)
            next()
        })

    })
}

exports.deleteCategory = (req, res, next) => {
    
    const id = req.body.id

    console.log(id)

    category.findById(id).then(result => {
        if(result){
            clearImage(result.image)
            category.deleteOne({_id:id}).then(results => {
            
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

exports.updateCategory = (req, res, next) => {

    // if(!req.file){
    //     const err = new Error('Image harus diupload');
    //     throw err;
    // }

    const name = req.body.name
    const image = req.file.path
    const id = req.body.id

    category.findById(id).then(post => {
        
        if(!post){
            res.status(401).json({
                message:'Data tidak ditemukan',
                data:null
            })
        }

        post.name = name
        post.image = image

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
    })
}

const clearImage = (filePath) => {
    console.log('Path : ',filePath)
    console.log('Direktori:',__dirname)
    
    filePath = path.join(__dirname,'../..',filePath)
    fs.unlink(filePath, err => console.log(err))
}

exports.getCategoryById = (req, res, next) => {
    category.findById(req.params.postId)
    .then(result => {
        if(!result){
            const error = new Error('Category tidak ditemukan')
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