const express = require('express');
const { registerUser, authUser, getUserById, getAllUsers } = require('../controllers/userController')

const router = express.Router()

// registration
router.post("/register",registerUser)
router.post("/login",authUser)
router.get("/:id", getUserById)
router.get("/",getAllUsers)


module.exports = router
