var builder = require('botbuilder');

module.exports = function(bot) {

    var _s = "您可以与我对话，回答我提出的问题，" +
             "便可以在我们网站上创建出您的个人专访，" +
             "并能随时更改您专访.";

    bot.dialog("/welcome", function (session) {
        session.send(_s);
        session.endDialog();

        // Redirect to main dialog
        session.beginDialog("/");
    });

    return bot;
}