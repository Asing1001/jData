/**
 * Created by Andy on 2016/1/14.
 */
var fsExtra = require('fs-extra');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uploadFolderPath = global.appRoot + '\\uploads\\';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, uploadFolderPath);
    },

    filename: function(req, file, callback) {
        console.log('receive file :' + JSON.stringify(file));
        callback(null, file.originalname);
    },
});

fsExtra.ensureDir(uploadFolderPath, function(err) {
    if (err) {
        console.log(err);
    }
});

var maxSize = 5 * 1024 * 1024;
var upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize,
    },
}).single('uploadFile');

router.route('/files/:fileName')
    .get(function(req, res) {
        var filePath = uploadFolderPath + req.params.fileName;
        fs.access(filePath, fs.F_OK, function(err) {
            if (!err) {
                res.sendFile(filePath);
            } else {
                res.status(400).end('there is no such file!');
            }
        });
    })
    .put(function(req, res) {
        var filePath = uploadFolderPath + req.params.fileName;
        var content = req.body;
        fs.writeFile(filePath, content, 'utf8', function(err) {
            if (!err) {
                res.end('success edit!');
            } else {
                res.end('Error:' + err);
            }
        });
    })
    .delete(function(req, res) {
        var filePath = uploadFolderPath + req.params.fileName;
        var pwd = req.body.pwd;
        var canDelete = pwd === 'pass.123';
        if (canDelete) {
            fsExtra.remove(filePath, function(err) {
                if (!err) {
                    res.end('success delete file !');
                } else {
                    res.end('Error:' + err);
                }
            });
        } else {
            res.end('you cant use delete function!');
        }
    });

router.route('/files')
    .get(function(req, res) {
        var items = [];
        var reg = new RegExp(/uploads$/g);
        fsExtra.walk(uploadFolderPath)
            .on('data', function(item) {
                if (!reg.test(item.path))
                    items.push(item.path);
            })
            .on('end', function() {
                res.json(items); // => [ ... array of files]
            });
    })
    .post(function(req, res) {

        upload(req, res, function(err) {
            if (err) {
                return res.end('Error uploading file. ' + err);
            }

            res.end('File is uploaded');
        });
    });

module.exports = router;