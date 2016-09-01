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
            Answer.create({
                topic:   session.dialogData.lastQuestion.title,
                content: results.response
            })
        }

        var rank = session.dialogData.interviewRank || 0;

        Question.findOne({ 'rank': rank }).exec().then(function(question) {
            if (_.isEmpty(question)) {
                session.send("感谢您接受我们的专访");
                return session.endDialog();
            }
            session.dialogData.lastQuestion  = question;
            session.dialogData.interviewRank = rank + 1;
            builder.Prompts.text(session, `${res.title}`);
        });
    }));

    return bot;
}