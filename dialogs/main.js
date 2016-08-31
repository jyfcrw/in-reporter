var builder = require('botbuilder');

module.exports = function(bot) {
    var basicMenu = {
        "自助访谈": {
            action: "/interviews/create"
        },
        "我的访谈": {
            action: "/interviews/manage"
        }
    };


    bot.dialog('/', [
        function (session) {
            // Authenticate user, register or login for each time
            session.beginDialog("/auth", session.userData.profile);
        },
        function (session, results) {
            session.userData.profile = results.response;
            builder.Prompts.choice(session, "请选择您需要的服务？", basicMenu);
        },
        function (session, results) {
            if (results && results.response) {
                var entity = results.response.entity,
                    option = basicMenu[entity];

                session.send(`您选择了${entity}`);
                session.beginDialog(option.action);
            } else {
                session.send("抱歉，我没能理解您的话。");
            }
        }
    ]);

    return bot;
}

