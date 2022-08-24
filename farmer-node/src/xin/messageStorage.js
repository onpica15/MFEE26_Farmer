const messages = [];

const saveMessage = (message)=>{
    messages.push(message);
};

const findMessagesForUser = (userId) => {
    return messages.filter(({ from, to }) => from === userId || to === userId);
};

module.exports = { findMessagesForUser, saveMessage };
