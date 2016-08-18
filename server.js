var restify  = require('restify'),
    bunyan   = require('bunyan'),
    builder  = require('botbuilder');

var config   = require('./config'),
    autoload = require('./bot'),
    database = require('./database');

var bot, connector, server;

// Create chat bot using botbuilder
connector = new builder.ChatConnector({
    appId: config.app.appId,
    appPassword: config.app.appPassword
});

bot = new builder.UniversalBot(connector);

// Connect mongodb database
database.connect();

// Autoload models, dialogs, middlewares
autoload(bot);

// Create http server
server = restify.createServer();

server.on('after', restify.auditLogger({
    log: bunyan.createLogger({
        name: 'api',
        level: 'info'
    })
}));

server.use(restify.requestLogger());

server.post('/api/messages', connector.listen());

server.get('/ping', function respond(req, res, next) {
  res.send('alive');
  next();
});

// Start listen on port
server.listen(process.env.port || 3978, function () {
    console.log('<OS> %s listening to %s ...', server.name, server.url);
});
