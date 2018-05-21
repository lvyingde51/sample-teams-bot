// @ts-check
let restify = require('restify');
let server = restify.createServer();

var builder = require("botbuilder");
var teams = require("botbuilder-teams");

// imports all libraries
var greeting = require("./dialogs/greetings");


let connector = new teams.TeamsChatConnector({
    appId: '', // bot id
    appPassword: '', // bot secret
});

// console.log(connector);


server.post('/api/v1/bot/messages', connector.listen());


// Creating the universal bot, with connector
// send the greeting default DialogWaterfallStep
let bot = new builder.UniversalBot(connector, (session) => session.replaceDialog(greeting.default.name));

// Adding libraries
bot.library(greeting.default.createLibrary());

bot.on("conversationUpdate", (message) => console.log(message));

server.listen(8080, () => console.log('Listening on port 8080'));