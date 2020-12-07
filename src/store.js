const fs = require('fs');
const settings = require('../src/settings');

const readDbFromFile = () => {
    const settingsObject = settings.read();

    const dbAsBuffer = fs.readFileSync(settingsObject.db_file);
    const dbAsJson = dbAsBuffer.toString('utf-8');

    return JSON.parse(dbAsJson);
}

const readDb = () => {
    try {
        return readDbFromFile();
    } catch(e) {
        return {};
    }
}

const writeDb = (db) => {
    const settingsObject = settings.read();
    const content = JSON.stringify(db);

    fs.writeFileSync(settingsObject.db_file, content);
}

const read = (key) => {
    const db = readDb();
    return db[key];
}

const write = (key, value) => {
    const db = readDb();

    db[key] = value;
    writeDb(db);
}

module.exports = {
    read,
    write,
};
