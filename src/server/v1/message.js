/**
 * Created by brad on 3/31/2017.
 */
//Get all message with specific filter
let path     = require('path'),
    _        = require('lodash'),
    washMessage     = require(path.join(__dirname, '../models/washMessage.js')),
    wishMessage    = require(path.join(__dirname, '../models/wishMessage.js'));

module.exports.getAllMessagesWithFilter = function(req, res) {
    let data = req.body;
    let messages = [];
    let status = "open";
    let location = "*";
    let timeRangeHigh = "*";
    if (data.location) { location = data.location; }
    if (data.timeRangeHigh) { timeRangeHigh = data.timeRangeHigh; }

    washMessage.find({location: location, timeRangeHigh: timeRangeHigh, status: status}).sort({timeRangeHigh: -1}).exec(
        function(err, washMessages) {
            if (err) {
                res.status(400).send({ error: 'db query problem on washMessages' });
            } else {
                for (let i in washMessages) {
                    messages.push(washMessages[i])
                }
                wishMessage.find({location: location, timeRangeHigh: timeRangeHigh, status: status}).sort({timeRangeHigh: -1}).exec(
                    function(err, wishMessages) {
                        if (err) {
                            res.status(400).send({ error: 'db query problem on wishMessages' });
                        } else {
                            for (let i in wishMessages) {
                                messages.push(wishMessages[i]);
                            }
                            res.status(200).send({ messages: messages })
                        }
                    }
                )
            }
        }
    )
}