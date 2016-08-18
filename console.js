var builder = require('botbuilder');

var config   = require('./config'),
    autoload = require('./bot'),
    database = require('./database');

var bot, connector;

connector = new builder.ConsoleConnector();

bot = new builder.UniversalBot(connector);

// Connect mongodb database
database.connect();

// Autoload models, dialogs, middlewares
autoload(bot);

// Start listen on terminal
connector.listen();
console.log("<OS> start talking ...");