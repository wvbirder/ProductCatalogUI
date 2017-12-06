'use strict';

var http = require('http');
var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 8085;
var app = express();

app.use(express.static('/pipeline/source/public'));

app.get('/', function (req, res) {
    // console.log('Request came into container: ' + process.env.OCCS_CONTAINER_NAME);
    res.sendFile(path.join(__dirname + '/public/alpha.html'));
    if (req.hostname == "140.86.40.237") {
        console.log("A request came into " + process.env.OCCS_CONTAINER_NAME + " from " + req.hostname);
    }
});

app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});
