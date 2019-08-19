const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://casper:casper123@cluster0-plvgn.mongodb.net/casper_bd?retryWrites=true&w=majority', {useNewUrlParser: true});

module.exports = mongoose;