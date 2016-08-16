var restify  = require('restify'),
    bunyan   = require('bunyan'),
    mongoose = require('mongoose');

var connector = require('./bot'),
    server;

mongoose.connect('mongodb://localhost/in-reporter', function(err) {
    if(err) {
        console.log('connection error', err);
    }
});

server = restify.createServer();

server.on('after', restify.auditLogger({
    log: bunyan.createLogger({
        name: 'api',
        level: 'info'
    })
}));

server.use(restify.requestLogger());

server.post('/api/messages', connector.listen());

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
