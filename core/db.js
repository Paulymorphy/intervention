var sqlite3 = require('sqlite3').verbose();
var dbname = process.env.DB_NAME || "./.data/intervention.db";
var exist = require('fs').existsSync(dbname);  
var database = new sqlite3.Database(dbname);

exports.open = function(cb){
    database.serialize(function(){
        if(!exist){
            let sql = "CREATE TABLE users ("+
            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "pid TEXT NOT NULL," +
            "sid TEXT NOT NULL" +
            ")";
            database.run(sql, function(err){
                if(err) return cb(err);
                cb(null);
            });
        }else{
            cb(null);
        }
    });
};

exports.get = function(){
    return database;
};