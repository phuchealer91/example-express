var md5 = require('md5');

// require file db.js
var db = require('../db');
// random id 
var shortid = require('shortid');


module.exports.index = function(req,res){
    res.render('users/index',{ //gửi ra 1 list danh sách
        users: db.get('users').value()
    });
};

// Query params
module.exports.search = function(req,res){
    var q = req.query.q; //vì req.query -> {q:'th'} nên pải .q để lấy data từ object
    var matchedUsers = db.get('users').filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers  //render trả về lại kết quả tìm kiếm đc 
    });
};
// post method
module.exports.create = function(req,res){
    res.render('users/create');
};
// view user sd users/id
module.exports.get = function(req,res){
    var id = req.params.id; //id được lưu trong request .params để lấy id của user đó
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{
        user: user
    });
};
// trả lời khi nhận đc require create user 
module.exports.postCreate = function(req,res){
    req.body.password = md5(req.body.password);
    req.body.id = shortid.generate(); //tạo id ngẫu nhiên cho user (nếu để req.body thì nó ra object {name:.., id:...})
    db.get('users').push(req.body).write(); //lay data moi create luu vao data cua users (1)
    res.redirect('/users'); //tra ve trang users
};