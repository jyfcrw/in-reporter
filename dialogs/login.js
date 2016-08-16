var builder = require('botbuilder');

module.exports = function(bot) {
    var _s = "首先，我需要通过几个简单的问题来确定您的身份。\r\n\r\n";

    bot.dialog('/login', [
        function (session) {
            builder.Prompts.text(session, _s + "请您告诉我，您的姓名？仅回答全名，如“马云”");
            session.userData.loginData = {};
        },
        function (session, results) {
            session.userData.loginData.name = results.response;
            builder.Prompts.choice(session, "我该称呼您先生还是女士？", ["先生", "女士"]);
        },
        function (session, results) {
            session.userData.loginData.sex = results.response;
            builder.Prompts.text(session, "您的手机号码是？");
        },
        function (session, results) {
            session.userData.loginData.phone = results.response;
            // do login
            delete session.userData.loginData;
            session.userData.userToken = 100000;

            session.replaceDialog('/');
        }
    ]);
}
