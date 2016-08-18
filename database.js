var mongoose = require('mongoose');

module.exports = {
    connect: function() {
        mongoose.connect('mongodb://localhost/in-reporter', function(err) {
            if(err) {
                console.log('connection error', err);
            }
        });
    }
}