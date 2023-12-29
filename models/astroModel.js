const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const astrologer = new mongoose.Schema({
    name:
    {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        //unique: true
    },
    password: {
        type: String,
        require: true
    },
    country: {
        type: String,
    },
    language: {
        type: String,
        require: true
    },
    token: {
        type: String,
        default: ''
    },
    
}, 
{ timestaps: true }
);

astrologer.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

astrologer.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Astrologer = mongoose.model("Astrologer", astrologer);

module.exports = Astrologer;