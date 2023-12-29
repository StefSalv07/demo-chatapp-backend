const express = require('express');
const { registerAstro, authAstrologer } = require('../controllers/astroController')

const router = express.Router()

// registration
router.route("/").post(registerAstro)
router.route("/login").post(authAstrologer)


module.exports = router
