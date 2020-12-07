const store = require('../src/store');

const fs = require('fs');
jest.mock('fs');
const settings = require('../src/settings');
jest.mock('../src/settings');

describe('store', () => {
    let dbFilename;

    beforeEach(() => {
        const timestamp = new Date().getTime();
        dbFilename = `.db-${timestamp}.json`;

        settings.read.mockImplementation(() => ({
            db_file: dbFilename
        }));
    });

    describe('when db not found', () => {
        beforeEach(() => {
            fs.readFileSync.mockImplementation((filename) => {
                if(filename === dbFilename){
                    throw new Error(`ENOENT: no such file or directory, open '${dbFilename}'`);
                }

                throw new Error(`Should not have been called`);
            });
        });

        it('should not find an entry', () => {
            let readValue = store.read('any key');
            expect(readValue).toBeUndefined();
        });

        describe('when write to db', () => {
            let expectedValue = 'my value';

            beforeEach(() => {
                jest.spyOn(fs, 'writeFileSync');

                store.write('key', expectedValue)
            });

            it('should write to filesystem', () => {
                expect(fs.writeFileSync).toHaveBeenCalledWith(dbFilename, '{"key":"my value"}')
            });
        });
    });

    describe('when db has been found', () => {
        const key = 'https://duckduckgo.com';
        const value = '232cea3b5ff4c4b23bcdbb68e20e9edde';

        const foundDb = {
            'https://www.google.com': '208b6107bf7cdf86b8e23ebeb025846a',
            [key]: value,
        };

        beforeEach(() => {
            const fsReadMock = jest.spyOn(fs, 'readFileSync');
            fsReadMock.mockImplementation(() => {
                const dbAsJson = JSON.stringify(foundDb);
                return Buffer.from(dbAsJson);
            });

            jest.spyOn(fs, 'writeFile');
        });

        it('should find an entry', () => {
            const readValue = store.read(key);

            expect(readValue).toEqual(value);
        });
    });
});
