var express   = require('express'),
    builder   = require('botbuilder'),
    connector = require('botbuilder-wechat-connector');

var config   = require('./config'),
    autoload = require('./bot'),
    database = require('./database');

var app = express();

var wechatConnector = new connector.WechatConnector({
    appID: config.wechat.appId,
    appSecret: config.wechat.appSecret,
    appToken: config.wechat.appToken
});

var bot = new builder.UniversalBot(wechatConnector);

// Connect mongodb database
database.connect();

// Autoload models, dialogs, middlewares
autoload(bot);

app.use('/bot/wechat', wechatConnector.listen());

app.listen(process.env.port || 9090, function () {
    console.log('<OS> wechat server is running..');
});