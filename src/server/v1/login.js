/**
 * Created by brad on 4/1/2017.
 */

let verfifier = require('google-id-token-verifier');

module.exports.addSession = function(req, res) {
    if (!req.params.token) {
        res.status(400).send({error: 'idTokenRequired'})
    } else {
        verfifier.verify(req.params.idToken, '1025429036835-lko8cun24hcb2vc5qe1osf8jpjtg5tit.apps.googleusercontent.com', function(err, tokenInfo) {
            if (err) {
                res.status(400).send({error: 'id token not verified'})
            } else {
                req.session.token = tokenInfo;
                res.status(200).send({});
            }
        })
    }
};

//TODO add logout