const builder = require("botbuilder");
let lib = new builder.Library('reset');

lib.dialog('everything', [
    (session, args, skip) => {
        Object.keys(session.userData).forEach(key => delete session.userData[key]);
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