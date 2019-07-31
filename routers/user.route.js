var express = require('express');
var router = express.Router();

// body
var bodyParser = require('body-parser');
// require controller
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
router.get('/cookie',function(req,res,next){
    console.log(req.cookies);
});
router.get('/', controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/:id',controller.get);
router.post('/create',validate.postCreate, controller.postCreate);

module.exports = router;