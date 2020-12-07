const fs = require('fs');

const filename = 'settings.json';

const readAsPromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (error, data) => {
            if(error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

const read = async () => {
    const content = await readAsPromise(filename);
    return JSON.parse(content);
}

module.exports = {
    read
};
