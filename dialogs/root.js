var builder = require('botbuilder');

module.exports = function(bot) {
    var dialog = new builder.CommandDialog();

    dialog.matches('^回应', [
        function (session) {
            builder.Prompts.text(session, "您想问说什么呢？");
        },
        function (session, results) {
            if (results.response) {
                session.send("好的 %s", results.response);
            } else {
                session.send("好的");
            }
        }
    ]).matches('^重新登陆',
        '/login'
    ).onBegin(
        builder.DialogAction.send("您好，我是记者机器人IN-01，以下是我提供的服务？")
    ).onDefault(
        builder.DialogAction.send("抱歉，我没能理解您的话。")
    );

    bot.add('/', dialog);

    return bot;
}