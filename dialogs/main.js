var builder = require('botbuilder');

module.exports = function(bot) {
    var basicMenu = {
        "自助访谈": {
            action: "NEW_INTERVIEW"
        },
        "我的访谈": {
            action: "MANAGE_INTERVIEW"
        }
    };


    bot.dialog('/', [
        // Authenticate user, register or login
        function (session) {
            session.beginDialog('/auth', session.userData.profile);
        },
        function (session, results) {
            session.userData.profile = results.response;
            builder.Prompts.choice(session, "请选择您需要的服务？", basicMenu);
        },
        function (session, results) {
            if (results.response) {
                session.send("您选择了%(entity)s", results.response);
            } else {
                session.send("抱歉，我没能理解您的话。");
            }
        }
    ]);

    return bot;
}

