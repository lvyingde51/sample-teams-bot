// @ts-check
let restify = require('restify');
let server = restify.createServer();

var builder = require("botbuilder");
var teams = require("botbuilder-teams");


let connector = new teams.TeamsChatConnector({
    appId: '', // bot id
    appPassword: '', // bot secret
});

// console.log(connector);

server.get('/echo/:name', (req, res, next) => {
    res.send(req.params);
    return next();
});

server.post('/api/v1/bot/messages', connector.listen());

let bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

bot.on("conversationUpdate", (message) => console.log(message));

server.listen(8080, () => console.log('Listening on port 8080'));