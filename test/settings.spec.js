const settings = require("../src/settings");

describe('settings.js', () => {
    it('should read settings from json', async () => {
        const expected = {
            url: 'https://www.google.com/',
            check_interval: 10
        };

        expect(await settings.read()).toEqual(expected)
    });
});
