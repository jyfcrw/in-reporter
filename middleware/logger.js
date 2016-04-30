module.exports = function(bot) {

    bot.use(function (session, next) {
        console.log("session: " ,session);
        next();
    });

    return bot;
}