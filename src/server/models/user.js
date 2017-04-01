/**
 * Created by brad on 3/31/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
    first_name: { type: String, default: '', required: true },
    last_name: { type: String, default: '', required: true },
    username: { type: String, required: true, unique: true },
    primary_email: { type: String, index: { unique: true }, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    genderOfWasherPreferences: [{ type: String, required: false }],
    location: { type: String },
    imageUrl: { type: String },
    created: { type: Date, default: Date.now() },
    loadsWished: { type: Number, default: 0 },
    loadsWashed: { type: Number, default: 0 },
    averageWashRating: { type: Number, default: 0 },
    bio: {type: String, required: false, default: ''},
    admin: { type: Boolean, default: false, required: true }
});

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', userSchema);

/*
User.path('primary_email').validate(function(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}, 'Invalid email address');

User.path('phone').validate(function(value) {
    return /\d{3}-\d{3}-\d{4}/.test(value);
}, 'Invalid phone number');
*/

// make this available to our users in our Node applications
module.exports = User;