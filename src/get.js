const https = require('https');

const get = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.on('data', (d) => {
                resolve(d.toString());
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
};

module.exports = get;
