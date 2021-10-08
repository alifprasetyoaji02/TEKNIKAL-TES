const express = require('express');
const authRoutes = require('./src/routes/Auth');
const productRoutes = require('./src/routes/Product')
const categoryRoutes = require('./src/routes/Category')
const cartRoutes = require('./src/routes/Cart')
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path')

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'images')
    },
    filename:(req, file, cb) => {
        cb(null, new Date().getTime()+'-'+file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        cb(null,true)
    } else{
        cb(null,false)
    }
}


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname,'images')))
app.use(multer({storage:fileStorage, fileFilter:fileFilter}).single('image'));
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next()
})
app.use('/v1/auth',authRoutes); 
app.use('/v1/category',categoryRoutes)
app.use('/v1/products',productRoutes);
app.use('/v1/cart',cartRoutes);
app.get('/', function (req, res) {
    res.send('Hello World!')
});


mongoose.connect('mongodb+srv://alifprasetyoaji:nM3xlesfz5zpPVzn@cluster0.oqyfw.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>{
    app.listen(4000,console.log('sukses koneksi database mongoodb'));
})