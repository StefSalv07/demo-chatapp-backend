const asyncHandler = require('express-async-handler')
const Astrologer = require('../models/astroModel')
const generateToken = require('../config/generateToken')

const registerAstro = asyncHandler(async (req,res) => {
    const { name, phone, email, password, country, language, token } = req.body;

    if (!name  || !phone || !email || !country || !password || !language) {
        res.status(404);
        throw new Error('Please enter all the fields')
    }

    const astroExists = await Astrologer.findOne({ email })

    if (astroExists) {
        res.status(400)
        throw new Error('Astrologer already exists')
    }

    const astrologer = await Astrologer.create({
        name,phone, email, password, country, language, token
    })

    if (astrologer) {
        res.status(201).json({
            _id: astrologer._id,
            name: astrologer.name,
            phone: astrologer.phone,
            email: astrologer.email,
            password: astrologer.password,
            country: astrologer.country,
            language: astrologer.language,
            token: generateToken(astrologer._id),
        })
    }else {
        res.status(400)
        throw new Error("Failed to create the astrologer")
    }
})

const authAstrologer = asyncHandler(async (req, res) => { 
    const { email, password } = req.body;
    console.log(email, password)
    const astrologer = await Astrologer.findOne({ email });
    
    if (astrologer && (await astrologer.matchPassword(password))) {
        res.json({
            _id: astrologer._id,
            name: astrologer.name,
            email: astrologer.email,
            token: generateToken(astrologer._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

module.exports = { registerAstro, authAstrologer }