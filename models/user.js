const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require : true
    },
    firstName: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);