let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = mongoose.Schema({
    email: { type: String, index: true, unique: true, required: true },
    active: {type: Boolean}, // the user activate his account
    login: {type: Boolean}, // the user is login or not
    dateOfRegistration: {type: Date},
    isTester: {type: Boolean, default: false} // is tester account
});

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(passportLocalMongoose, {

    findByUsername: function(model, queryParameters) {
      // Add additional query parameter - AND condition - active: true
      queryParameters.active = true;
      return model.findOne(queryParameters);
    }
  });

let User = mongoose.model("userTest", UserSchema);
module.exports = {User};