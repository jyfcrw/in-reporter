var builder = require('botbuilder');

module.exports = function(bot) {
    var _s = "首先，我需要通过几个简单的问题来确定您的身份。\r\n\r\n";

    bot.dialog('/auth', [
        function (session, args, next) {
            session.dialogData.profile = args || {};

            if (!session.dialogData.profile.name) {
                session.send(_s);
                builder.Prompts.text(session, "请问，您的真实姓名？");
            } else {
                next();
            }
        },
        function (session, results, next) {
            if (results.response) {
                session.dialogData.profile.name = results.response;
            }

            if (!session.dialogData.profile.sex) {
                builder.Prompts.choice(session, "我该称呼您先生还是女士？", ["先生", "女士"]);
            } else {
                next();
            }
        },
        function (session, results, next) {
            if (results.response) {
                session.dialogData.profile.sex = results.response.entity;
            }

            if (!session.dialogData.profile.phone) {
                builder.Prompts.text(session, "您的手机号码是？");
            } else {
                next();
            }
        },
        function (session, results) {
            if (results.response) {
                session.dialogData.profile.phone = results.response;
            }

            session.endDialogWithResult({ response: session.dialogData.profile });
        }
    ]);

    return bot;
}
