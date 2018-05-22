const builder = require("botbuilder");

const lib = new builder.Library('reset');

lib.dialog('everything', [
    (session, args, skip) => {
        for(let key in Object.keys(session.userData)) {
            delete session.userData[key];
        }
        session.endConversation();
        session.send('Conversation ended and restarted, profile deleted.');
        session.endDialog();
    }
]);
lib.dialog('conversation', [
    (session, args, skip) => {
        session.endConversation();
        session.send('Conversation ended and restarted.');
        session.endDialog();
    }
]);
exports.default = {
    name: "reset:conversation",
    createLibrary: () => {
        return lib.clone();
    }
};