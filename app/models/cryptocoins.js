
var mongoose = require('mongoose');

// define the schema for our user model
var cryptocoins = mongoose.Schema({
    name : String,
    exchange: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Exchange"
      }
   ]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Cryptocoins', cryptocoins);