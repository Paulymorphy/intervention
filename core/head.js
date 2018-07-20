var auth = require('./authentication');
var command = require('./command');
var response = require('./sender');
var log = require('./logger');

module.exports = function(message){
    message.forEach(function(user){
        auth(user.sender.id).then(function(sid){
            if(sid){
                user.systemID = sid;
                command(user, new response.Response(user.sender.id));
            }else{
                response.welcome(user);
            }
        }).catch(log.errorLog);
    });
};