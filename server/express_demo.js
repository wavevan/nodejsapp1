const express = require('express')
const query = require('./mysql_demo')
const path = require('path')
const fs = require("fs")
const multer = require('multer')
const upload = multer({ dest: '/tmp/' })
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '../') + '/' + 'index.html');
});

router.post('/process_get', function (req, res) {
    var response = {
        //get请求使用req.query.xxx取参数，post要添加body-parser组件
        'firstName': req.body.first_name,
        'lastName': req.body.last_name
    }
    console.log(response);
    res.send(JSON.stringify(response));
});

router.get('/getSysUser', function (req, res) {
    var sysUserId = req.query.sysUserId;
    var rs = query('select * from sys_user where sys_user_id = ?', sysUserId, function (err, result, fields) {
        res.send(result);
    });

});

router.get('/uploadPage', function (req, res) {
    res.sendFile(path.join(__dirname, '../') + '/' + 'upload.html');
})

router.post('/file_upload', upload.array('image'), function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.error(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.send(JSON.stringify(response));
        });
    });
})
module.exports = router;
