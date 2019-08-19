const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
    user: {
        type: String
    },
    password: {
        type: String,
    },
    timestamps: true,
});

module.exports = model('admin', AdminSchema);