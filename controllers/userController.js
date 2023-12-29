const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req,res) => {
    const { firstname, lastname, phone, email, gender, password, language, profilepic, token, birthdate, birth_place, birth_time } = req.body;

    if (!firstname || !lastname || !phone || !email || !gender || !password || !language || !birthdate || !birth_place || !birth_time) {
        res.status(404);
        throw new Error('Please enter all the fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        firstname,lastname,phone, email, gender, password, language, profilepic, token, birthdate,birth_place,birth_time
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            gender: user.gender,
            password: user.password,
            language: user.language,
            profilepic: user.profilepic,
            token: generateToken(user._id),
            birthdate: user.birthdate,
            birth_place: user.birth_place,
            birth_time:user.birth_time
        })
    }else {
        res.status(400)
        throw new Error("Failed to create the user")
    }
})

const authUser = asyncHandler(async (req, res) => { 
    const { email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profilepic: user.profilepic,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

const getUserById = asyncHandler(async (req, res) => { 
    const user = await User.findOne({ _id:req.params.id });
    
    if (user) {
        res.send(user)
    } else {
        res.status(401);
        throw new Error("User not found");
    }
})

const getAllUsers = asyncHandler(async (req, res) => { 
    const users = await User.find();
    if (users) res.send(users)
    else {
        res.status(401);
        throw new Error("No users found");
    }
})

module.exports = { registerUser, authUser, getUserById, getAllUsers }
