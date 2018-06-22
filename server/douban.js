const express = require('express')
const request = require('request')

const router = express.Router();

router.get('/v2/*', (req, res) => {
    let url = `https://api.douban.com/v2/${req.params[0]}`;
    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            res.send(JSON.parse(body));
        } else {
            console.error(`[request url err] - ${err ? err.message : response.statusCode}`);
            res.end();
        }
    })
})

module.exports = router;