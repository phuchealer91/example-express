var express = require('express');
var app = express();
var port = 5000;
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
// middleware auth
var authMiddleware = require('./middlewares/auth.middleware');

// template engine
app.set('view engine', 'pug')
app.set('views','./views')
// cookie
app.use(cookieParser('ahfbahsfbarwefad23'));
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
app.use('/users',authMiddleware.requireAuth,userRouter);
app.use('/auth',authRouter);
app.listen(port,function(){
    console.log('Start Server '+ port);
});
// Note
// - Route parameters 