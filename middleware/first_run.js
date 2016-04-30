module.exports = function(bot) {

    bot.use(function (session, next) {
        if (!session.userData.firstRun) {
            session.userData.firstRun = true;
            session.beginDialog('/welcome');
        } else {
            next();
        }
    });

    return bot;
}