var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');
var app = express();
var uploadFolderPath = './uploads';
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadFolderPath);
    },

    filename: function (req, file, callback) {
        console.log('receive file :' + JSON.stringify(file));
        callback(null, file.originalname);
    },
});

fs.ensureDir(uploadFolderPath, function (err) {
    console.log(err); // => null
    // dir has now been created, including the directory it is to be placed in
});

var maxSize = 5 * 1024 * 1024;
var upload = multer({
    storage: storage,
    limits: {fileSize: maxSize},
}).single('uploadFile');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end('Error uploading file. ' + err);
        }

        res.end('File is uploaded');
    });
});

app.get('/list', function (req, res) {
    var items = [];
    var reg = new RegExp(/uploads$/g);
    fs.walk(uploadFolderPath)
        .on('data', function (item) {
            if (!reg.test(item.path))
                items.push(item.path)
        })
        .on('end', function () {
            res.json(items) // => [ ... array of files]
        })
});

app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Working on port :' + port);
});
