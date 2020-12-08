const readSettings = require('./settings');
const get = require('./get');
const checksum = require('./checksum');
const store = require('./store')
const send = require("./send");

const spider = async () => {
    const settings = readSettings.read();
    const url = settings.url;

    const extendSite = (existingSite, newChecksum, newContent) => {
        return existingSite?.content && typeof existingSite.content !== 'string' ? {
            content: {
                ...existingSite.content,
                [newChecksum]: newContent,
            },
            checksum: newChecksum,
        } : {
            content: {
                [newChecksum]: newContent,
            },
            checksum: newChecksum,
        }
    }

    const checkSite = async () => {
        const content = await get(url);
        const newChecksum = checksum(content.trim());

        const existingSite = store.read(url);
        const newSite = extendSite(existingSite, newChecksum, content)

        return {
            newSite,
            existingSite,
        }
    }

    const check = async () => {
        const {newSite, existingSite} = await checkSite();

        const existingChecksum = existingSite?.checksum;
        const newChecksum = newSite.checksum;

        if(!(existingChecksum)) {
            console.log(`Checksum for ${url} created: ${newChecksum}`);
            store.write(url, newSite);
        }
        else if (existingChecksum !== newChecksum) {
            store.write(url, newSite);
            console.log(`Checksum for ${url} changed: ${existingChecksum} => ${newChecksum}`);

            send('Site updated!', `Checksum for ${url} changed: ${existingChecksum} => ${newChecksum}`)
        } else {
            console.log(`Checksum for ${url} unchanged: ${existingChecksum}`);
        }
    }

    await check();

    setInterval(async () =>{
        await check();
    }, settings.check_interval * 1000);
}

module.exports = spider;
