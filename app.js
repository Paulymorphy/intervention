'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var route = require('./controller/router');

app.use(bodyParser.json());
app.use('/',route);

app.listen(process.env.PORT || 1337, function(){
    console.log('webhook is listening');
});