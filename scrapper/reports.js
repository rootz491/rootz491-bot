const cheerio = require('cheerio');
const request = require('request-promise');

module.exports = () => {
    request('http://h1.nobbd.de', (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const today = new Date().getDate();
            const $ = cheerio.load(html);
            const reports = [];
    
            const reportsNode = $('#reports-all').children();
            reportsNode.each((i, data) => {
                const report = $(data);
                const date = report.find('.date').text();
                if (date.split(" ")[0] != today) return;
                const reportData = $(data).children();
                const program = reportData.find('.company').text();
                const title = reportData.find('.title').text();
                const link = reportData.find('.title').attr('href');
                reports.push({
                    program,
                    title,
                    link,
                    date
                })
            });

            return reports;
        } else {
            console.log('error', error);
            return [];
        }
    });
}
