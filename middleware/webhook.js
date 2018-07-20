var main = require('../core/head');

exports.post = function(req, res, next){
    let body = req.body;
    if (body.object === 'page') {
        console.log('[WEBHOOK] Event Entry Receive!');
        let messages = [];
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry, index) {
            // Get the webhook event. entry.messaging is an array, but 
            // will only ever contain one event, so we get index 0
            messages.push(entry.messaging[0]);
            if(index == body.entry.length-1){
                main(messages);
            }
        });
        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

exports.get = function(req, res, next){
    var VERIFY_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    
    // Parse params from the webhook verification request
    var mode = req.query['hub.mode'];
    var token = req.query['hub.verify_token'];
    var challenge = req.query['hub.challenge'];
    
    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }
};