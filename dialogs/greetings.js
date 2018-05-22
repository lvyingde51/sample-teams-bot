const builder = require("botbuilder");
const lib = new builder.Library('greeting');

lib.dialog('start', [
    (session) => builder.Prompts.text(session, 'Hi! What is your name?'),
    (session, results) => session.endDialog(`Hello ${results.response}!`),
]);

exports.default = {
    name: "greeting:start",
    createLibrary: () => {
        return lib.clone();
    }
};

