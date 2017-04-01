/**
 * Created by brad on 3/31/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let washSchema = new Schema({
    washer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, default: Date.now() },
    availableLocations: [{ type: String, required: true }],
    timeRangeLow: { type: Date, required: true },
    timeRangeHigh: { type: Date, required: true },
    comments: { type: String, required: false }
});

// the schema is useless so far
// we need to create a model using it
let washMessage = mongoose.model('washMessage', washSchema);

// make this available to our users in our Node applications
module.exports = washMessage;