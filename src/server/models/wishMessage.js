/**
 * Created by brad on 3/31/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let wishSchema = new Schema({
    wisher: {type: String, ref: 'User', required: true}, //username
    status: {type: String, enum: ["open", "claimed", "completed", "inactive"]},
    washer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    washerRating: {type: Number},
    commentForWasher: {type: String},
    created: {type: Date, default: Date.now()},
    location: {type: String, required: true},
    timeRangeLow: {type: Date, required: true},
    timeRangeHigh: {type: Date, required: true},
    loadCount: {type: Number, required: true},
    workAmount: {type: String, enum: ['wash', 'wash & dry', 'wash, dry, and fold'], required: true},
    comments: {type: String, required: false},
    suggestedPrice: {type: Number, required: false},
    gendersAccepted: [{type: String, required: false}]
});

// the schema is useless so far
// we need to create a model using it
let wishMessage = mongoose.model('wishMessage', wishSchema);

// make this available to our users in our Node applications
module.exports = wishMessage;