/**
 * Created by brad on 3/31/2017.
 */
//Get all message with specific filter
let path     = require('path'),
    _        = require('lodash'),
    User            = require(path.join(__dirname, '../models/user.js'))
    washMessage     = require(path.join(__dirname, '../models/washMessage.js')),
    wishMessage    = require(path.join(__dirname, '../models/wishMessage.js'));

module.exports.getAllMessagesWithFilter = function(req, res) {
    let data = req.body;
    let messages = [];
    let status = "open";
    let location = req.params.location;
    //let timeRangeHigh = new Date(req.params.timeRangeHigh);
    if (!location) {
        res.status(400).send({ error: 'no location set' });
    } else {
        User.findOne({"primary_email": req.session.email}, function (err, user) {
            if (err) {
                res.status(400).send({error: 'error when querying database'});
            } else if (!user) {
                res.status(404).send({error: 'Email with session not found'});
            } else {
                washMessage.find({
                    availableLocations: location,
                    status: status
                }).sort({timeRangeHigh: -1}).limit(500).exec(
                    function (err, washMessages) {
                        if (err) {
                            res.status(400).send({error: 'db query problem on washMessages'});
                        } else {
                            for (let i in washMessages) {
                                messages.push(washMessages[i])
                            }
                            wishMessage.find({location: location, status: status}).sort({timeRangeHigh: -1}).exec(
                                function (err, wishMessages) {
                                    if (err) {
                                        res.status(400).send({error: 'db query problem on wishMessages'});
                                    } else {
                                        for (let i in wishMessages) {
                                            if (_.isEmpty(wishMessages[i].gendersAccepted) ||
                                                _.includes(wishMessages[i].gendersAccepted, user.gender)) {
                                                messages.push(wishMessages[i]);
                                            }
                                        }
                                        res.status(200).send({messages: messages})
                                    }
                                }
                            )
                        }
                    });
            }
        })
    }
}