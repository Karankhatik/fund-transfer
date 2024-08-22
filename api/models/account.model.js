const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    account_number: {
        type: String        
    },
    balance: {
        type: Number,
        

    }
}); 

module.exports = mongoose.model('Account', accountSchema)