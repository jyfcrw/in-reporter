var restify = require('restify');
var bot = require('./bot');

var server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
