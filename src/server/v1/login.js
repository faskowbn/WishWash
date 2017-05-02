/**
 * Created by brad on 4/1/2017.
 */

let verfifier = require('google-id-token-verifier');

module.exports.addSession = function(req, res) {
    let acceptedEmails = ["vanderbilt.edu"];

    let data = req.body;
    if (!data.idToken) {
        res.status(400).send({error: 'idToken required'});
    } else if (!data.email) {
        res.status(400).send({error: 'email required'});
    } else if (!acceptedEmails.includes(data.email.replace(/.*@/, ""))) {
        res.status(400).send({error: 'only vandy email accepted'});
    } else {
        verfifier.verify(data.idToken, '1025429036835-lko8cun24hcb2vc5qe1osf8jpjtg5tit.apps.googleusercontent.com', function(err, tokenInfo) {
            if (err) {
                res.status(400).send({error: 'id token not verified'})
            } else {
                req.session.email = data.email;
                res.status(200).send({});
            }
        })
    }
};

//TODO add logout