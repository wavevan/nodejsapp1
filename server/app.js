const express = require('express')
const bodyParser = require('body-parser')
const demo = require('./express_demo')
const douban = require('./douban')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('static'));

app.use('/demo', demo);

app.use('/doubanApi', douban);

let server = app.listen(8080, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`访问的地址为 http://${host}${port}`);
})