/**
 * Created by brad on 3/28/2017.
 */
'use strict';

let express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    _               = require('lodash'),
    path            = require('path'),
    session         = require('express-session'),
    fs              = require('fs'),
    mongoose        = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost:27017/faskowbn');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

let accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(express.static(path.join(__dirname, '../../public')));
app.use(logger({format:"[:date[clf]] :method :url :status :response-time ms",stream: {
    write: function(str)
    {
        accessLogStream.write(str);
        console.log(str);
    }
}}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'ILikeSam2K12',
    expires: new Date(Date.now() + (60 * 60 * 30 * 1000)),
    path: '/'
}));

app.get('*', function(req, res) {
    res.render('base', {
        title: 'WishWash'
    });
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});