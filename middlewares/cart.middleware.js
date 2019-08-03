// var Session = require('../models/session.model');
// module.exports = async function(req,res,next){
//     var sessionId = req.signedCookies.sessionId;
//     if(!sessionId){
//         res.redirect('/products');
//         return;
//     }

//     // var session = await Session.findById(sessionId);
//     // var countCart = session.cart.length;
//     // res.locals.countCart = countCart;
//     var session = await Session.findById(sessionId);
//   res.locals.countCart = session.totalProduct ? session.totalProduct : 0;
//     next();

// }