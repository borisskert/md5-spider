const spider = require('./src/spider');

(function () {
    spider().then(md5 => console.log(md5));
})();
