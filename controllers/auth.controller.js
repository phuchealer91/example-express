var md5 = require('md5');
// require file db.js
// var db = require('../db');
var User = require('../models/user.model');

// random id 
var shortid = require('shortid');




module.exports.login = function(req,res){
    res.render('auth/login');
};

module.exports.postLogin = async function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = await User.find({email: email});
    if(!user[0]){
        res.render('auth/login',{
           errors: [
               "User not found !"
           ],
           values: req.body
        });
        return;
    }
    var hashedPassword = md5(password);
    if(user[0].password !== hashedPassword){
        res.render('auth/login',{
            errors: [
                "Wrong password !"
            ],
            values: req.body
         });
         return;
    }
    res.cookie('userId', user[0].id,{
        signed:true
    });
    res.redirect('/users');
};