var request = require('request');
var log = require('./logger');
var url = "https://graph.facebook.com/v2.6/me/messages?access_token=" + process.env.PAGE_ACCESS_TOKEN;

exports.reply = function(pid, message, cb){
    var messageObj = {
        message_type: "RESPONSE",
        recipient: {
            id: pid,
        },
        message: {
            text: message,
        },
    };

    request({
        url: url,
        method: "POST",
        body: messageObj,
        json: true
    },function(err, res, body){
        if(err) return cb(err);
        cb(null);
    });
};

exports.welcome = function(user){
    let message = "Welcome to Intervention! Seems like you are new. Wanna talk to someone now?\nJust type CHAT NOW and we will connect you to someone.";
    exports.reply(user.sender.id, message, function(err){
        if(err) return log.errorLog(err);
    });
};

exports.Response = function(pid){
    var senderID = pid;
    var api = url;
    this.send = function(message){
        var messageObj = {
            message_type: "RESPONSE",
            recipient: {
                id: senderID,
            },
            message: {
                text: message,
            },
        };
        request({
            url: api,
            method: "POST",
            body: messageObj,
        },function(err, res, body){
            if(err) return console.error(err);
        });
    };
};