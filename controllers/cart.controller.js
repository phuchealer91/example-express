// var db = require('../db');
var Session = require('../models/session.model');
var Product = require('../models/product.model');

module.exports.AddToCart = async function(req,res,next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }

    // var count = db.get('sessions')
    //     .find({id: sessionId})
    //     .get('cart.' + productId,0)
    //     .value();
    // db.get('sessions')
    //     .find({id: sessionId})
    //     .set('cart.'+ productId, count + 1)
    //     .write();
    // var cart = await Session.find({_id: sessionId});
    // cart[0].cart.push(productId);
    // console.log(cart[0].cart);
    // await Session.updateOne({_id: sessionId},cart[0]);
    var product = await Product.findById(productId);

    // add product with productId
    Session.findOneAndUpdate({ _id: sessionId }, {  $inc: { totalProduct: 1 } }, {new: true }, function(err, doc) {
      for (let i = 0; i < doc.cart.length; i++) {
        if (doc.cart[i].productId == productId) {
          doc.cart[i].quanity += 1;
          doc.save();
          return;
        }
      }
  
      doc.cart.push({
        productId: productId,
        quanity: 1
      });
  
      doc.save();
    });
    res.redirect('/products');
  };