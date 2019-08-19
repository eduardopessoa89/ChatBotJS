const { Schema, model } = require('mongoose');

const NoticiaSchema = new Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    theme: {
        type: String
    },
    link: {
        type: String
    },
    timestamps: true,
});

module.exports = model('news', NoticiaSchema);