/**
 * Created by brad on 3/31/2017.
 */
//get user info with id
//get user info with username
//post user
//edit user info
//increment loads wished
//increment loads washed

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
            averageWashRating: 0
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
};

module.exports.editUser = function(req, res) {
    let data = req.body;
    if (!data) {
        res.status(400).send({ error: 'No body when editting user' });
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
};

module.exports.getUser = function(req, res) {
    let data = req.body;
    //if (session support)
    User.findOne({"username": req.params.username}, function(err, user) {
        if (err) {
            res.status(400).send({ error: 'error when querying database' });
        } else if (!user) {
            res.status(404).send({error: 'profile not found'});
        } else {
            res.status(200).send({
                user: user
            });
        }
    });
};

//later
//getAllWashMessagesByUser
//getAllWishMessagesByUser