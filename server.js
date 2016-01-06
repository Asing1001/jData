var express = require("express");
var multer = require('multer');
var path = require('path');
var app = express();
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        console.log('receive file :' + JSON.stringify(file));
        callback(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
}).single('uploadFile');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file. Error: " + err);
        }
        res.end("File is uploaded");
    });
});

app.use(express.static(path.join(__dirname, 'uploads')));

app.listen(80, function() {
    console.log("Working on port 80");
});
