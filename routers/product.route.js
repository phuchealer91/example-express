var express = require('express');
var router = express.Router();
// require controller
var controller = require('../controllers/product.controller');
router.get('/', controller.index);
module.exports = router;