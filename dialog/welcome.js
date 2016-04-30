var builder = require('botbuilder');

module.exports = function(bot) {

    var _s = "您好，我是IN-01，" +
        "您可以通过与我对话，回答我提出的问题，" +
        "便可以在我们网站上创建出您的个人专访，" +
        "并能随时更改您的回答，马上开始对话吧！";

    bot.add("/welcome", function (session) {
        session.send(_s);
        session.endDialog();
    });

    return bot;
}