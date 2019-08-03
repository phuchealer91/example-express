var md5 = require('md5');
// require file db.js
// var db = require('../db');
var User = require('../models/user.model');
// random id 
// var shortid = require('shortid');


module.exports.index = async function(req,res){
    var users = await User.find();
    res.render('users/index',{ //gửi ra 1 list danh sách
        users: users
    });
};

// Query params
module.exports.search = async function(req,res){
    var q = req.query.q; //vì req.query -> {q:'th'} nên pải .q để lấy data từ object
    var users = await User.find();
    var matchedUsers = users.filter(function(user){
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
module.exports.get = async function(req,res){
    var id = req.params.id; //id được lưu trong request .params để lấy id của user đó
    var users = await User.find({_id: id});
    res.render('users/view',{
        users: users[0]
    });
};
// trả lời khi nhận đc require create user 
module.exports.postCreate = async function(req,res){
    req.body.password = md5(req.body.password);
    // req.body.id = shortid.generate(); //tạo id ngẫu nhiên cho user (nếu để req.body thì nó ra object {name:.., id:...})
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    await User.create(req.body); //lay data moi create luu vao data cua users (1)
    res.redirect('/users'); //tra ve trang users
};

// module.exports.delete = async function(req,res){
//         var id = req.params.id;
//         var users = await User.find({_id: id});
//         users[0].remove()
//           .then(item => {
//             res.redirect('/')
//           })
//           .catch(err => {
//             res.status(400).send("Unable to save to database");
//           })
    
// };
module.exports.delete = async function(req,res){
    var id = req.params.id;
    await User.deleteOne({_id: id}, (err, result) => {
    if (err) return res.send(500, err)
    res.redirect('/users');
    });

};
