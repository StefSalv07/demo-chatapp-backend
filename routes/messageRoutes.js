const express = require('express');
const {sendMessage, getMessages } = require('../controllers/messageController')

const router = express.Router()

router.post("/send", sendMessage)
router.post("/get", getMessages)


module.exports = router
