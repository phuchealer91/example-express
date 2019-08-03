require('dotenv').config();
// console.log(process.env.SESSION_SECRET);
var express = require('express');
var app = express();
var port = 5000;
// mongoses 
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// body
var bodyParser = require('body-parser');
// cookie
var cookieParser = require('cookie-parser');
var pug = require('pug');
// require file db.js
var db = require('./db');
// require tu router
var userRouter = require('./routers/user.route');
var authRouter = require('./routers/auth.route');
var productRouter = require('./routers/product.route');
var cartRouter = require('./routers/cart.route');
// middleware auth
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
// var cartMiddleware = require('./middlewares/cart.middleware');
// template engine
app.set('view engine', 'pug')
app.set('views','./views')
// cookie
app.use(cookieParser(process.env.SESSION_SECRET));
// require
app.get('/',function(req,res){
    res.render('index',{
        name: 'Phuc'
    });
});
// static file
app.use(express.static('public'));
// modules của body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use tung cai router
// app.use(cartMiddleware);
app.use(sessionMiddleware);
app.use('/users',authMiddleware.requireAuth,userRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);

app.listen(port,function(){
    console.log('Start Server '+ port);
});
// Note
// - Route parameters 