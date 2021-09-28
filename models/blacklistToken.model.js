const mongoose = require("mongoose");


const blacklistToken = new mongoose.Schema({
    token: { type: String, required: true, trim: true }
}, { timestamps: true });

const BlacklistToken = mongoose.model("BlacklistToken", blacklistToken);

module.exports.BlacklistToken = BlacklistToken;

