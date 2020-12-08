const https = require('https');

const get = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk.toString('utf8');
            });

            res.on('end', () => {
                resolve(data);
            });

            res.on('error', (e) => {
                reject(e);
            });
        });
    });
};

module.exports = get;
