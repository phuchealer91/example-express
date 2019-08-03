// require file db.js
// var db = require('../db');
var Product = require('../models/product.model');
module.exports.index = async function(req,res){
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    var drop = (page - 1) * perPage;
//  (2-1)*8 = 8
// (3-1)*8 = 16
    // res.render('products/index',{ //gửi ra 1 list danh sách
    //     products: db.get('products').drop(drop).take(perPage).value(),
    //     page: page
    // });
    var productsPerPage = await Product.find(null,null,{skip: drop}).limit(perPage);
//    var products = await Product.find();
        res.render('products/index',{ //gửi ra 1 list danh sách
               products: productsPerPage,
               page: page
            });
};
