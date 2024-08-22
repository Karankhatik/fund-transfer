const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        trim: true,
    },
    last_name:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 25,
        minLength: 5

    },
    password:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

module.exports = mongoose.model('User', userSchema)