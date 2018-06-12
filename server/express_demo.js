const express = require('express')
const query = require('./mysql_demo')
const path = require('path')

const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname,'../') +'/' + 'index.html');
});

router.get('/process_get', function (req, res) {
    var response = {
        'firstName': req.query.first_name,
        'lastName': req.query.last_name
    }
    console.log(response);
    res.end(JSON.stringify(response));
});

router.get('/getSysUser', function (req, res) {
    var sysUserId = req.query.sysUserId;
    var rs = query('select * from sys_user where sys_user_id = ?', sysUserId, function (err, result, fields) {
        res.send(result);
    });

});

module.exports = router;
