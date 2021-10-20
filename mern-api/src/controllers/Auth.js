
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const privateKey = "$2b$10$ehug.w.4asdasEHnmtyj394rZUugasdasd/1231y8jyBasdasdjQM1Kz/HWhfdow/x/T012p1cW"

exports.register = (req, res, next) => {

    const lat = req.body.lat
    const long = req.body.long
    const city = req.body.city
    const street = req.body.street
    const number = req.body.number
    const zipcode = req.body.zipcode
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const phone = req.body.phone

    User.count().then(counts => {

        const createUser = new User({
            address:{
                geolocation:{
                    lat:lat,
                    long:long
                },
                city:city,
                street:street,
                number:number,
                zipcode:zipcode
            },
            name:{
                firstname:firstname,
                lastname:lastname
            },
            id:counts+1,
            email:email,
            username:username,
            password:password,
            phone:phone
        })

        createUser.save().then(result => {
            res.status(201).json({
                message:'Berhasil tambah user',
                data:result
            })
        })
        .then(err => {
            console.log(err)
            res.status(401).json({
                message:'Gagal tambah user',
                data:null
            })
        })
    })
   
}

exports.getAllUser = (req, res, next) => {
    User.find()
    .then(result => {
        res.status(200).json({
            message:'Data berhasil diperoleh',
            data: result
        })
        
    })
    .catch(err => {
        next(err)
    })
}

exports.login = (req, res, next) => {

    const email = req.body.email;
    const pass  = req.body.password;

    console.log(req.body.email)

    User.findOne({email:email})
    .then(result => {

        const validpassword = result.password;
        
        if(validpassword !== pass){
            res.status(401).json({
                message:'password tidak valid',
                data:null
            })
        } else{
            
            var token = jwt.sign({
                data:result
            }, privateKey)

            res.status(200).json({
                message: 'Login Berhasil',
                data: result,
                token:token
            })
        }
    }).catch(err => {
        res.status(401).json({
            message:'Email tidak terdaftar',
            data: null
        })
    })
}