const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema({
    firstname:
    {
        type: String,
        require: true
    },
    lastname: {
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
    gender: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    profilepic: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_1077114&psig=AOvVaw1aa5dnd0KzFfoBfrsDRccP&ust=1703587981613000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKCglfa1qoMDFQAAAAAdAAAAABAE'
    },
    token: {
        type: String,
        default: ''
    },
    birthdate: {
        type: Date,
        require: true
    },
    birth_place: {
        type: String,
        default: '',
        require: true
    },
    birth_time: {
        type: String,
        default: '',
        require: true
    },
}, 
{ timestaps: true }
);

user.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

user.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", user);

module.exports = User;