const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const users = new Schema({
    "user": {
        "type": String,
        "required": true
    },
    "password": {
        "type": String,
        "required": true
    },
    "Role":{
        "type":String,
        "required": true
    }
}, {
    "timestamps": true
});

module.exports = mongoose.model("users", users);