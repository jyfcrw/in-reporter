var _ = require('lodash'),
    glob = require('glob'),
    path = require('path'),
    builder = require('botbuilder');

var dialogs, models, middlewares;

dialogs = glob.sync('./dialogs/**/*.js');

models = _.reduce(glob.sync('./models/**/*.js'), function(obj, file) {
    const name = _.capitalize(_.camelCase(path.basename(file, '.js')));
    obj[name] = require(path.resolve(file));
    return obj;
}, {});

middlewares = _.reduce(glob.sync('./middlewares/**/*.js'), function(obj, file) {
    const name = _.camelCase(path.basename(file, '.js'));
    obj[name] = require(path.resolve(file));
    return obj;
}, {});

module.exports = function(bot) {
    // Use build-in and custom middlewares
    bot.use(builder.Middleware.sendTyping());
    bot.use(middlewares.logger());

    // Add dialogs with models in context
    dialogs.forEach(function(file) {
        require(path.resolve(file)).call(_.assign(this, models), bot);
    });
};