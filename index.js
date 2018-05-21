// @ts-check
const express = require('express');
const app = express();
const dotenv = require('dotenv').config()

var builder = require("botbuilder");
var teams = require("botbuilder-teams");
var url = require('url');

var siteUrl = require("./services/siteUrl");

// imports all libraries
var greeting = require("./dialogs/greetings");
var reset = require('./dialogs/reset');

let connector = new teams.TeamsChatConnector({
    appId:  process.env.MicrosoftAppId, // bot id
    appPassword: process.env.MicrosoftAppPassword, // bot secret
});

// wrapper around connect.listen() to be able to catch the local url
let connectorListener = connector.listen();

const listen = () => {
    return (req, res, next) => {
        // Save url in a static object
        siteUrl.SiteUrl.set(new url.URL(`http://${req.headers["host"]}`));

        console.log(siteUrl.SiteUrl.get())
        // @ts-ignore

        connectorListener(req, res, next);
    };
}

app.post('/api/v1/bot/messages', listen());

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

app.listen(8080, () => console.log('Listening on port 8080'));