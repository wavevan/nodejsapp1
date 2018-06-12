const express = require('express')
const demo = require('./express_demo')
const douban = require('./douban')

const app = express();

app.use('/static', express.static('static'));
/**
 * 全局设置
 */
app.all('*', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/demo', demo);

app.use('/doubanApi', douban);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('访问的地址为 http://%s:%s', host, port);
})