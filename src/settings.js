const fs = require('fs');

const filename = 'settings.json';

const read = () => {
    const buffer = fs.readFileSync(filename);
    const content = buffer.toString('utf-8');
    return JSON.parse(content);
}

module.exports = {
    read
};
