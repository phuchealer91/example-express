// var db = require('../db');
var User = require('../models/user.model');

module.exports.requireAuth = async function(req,res,next){
    // console.log(req.cookies, req.signedCookies);
    if(!req.signedCookies.userId){
        res.render('auth/login');
        return;
    }
    var user = await User.find({_id: req.signedCookies.userId});
    if(!user[0]){
        res.render('auth/login');
        return;
    }
    res.locals.user = user[0];
    next();
};