var router = require('express').Router();
var webhook = require('../middleware/webhook');

router.route('/webhook')
    .post(webhook.post)
    .get(webhook.get);

module.exports = router;