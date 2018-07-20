'use strict';

var express = require('express');
var app = express();
var db = require('./core/db');
var bodyParser = require('body-parser');

var route = require('./controller/router');

app.use(bodyParser.json());
app.use(require('express-promise')());
app.use('/',route);

db.open(function(err){
    if(err){
        console.error(err);
        process.exit(1);
    }else{
        app.listen(process.env.PORT || 1337, function(errr){
            if(errr) return process.exit(1);
            console.log('webhook is listening');
        });
    }
});