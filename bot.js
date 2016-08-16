var builder = require('botbuilder'),
    _ = require('lodash'),
    glob = require('glob'),
    path = require('path');

var config = require('./config');

debugger

var connector = new builder.ChatConnector({
    appId: config.app.appId,
    appPassword: config.app.appPassword
});

var bot = new builder.UniversalBot(connector);

var models = _.reduce(glob.sync('./models/**/*.js'), function(obj, file) {
    const name = _.capitalize(_.camelCase(path.basename(file, '.js')));
    obj[name] = require(path.resolve(file));
    return obj;
}, {});

var dialogs = glob.sync('./dialogs/**/*.js');

// Middlewares will be loaded in order
// var middlewares = [
//     "logger",
//     "launch",
//     "authorize"
// ].map(function(name) {
//     return path.join("./middlewares/", name + ".js");
// });

// middlewares.concat(dialogs).forEach(function(file) {
//     require(path.resolve(file)).call(_.assign(this, models), bot);
// });

module.exports = connector;