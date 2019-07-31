var express = require('express');
var router = express.Router();

// body
var bodyParser = require('body-parser');
// require controller
var controller = require('../controllers/auth.controller');


router.get('/login', controller.login);
router.post('/login',controller.postLogin)
module.exports = router;