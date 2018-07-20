var auth = require('./authentication');
var command = require('./command');
var response = require('./sender');
var log = require('./logger');

module.exports = function(message){
    console.log('[SERVER] message arrive!');
    message.forEach(function(user){
        auth(user.sender.id).then(function(sid){
            if(sid){
                user.systemID = sid;
                response.reply(user.sender.id, "Intervention is Currently on Development!", function(err){
                  if(err) return log.erroLog(err);
                });
                //command(user, new response.Response(user.sender.id));
            }else{
                response.welcome(user);
            }
        }).catch(log.errorLog);
    });
};