const cheerio = require('cheerio');


// 获取热搜
function getData(html) {
    let hotTitle = [];
    let $ = cheerio.load(html.text);
    $('.rank-item').find('.content').find('.info').each((index, element) => {
        let content = $(element).find('a')
        let infoURL = 'https:' + content.attr('href')
        let infoContent = content.text()
        let hot = {
            infoContent,
            infoURL,
        }
        hotTitle.push(hot);
    })
    return hotTitle;
}

module.exports = getData;