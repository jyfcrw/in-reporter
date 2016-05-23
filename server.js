var restify = require('restify');
var mongoose = require('mongoose');
var bot = require('./bot');

mongoose.connect('mongodb://localhost/in-reporter', function(err) {
    if(err) {
        console.log('connection error', err);
    }
});

var server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
