var express = require('express');
var path = require('path');
var fsExtra = require('fs-extra');
var fs = require('fs');
var cors = require('cors');
var app = express();
var uploadFolderPath = __dirname + '\\uploads\\';
var bodyParser = require('body-parser');
global.appRoot = __dirname;


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/edit/:fileName', function (req, res) {
        res.sendFile(__dirname + '/editFile.html');
    }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use('/api', require('./routes/api/files'));
app.use(express.static(uploadFolderPath));
app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Working on port :' + port);
});
