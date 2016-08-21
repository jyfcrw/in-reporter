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
    builder.Prompts.defaultRetryPrompt = {
        text: "抱歉，我没能理解您的话。请您再试一次。",
        number: "您的输入不是数字，请您输入数字。",
        confirm: "抱歉，我没能理解您的话，请您输入\"是\"或者\"不是\"。",
        choice: "抱歉，我没能理解您的话，请您输入选项的数字或者文字。",
        time: "抱歉，我没能识别您输入的时间，请您再试一次。",
        attachment: "抱歉，我没能成功接收文件，请您再试一次。"
    };

    // Use build-in and custom middlewares
    bot.use(builder.Middleware.sendTyping());
    bot.use(builder.Middleware.firstRun({
        version: 1.0,
        dialogId: "*:Welcome"
    }));
    bot.use(middlewares.logger());

    // Add dialogs with models in context
    dialogs.forEach(function(file) {
        require(path.resolve(file)).call(_.assign(this, models), bot);
    });
};