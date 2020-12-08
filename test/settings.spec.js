const settings = require("../src/settings");

describe('settings.js', () => {
    it('should read settings from json', () => {
        const expected = {
            url: 'https://www.google.com/',
            check_interval: 10,
            db_file: '/var/local/md5spider/db.json',
        };

        expect(settings.read()).toMatchObject(expected)
    });
});
