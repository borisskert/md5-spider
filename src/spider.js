const readSettings = require('./settings');
const get = require('./get');
const checksum = require('./checksum');
const store = require('./store')
const send = require("./send");

const spider = () => {
    const settings = readSettings.read();
    const url = settings.url;

    const checkSite = async () => {
        const content = await get(url);
        const newChecksum = checksum(content.trim());

        const existingChecksum = store.read(url);

        return {
            newChecksum,
            existingChecksum
        }
    }

    const check = async () => {
        const {newChecksum, existingChecksum} = await checkSite();

        if(!(existingChecksum)) {
            console.log(`Checksum for ${url} created: ${newChecksum}`);
            store.write(url, newChecksum);
        }
        else if (existingChecksum !== newChecksum) {
            store.write(url, newChecksum);
            console.log(`Checksum for ${url} changed: ${existingChecksum} => ${newChecksum}`);

            send('Site updated!', `Checksum for ${url} changed: ${existingChecksum} => ${newChecksum}`)
        } else {
            console.log(`Checksum for ${url} unchanged: ${existingChecksum}`);
        }
    }

    check();

    setInterval(async () =>{
        await check();
    }, settings.check_interval * 1000);
}

module.exports = spider;
