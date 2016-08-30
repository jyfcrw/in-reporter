var builder = require('botbuilder');

module.exports = function(bot) {

    bot.dialog('/interviews/create', new builder.SimpleDialog(function (session, results) {
        if (results && results.response) {
            if (results.response == "终止") {
                session.send("您终止了本次专访");
                return session.endDialog();
            }

            // save as Answer
            session.send(`您的回答是: ${results.response}`);
        }

        var rank = session.dialogData.interviewRank || 0;
        if (rank > 10) {
            session.send("感谢您接受我们的专访");
            return session.endDialog();
        }

        var question = Question.findOne({ 'rank': rank }, function(err, res) {
            session.dialogData.interviewRank = rank + 1;
            builder.Prompts.text(session, `${res.title}`);
        });
    }));

    return bot;
}