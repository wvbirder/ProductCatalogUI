'use strict';

var http = require('http');
var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 8085;
var app = express();

app.use(express.static('/pipeline/source/public'));

app.get('/', function (req, res) {
    // console.log('Request came into container: ' + process.env.OCCS_CONTAINER_NAME);
    if (req,hostname == "140.86.40.237") {
        console.log(req.hostname);
    }
    res.sendFile(path.join(__dirname + '/public/alpha.html'));
});

app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});
