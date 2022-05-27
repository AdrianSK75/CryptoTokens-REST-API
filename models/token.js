const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    tradable: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Token", tokenSchema)