const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
