const express = require('express')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
//controller
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/homePage')
const storeController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
//Middleware
const validateMiddleWare = require('./middleware/validationMiddleWare')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// register
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
// login
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
// logout
const logoutController = require('./controllers/logout')
// connect-flash
var flash = require('connect-flash');
app.use(flash());

// connect mongoose
mongoose.connect('mongodb+srv://huydevse040902:0336070648@myblog.1p508pu.mongodb.net/my_database', {useNewUrlParser: true});
 
// set EJS
app.set('view engine','ejs')
//Public
app.use(express.static('public'))
//  package body-parser --> handler req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// package express-fileupload --> handler image
const fileUpload = require('express-fileupload')
// const { error } = require('console')
app.use(fileUpload())
// handler MiddleWare file null 
app.use('/post/store',validateMiddleWare)
// express-session
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))
global.loggedIn = null;
app.use('*',(req,res,next) => {
    loggedIn = req.session.userId;
    next()
});
// 
app.get('/',homeController)
app.get('/post/new',authMiddleware,newPostController)
app.post('/post/store',authMiddleware,storeController)
app.get('/post/:id',getPostController)
//register
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)
// login
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
// logout   
app.get('/auth/logout',logoutController)
// Not found 404
app.use((req,res)=> {
    res.render('notfound')
})

// run server
app.listen(4000, () => {
    console.log("App listening on port 4000")
})