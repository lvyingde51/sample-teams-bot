// @ts-check
let restify = require('restify');
let server = restify.createServer();

var builder = require("botbuilder");
var teams = require("botbuilder-teams");
var url = require('url');

var siteUrl = require("./services/siteUrl");

// imports all libraries
var greeting = require("./dialogs/greetings");
var reset = require('./dialogs/reset');

let connector = new teams.TeamsChatConnector({
    appId: '', // bot id
    appPassword: '', // bot secret
});

// console.log(connector);



// wrapper around connect.listen() to be able to catch the local url
var connectorListener = connector.listen();
// wrapper
function listen() {
    return (req, res, next) => {
        // Save url in a static object
        siteUrl.SiteUrl.set(new url.URL(`http://${req.headers["host"]}`));

        console.log(siteUrl.SiteUrl.get())
        // @ts-ignore
        connectorListener(req, res, next);
    };
}

server.post('/api/v1/bot/messages', listen());

// Creating the universal bot, with connector
// send the greeting default DialogWaterfallStep
let bot = new builder.UniversalBot(connector, (session) => session.replaceDialog(greeting.default.name));

// Adding libraries
bot.library(greeting.default.createLibrary());
bot.library(reset.default.createLibrary());

// regex triggers
bot.beginDialogAction('restart', 'reset:conversation', { matches: /^restart/i });
bot.beginDialogAction('reset', 'reset:everything', { matches: /^reset/i });


bot.on("conversationUpdate", (message) => console.log(message));

server.listen(8080, () => console.log('Listening on port 8080'));