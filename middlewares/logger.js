var colors = require('colors');

module.exports = function () {
    return {
        botbuilder: function (session, next) {
            console.log(colors.green(`----------- SESSION -----------`));
            console.log(session);
            console.log(colors.green(`-------------------------------`));
            next();
        }
    }
}
