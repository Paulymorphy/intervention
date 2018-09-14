var db = require('../core/db').get();

exports.get = function(req, res, next){
    db.all('SELECT * FROM users', function(result, err){
        if(err) return next(err);
        //res.status(200).send(result);
        console.log(result);
    });
};

exports.update = function(req, res, next){

};

exports.delete = function(req, res, next){

};

exports.auth = function(req, res, next){
    var user = process.env.ADMIN_USERNAME || "admin";
    var pass = process.env.ADMIN_PASSWORD || "admin";


    next();
};