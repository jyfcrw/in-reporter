const fs = require('fs');

module.exports = function() {
    if (fs.existsSync('./source.json')) {
        console.log('source file exist');
        
        data = require('./fixtures/source.json');
        console.log(data);
    } else {
        console.log('file not exist');
    }
}