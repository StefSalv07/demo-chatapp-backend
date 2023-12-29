const Conversation = require("../models/conversationModel");

//new conversation
const newConversation = async (req, res) => {
    const newconversation = new Conversation({
        userId: req.body.userId,
        astrologerId: req.body.astrologerId
    });
    try {
        const savedConversation = await newconversation.save();
        res.status(200).send({ success: true, data: savedConversation });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
};

//get conversation of a user
const getConversationByUserId = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            userId: req.params.userId
        });
        res.status(200).send({ success: true, data: conversation });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

const getConversationByAstrologerId = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            astrologerId: req.params.astrologerId
        });
        res.status(200).send({ success: true, data: conversation });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

const getConversationByBothId = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            userId: req.body.userId,
            astrologerId: req.body.astrologerId
        });
        res.status(200).send({ success: true, data: conversation });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    newConversation,
    getConversationByUserId,
    getConversationByAstrologerId,
    getConversationByBothId
}