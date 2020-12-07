const readSettings = require('./settings');
const get = require('./get');
const checksum = require('./checksum');
const store = require('./store')
const send = require("./send");

const spider = () => {
    const settings = readSettings.read();
    const url = settings.url;

    const checkSite = () => {
        const content = get(url);
        const newChecksum = checksum(content);

        const existingChecksum = store.read(url);

        return {
            newChecksum,
            existingChecksum
        }
    }

    const check = () => {
        const {newChecksum, existingChecksum} = checkSite();

        if(!(existingChecksum)) {
            console.log(`Checksum for ${url} created: ${newChecksum}`);
            store.write(url, newChecksum);
        }
        else if (existingChecksum !== newChecksum) {
            store.write(url, newChecksum);

            send('Site updated!', `Checksum for ${url} changed: ${existingChecksum} => ${newChecksum}`)
        } else {
            console.log(`Checksum for ${url} unchanged: ${existingChecksum}`);
        }
    }

    check();

    setInterval(() =>{
        check();
    }, settings.check_interval * 1000);
}

module.exports = spider;
