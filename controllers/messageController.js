const Message = require("../models/messageModel");

//send message
const sendMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).send({ success: true, data: savedMessage });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
};

//get message
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.body.conversationId
        });
        res.status(200).send({ success: true, data: messages });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    sendMessage,
    getMessages
}