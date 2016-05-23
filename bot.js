var builder = require('botbuilder'),
    glob = require('glob'),
    path = require('path');

var bot = new builder.BotConnectorBot();

var middleware = [
    "logger",
    "first_run",
    "load_user"
].map(function(name) {
    return path.join("./middlewares/", name + ".js");
});

var dialog = glob.sync('./dialogs/**/*.js');

// Install middlewares and dialogs
middleware.concat(dialog).forEach(function(file) {
    require(path.resolve(file))(bot);
});

module.exports = bot;