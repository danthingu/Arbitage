
var mongoose = require('mongoose');

// define the schema for our user model
var exchanges = mongoose.Schema({
    name : String,
    price: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Exchanges', exchanges);