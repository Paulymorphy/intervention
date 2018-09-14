var router = require('express').Router();
var webhook = require('../middleware/webhook');
var admin = require('../middleware/admin');

router.route('/webhook')
    .post(webhook.post)
    .get(webhook.get);
    
router.route('/users').all(admin.auth)
    .get(admin.get)
    .put(admin.update)
    .delete(admin.delete);

module.exports = router;