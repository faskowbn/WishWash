/**
 * Created by brad on 3/31/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let wishSchema = new Schema({
    wisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: string, enum: ["open", "claimed", "completed"], required: true},
    washer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    created: { type: Date, default: Date.now() },
    location: { type: String },
    timeRangeLow: { type: Date, required: true },
    timeRangeHigh: { type: Date, required: true },
    loadCount: { type: Number, required: true },
    workAmount: { type: String, enum: ['wash', 'wash & dry', 'wash, dry, and fold'], required: true},
    comments: { type: String, required: false },
});

// the schema is useless so far
// we need to create a model using it
let wishMessage = mongoose.model('wishMessage', wishSchema);

// make this available to our users in our Node applications
module.exports = wishMessage;