/**
 * Created by brad on 3/31/2017.
 */
//post wish message
//get wish message by id
//delete wash message

    //TODO: add all this
    //add wisher
    //accept wisher
    //mark as claimed/complete

let path     = require('path'),
    _        = require('lodash'),
    User            = require(path.join(__dirname, '../models/user.js')),
    washMessage     = require(path.join(__dirname, '../models/washMessage.js')),
    wishMessage    = require(path.join(__dirname, '../models/wishMessage.js'));

module.exports.createWishMessage = function(req, res) {
    let data = req.body;
    if (!data ||
        !data.wisher ||
        !data.location ||
        !data.timeRangeLow ||
        !data.timeRangeHigh ||
        !data.loadCount ||
        !data.workAmount) {
        res.status(400).send({error: 'all required form fields necessary'})
    } else {
        User.findOne({"username": data.wisher}, function(err, user) {
            if (err) {
                res.status(400).send({error: 'error when querying database'});
            } else if (!user) {
                res.status(404).send({error: 'wisher profile not found'});
            } else {
                let newWishMessage = new wishMessage({
                    wisher: data.wisher,
                    created: Date.now(),
                    location: data.location,
                    loadCount: data.loadCount,
                    timeRangeLow: data.timeRangeLow,
                    timeRangeHigh: data.timeRangeHigh,
                    comments: data.comments,
                    workAmount: data.workAmount,
                    status: "open",
                    suggestedPrice: data.suggestedPrice
                });

                newWishMessage.save(function (err) {
                    if (err) {
                        res.status(400).send({error: 'data could not save to database for wish message', err: err});
                    } else {
                        res.status(201).send({
                            id: newWishMessage._id
                        });
                    }
                })
            }
        })
    }
};

module.exports.deleteWishMessage = function(req, res) {
    //TODO: add support for you're own
    /*
    wishMessage.remove({'_id': req.params.id}, function(err) {
        if (err) {
            res.status(404).send({ error: 'db problem deleting wash messaage' });
        } else {
            res.status(200).send({ success: 'wash message deleted' });
        }
    });
    */
    User.findOne({"primary_email": req.body.email}, function(err, user) {
        if (err) {
            res.status(400).send({error: 'error when querying database'});
        } else if (!user) {
            res.status(404).send({error: 'Email with session not found'});
        } else {
            wishMessage.update({'_id': req.params.id}, {$set: {status: "inactive"}}, function (err, user) {
                if (err) {
                    res.status(404).send({error: 'db query problem with order'});
                } else if (washMessage.nModified === 0) {
                    res.status(404).send({error: 'user DNE'});
                } else {
                    res.status(200).send({success: 'user edited'});
                }
            });
        }
    });
};

module.exports.getWishMessageById = function(req, res) {
    //if (session support)
    wishMessage.findOne({"_id": req.params.id}, function(err, wishMessage) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else if (_.isEmpty(wishMessage)) {
            res.status(404).send({error: 'wish message not found'});
        } else {
            res.status(200).send({
                wishMessage: wishMessage
            });
        }
    });
};