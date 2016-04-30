module.exports = function(bot) {

    bot.use(function (session, next) {
        if (!session.userData.loginData && !session.userData.userToken) {
            // need to login or register
            session.beginDialog('/login');
        } else {
            next();
        }
    });

    return bot;
}