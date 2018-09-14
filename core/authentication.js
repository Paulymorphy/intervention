var db = require('./db').get();

let checkUser = function(pid){
    return new Promise(function(fulfill,reject){
        db.all("SELECT id, sid FROM users WHERE pid = '" + pid + "'",function(err,row){
            if(err) return reject(err);
            if(row.length > 0){
                fulfill(row[0].sid);
            }else{
                let stmt = db.prepare("INSERT INTO users (pid,sid) values(?,?)");
                stmt.run(pid,"0");
                stmt.finalize(err=>{
                    if(err) return reject(err);
                    fulfill(null);
                });
            }
        });
    });
}

module.exports = function(pid){
    return new Promise(function(fulfill, reject){
        checkUser(pid).then(function(sid){
            fulfill(sid);
        }).catch(reject);
    });
}