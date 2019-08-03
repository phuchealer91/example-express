var express = require('express');
var multer  = require('multer');

var router = express.Router();

// body
var bodyParser = require('body-parser');
// require controller
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var upload = multer({ dest: './public/uploads/' });


router.get('/', controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/:id',controller.get);
router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controller.postCreate
);
router.get('/delete/:id',controller.delete);

router.get('/cookie',function(req,res,next){
    console.log(req.cookies);
});
module.exports = router;