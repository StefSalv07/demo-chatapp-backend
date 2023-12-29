const express = require('express');
const { getConversationByUserId, getConversationByAstrologerId, getConversationByBothId } = require('../controllers/conversationController')

const router = express.Router()

router.get("/user/:userId", getConversationByUserId)
router.get("/astrologer/:astrologerId", getConversationByAstrologerId)
router.post("/byBothId", getConversationByBothId)


module.exports = router
