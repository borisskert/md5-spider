const https = require('https');
const get = require("../src/get");

describe('get', () => {
    describe('when "https://my-test-site.org" returns simple html', () => {
        const myTestSiteUrl = 'https://my-test-site.org';
        const siteContent = '<html><body><h1>It works!</h1></body></html>';

        beforeEach(() => {
            const httpsGetMock = jest.spyOn(https, 'get');
            httpsGetMock.mockImplementation(
                (url, callback) => {
                    if (url === myTestSiteUrl) {

                        callback({
                            statusCode: 200,
                            on: ((event, callback) => {
                                if (event === 'data') {
                                    return callback(Buffer.from(siteContent));
                                }
                            })
                        });
                    }
                })
        });

        it('should get site content from url', async () => {
            expect(await get(myTestSiteUrl)).toEqual(siteContent)
        });
    });
});
