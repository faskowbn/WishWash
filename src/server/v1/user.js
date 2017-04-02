/**
 * Created by brad on 3/31/2017.
 */
//get user info with id
//get user info with username
//post user
//edit user info
//increment loads wished
//increment loads washed

let path     = require('path'),
    _        = require('lodash'),
    User            = require(path.join(__dirname, '../models/user.js')),
    washMessage     = require(path.join(__dirname, '../models/washMessage.js')),
    wishMessage    = require(path.join(__dirname, '../models/wishMessage.js'));

module.exports.createUser = function(req, res) {
    let data = req.body;
    if (!data ||
        !data.first_name ||
        !data.last_name ||
        !data.username ||
        !data.primary_email ||
        !data.gender ||
        !data.phone) {
        res.status(400).send({error: 'all required form fields necessary'})
    } else {
        User.findOne({'username': data.username}, function(err, user) {
            if (err) {
                res.status(400).send({ error: 'error when querying database for user' });
            } else if (!_.isEmpty(user)) {
                res.status(404).send({error: 'username already in use'});
            } else {
                User.findOne({'primary_email': data.primary_email}, function(err, email) {
                    if (err) {
                        res.status(400).send({error: 'error when querying database for user'});
                    } else if (!_.isEmpty(email)) {
                        res.status(404).send({error: 'email already in use'});
                    } else {
                        let newUser = new User({
                            first_name: data.first_name,
                            last_name: data.last_name,
                            username: data.username,
                            primary_email: data.primary_email,
                            phone: data.phone,
                            gender: data.gender,
                            genderOfWasherPreferences: data.genderOfWasherPreferences,
                            location: data.location,
                            imageUrl: data.imageUrl,
                            created: Date.now(),
                            loadsWished: 0,
                            loadsWashed: 0,
                            averageWashRating: 0,
                            admin: false,
                            bio: data.bio
                        });

                        newUser.save(function (err) {
                            if (err) {
                                res.status(400).send({error: 'data could not save to database', err: err});
                            } else {
                                res.status(201).send({
                                    id: newUser._id
                                });
                            }
                        })
                    }
                });
            }
        });
    }
};

module.exports.editUser = function(req, res) {
    let data = req.body;
    if (!data) {
        res.status(400).send({error: 'No body when editting user'});
    } else {
        User.findOne({"primary_email": req.session.email}, function(err, user) {
            if (err) {
                res.status(400).send({ error: 'error when querying database' });
            } else if (!user) {
                res.status(404).send({error: 'Session not found.  Please log in.'});
            } else {
                let toChange = {};
                let data = req.body;

                //boiler plate
                if (data.first_name !== undefined) {
                    toChange.first_name = data.first_name;
                }

                if (data.last_name !== undefined) {
                    toChange.last_name = data.last_name;
                }

                if (data.phone !== undefined) {
                    toChange.phone = data.phone;
                }

                if (data.gender !== undefined) {
                    toChange.gender = data.gender;
                }

                if (data.genderOfWasherPreferences !== undefined) {
                    toChange.genderOfWasherPreferences = data.genderOfWasherPreferences;
                }

                if (data.imageUrl !== undefined) {
                    toChange.imageUrl = data.imageUrl;
                }

                if (data.bio !== undefined) {
                    toChange.bio = data.bio;
                }

                if (!_.isEmpty(toChange)) {
                    //TODO: stop using username ... add sessions
                    User.update({'username': req.body.username}, {$set: toChange}, function(err, user) {
                        if (err) {
                            res.status(404).send({ error: 'db query problem with order' });
                        } else if (!user) {
                            res.status(404).send({ error: 'user DNE' });
                        } else {
                            res.status(200).send({success: 'user edited'});
                        }
                    });
                } else {
                    res.status(404).send({ error: 'sent in empty toChange' });
                }
            }
        });
    }
};

module.exports.getUserByUsername = function(req, res) {
    User.findOne({"primary_email": req.session.email}, function(err, sessionUser) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else {
            User.findOne({"username": req.params.username}, function(err, user) {
                if (err) {
                    res.status(400).send({ error: 'error when querying database' });
                } else if (!user) {
                    res.status(404).send({error: 'profile not found'});
                } else {
                    //if not your email on session, then
                    if (!sessionUser) {
                        let otherUser = _.pick(user, ['first_name', 'last_name', 'username', 'primary_email', 'phone',
                                                      'gender', 'location', 'imageUrl', 'created', 'loadsWished',
                                                       'loadsWashed', 'averageWashRating', 'bio']);
                        res.status(200).send({
                            user: otherUser
                        });
                    } else {
                        res.status(200).send({
                            user: user
                        });
                    }
                }
            });
        }
    })
};

module.exports.getUserById = function(req, res) {
    User.findOne({"primary_email": req.session.email}, function(err, sessionUser) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else {
            User.findOne({"_id": req.params.id}, function(err, user) {
                if (err) {
                    res.status(400).send({ error: 'error when querying database' });
                } else if (!user) {
                    res.status(404).send({error: 'profile not found'});
                } else {
                    //if not your email on session, then
                    if (!sessionUser) {
                        let otherUser = _.pick(user, ['first_name', 'last_name', 'username', 'primary_email', 'phone',
                            'gender', 'location', 'imageUrl', 'created', 'loadsWished',
                            'loadsWashed', 'averageWashRating', 'bio']);
                        res.status(200).send({
                            user: otherUser
                        });
                    } else {
                        res.status(200).send({
                            user: user
                        });
                    }
                }
            });
        }
    })
};

module.exports.getUserByEmail = function(req, res) {
    User.findOne({"primary_email": req.params.email}, function(err, user) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else if (!user) {
            res.status(404).send({error: 'profile not found'});
        } else {
            if (req.params.email !== req.session.email) {
                let otherUser = _.pick(user, ['first_name', 'last_name', 'username', 'primary_email', 'phone',
                    'gender', 'location', 'imageUrl', 'created', 'loadsWished',
                    'loadsWashed', 'averageWashRating', 'bio']);
                res.status(200).send({
                    user: otherUser
                });
            } else {
                res.status(200).send({
                    user: user
                });
            }
        }
    });
}

//later
//getAllWashMessagesByUser
//getAllWishMessagesByUser