const settings = require("./settings");
const get = require("./get");
const checksum = require("./checksum");

const doIt = async () => {
    return await settings.read().then(settings => {
        return get(settings.url);
    }).then(content => {
        return checksum(content);
    });
}

module.exports = doIt;
