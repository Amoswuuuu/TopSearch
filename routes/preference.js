var express = require('express');
var router = express.Router();
const getSubscriptionByName = require('../mongoose/operations/getSubscriptionByName')
const getDatabaseHotData = require('../mongoose/operations/getDatabaseHotData')
const getWebById = require('../mongoose/operations/getWebById')

/* GET home page. */
router.get('/:username', function (req, res) {
    let username = req.params.username
    start(username).then(result => res.send(result))
});

async function start(username) {
    let result = []
    // 获取用户订阅的网站
    let subWebs = await getSubscriptionByName(username)
    // 找到这些网站的前五条热点
    subWebs = subWebs.webs
    for (let web of subWebs) {
        let data = await getDatabaseHotData(web)
        data = data.slice(0, 5)
        data.push(await getWebById(data[0].webId))
        result.push(data)
    }
    return result
}


module.exports = router