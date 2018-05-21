// @ts-check
var builder = require("botbuilder");

let lib = new builder.Library('greeting');

lib.dialog('start',
    async (session) => {

        session.sendTyping();
        session.send("greetings !");
        session.sendTyping();

    });

exports.default = {
    name: "greeting:start",
    createLibrary: () => {
        return lib.clone();
    }
};

