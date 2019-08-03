// require file db.js
// var db = require('../db');
// random id 
// var Session = require('../models/session.model');
// var shortid = require('shortid');
// module.exports = async function(req,res,next){
    // if(!req.signedCookies.sessionId){
    //     var sessionId = shortid.generate();
    //     res.cookie('sessionId', sessionId,{
    //         signed:true
    //     });
    //     db.get('sessions').push({id: sessionId}).write();
    // }





    // if(!req.signedCookies.sessionId){
    //     await Session.create({
    //         cart: []
    //     });
    
    //     var items = await Session.find();
    // var sessionId = items[items.length-1]._id;
    // console.log(sessionId);
    // res.cookie('sessionId', sessionId,{
    //             signed:true
    //         });
    //     }





    // var sessionId = req.signedCookies.sessionId;
  
    // if (!sessionId) {
  
    //   var session = new Session;
    //   session.save();
    //   var sessionId = session._id;
  
    //   res.cookie('sessionId', sessionId, {
    //     signed: true
    //   });
    // }
    // var session = await Session.findById(sessionId);
    // var countCart = session.cart.length;
    // res.locals.countCart = countCart;
  
    // var sessionId = req.signedCookies.sessionId;
    // var countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value();
    // var countCart = Object.values(db.get("sessions").find({ id: sessionId }).get("cart").value());
    // var toltal = countCart.reduce(function(a,b){
    //   return a + b;  
    // });
    // res.locals.countCart= toltal;

//     next();
// };
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    var session = new Session;
    session.save();
    var sessionId = session._id;
    res.cookie('sessionId', sessionId, {
      signed: true
    });
  }

  var session = await Session.findById(sessionId);
  res.locals.countCart = session.totalProduct ? session.totalProduct : 0;
//   res.locals.delivery = req.signedCookies.deliveryId ? req.signedCookies.deliveryId : 0;
  // res.locals.user = user;
  next();
};