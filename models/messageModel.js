const mongoose = require("mongoose");

const message = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation"
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
    time: {
        type: String,
        default: new Date(),
    }
}, 
    { timestaps: true }
);

module.exports = mongoose.model("message", message);