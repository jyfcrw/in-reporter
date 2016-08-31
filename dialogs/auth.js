var _ = require('lodash'),
    builder = require('botbuilder');


module.exports = function(bot) {

    bot.dialog('/auth/name', [
        function (session, args) {
            var msg = "请问您的真实姓名？（如：马化腾）",
                rep = "您的姓名将被用于访谈，请认真填写，您的姓名是？";

            builder.Prompts.text(session, args && args.reprompt ? rep : msg);
        },
        function (session, results) {
            var name = results.response;
            if (name.length >= 2 && name.length <= 4 ) {
                session.endDialogWithResult({ response: name });
            } else {
                session.replaceDialog('/auth/name', { reprompt: true });
            }
        }
    ]);

    bot.dialog('/auth/phone', [
        function (session, args) {
            var msg = "请问您正在使用的手机号码？（如：15010080025）",
                rep = "请您回答有效的手机号，我们将发送短信验证码到您的手机上？";

            builder.Prompts.text(session, args && args.reprompt ? rep : msg);
        },
        function (session, results) {
            var matched = results.response.match(/\d+/g);
            var number = matched ? matched.join('') : '';
            if (number.length == 11) {
                session.endDialogWithResult({ response: number });
            } else {
                session.replaceDialog('/auth/phone', { reprompt: true });
            }
        }
    ]);

    bot.dialog('/auth', [
        function (session, args, next) {
            if (_.isEmpty(args)) {
                session.send("我需要通过几个简单的问题来确定您的身份。");

                var userId = _.get(session, ["message", "user", "id"]);
                User.findOne({ 'uid': userId }, function(err, res) {
                    if (_isEmpty(res)) {
                        session.dialogData.profile = {};
                    } else {
                        var profileData = {
                        };

                        session.dialogData.profile = profileData;
                    }

                    if (!session.dialogData.profile.name) {
                        session.beginDialog('/auth/name');
                    } else {
                        next();
                    }
                });
            } else {
                session.dialogData.profile = args;

                if (!session.dialogData.profile.name) {
                    session.beginDialog('/auth/name');
                } else {
                    next();
                }
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
                session.beginDialog('/auth/phone');
            } else {
                next();
            }
        },
        function (session, results) {
            if (results.response) {
                session.dialogData.profile.phone = results.response;
            }

            // update User

            session.endDialogWithResult({ response: session.dialogData.profile });
        }
    ]);

    return bot;
}
