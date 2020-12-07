const md5 = require("md5");

const checksum = (text) => {
    return md5(text);
}

module.exports = checksum;
