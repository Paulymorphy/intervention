var request = require('request');
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
    },function(err, res, body){
        if(err) return cb(err);
        cb(null);
    });
};