var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');
var app = express();
var uploadFolderPath = './uploads';
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, uploadFolderPath);
  },

  filename: function(req, file, callback) {
    console.log('receive file :' + JSON.stringify(file));
    callback(null, file.originalname);
  },
});

fs.ensureDir(uploadFolderPath, function(err) {
  console.log(err); // => null
  // dir has now been created, including the directory it is to be placed in
});

var upload = multer({
  storage: storage,
}).single('uploadFile');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end('Error uploading file. Error: ' + err);
    }

    res.end('File is uploaded');
  });
});

app.use(express.static(path.join(__dirname, 'uploads')));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Working on port :' + port);
});
