/**
 * Created by brad on 3/31/2017.
 */
//post wash message
//delete wash message
//increment loads wished for user
//increment loads washed for user

let path     = require('path'),
    _        = require('lodash'),
    User            = require(path.join(__dirname, '../models/user.js')),
    washMessage     = require(path.join(__dirname, '../models/washMessage.js')),
    wishMessage    = require(path.join(__dirname, '../models/wishMessage.js'));

module.exports.createWashMessage = function(req, res) {
    let data = req.body;
    if (!data ||
        !data.washer ||
        !data.availableLocations ||
        !data.timeRangeLow ||
        !data.timeRangeHigh ||
        !data.comments) {
        res.status(400).send({error: 'all required form fields necessary'})
    } else {
        User.findOne({"username": data.washer}, function(err, user) {
            if (err) {
                res.status(400).send({ error: 'error when querying database' });
            } else if (!user) {
                res.status(404).send({error: 'washer profile not found'});
            } else {
                let newWashMessage = new washMessage({
                    washer: data.washer,
                    created: Date.now(),
                    availableLocations: data.availableLocations,
                    timeRangeLow: data.timeRangeLow,
                    timeRangeHigh: data.timeRangeHigh,
                    comments: data.comments,
                    suggestedPrice: data.suggestedPrice,
                    status: "open"
                });

                newWashMessage.save(function (err) {
                    if (err) {
                        res.status(400).send({error: 'data could not save to database for wash message', err: err});
                    } else {
                        res.status(201).send({
                            id: newWashMessage._id
                        });
                    }
                })
            }
        });
    }
};

module.exports.deleteWashMessage = function(req, res) {
    /*
    washMessage.remove({'_id': req.params.id}, function(err) {
        if (err) {
            res.status(404).send({ error: 'db problem deleting wash messaage' });
        } else {
            res.status(200).send({ success: 'wash message deleted' });
        }
    });
    */
    User.findOne({"primary_email": req.body.email}, function(err, user) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else if (!user) {
            res.status(404).send({error: 'Email with session not found'});
        } else {
            washMessage.update({'_id': req.params.id}, {$set: {status: "inactive"}}, function(err, washMessage) {
                if (err) {
                    res.status(404).send({ error: 'db query problem with order' });
                } else if (washMessage.nModified === 0) {
                    res.status(404).send({ error: 'wash Message could not be deleted' });
                } else {
                    res.status(200).send({success: 'status set as inactive'});
                }
            });
        }
    });
};

module.exports.getWashMessageById = function(req, res) {
    //if (session support)
    washMessage.findOne({"_id": req.params.id}, function(err, washMessage) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else if (_.isEmpty(washMessage)) {
            res.status(404).send({error: 'wash message not found'});
        } else {
            res.status(200).send({
                washMessage: washMessage
            });
        }
    });
};