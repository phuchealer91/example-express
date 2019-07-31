
module.exports.postCreate = function(req,res,next){
    var errors = [];
    if(!req.body.name){
        errors.push('No Name !');
    }
    if(!req.body.phone){
        errors.push('No Phone !');
    }
    if(errors.length){ //neu nhu errors co loi thi se ko luu o (1)
        res.render('users/create',{
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}

