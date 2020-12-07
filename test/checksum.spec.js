const checksum = require("../src/checksum");

describe('checksum', () => {
    it('should create MD5 checksum', () => {
        expect(checksum('ABC')).toEqual('902fbdd2b1df0c4f70b4a5d23525e932');
    });
});
