var express = require('express');
var router = express.Router();
// require controller
var controller = require('../controllers/cart.controller');

router.get('/add/:productId', controller.AddToCart);
module.exports = router;