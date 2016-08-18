var _ = require('lodash'),
    glob = require('glob'),
    path = require('path');

module.exports = function(bot) {
    var models = _.reduce(glob.sync('./models/**/*.js'), function(obj, file) {
        const name = _.capitalize(_.camelCase(path.basename(file, '.js')));
        obj[name] = require(path.resolve(file));
        return obj;
    }, {});

    var dialogs = glob.sync('./dialogs/**/*.js');

    var middlewares = [];
    // Middlewares will be loaded in order
    // var middlewares = [
    //     "logger",
    //     "launch",
    //     "authorize"
    // ].map(function(name) {
    //     return path.join("./middlewares/", name + ".js");
    // });

    middlewares.concat(dialogs).forEach(function(file) {
        require(path.resolve(file)).call(_.assign(this, models), bot);
    });
};