const mongoose = require("mongoose");

const conversation = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"astrologers",
    }
});

module.exports = mongoose.model("conversation", conversation);