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
    mongoose        = require('mongoose'),
    User            = require(path.join(__dirname, './models/user.js')),
    washMessage     = require(path.join(__dirname, './models/washMessage.js')),
    wishMessage     = require(path.join(__dirname, './models/wishMessage.js')),
    messageApi      = require(path.join(__dirname, './v1/message.js')),
    userApi         = require(path.join(__dirname, './v1/user.js')),
    washApi         = require(path.join(__dirname, './v1/washMessage.js')),
    wishApi         = require(path.join(__dirname, './v1/wishMessage.js')),
    loginApi        = require(path.join(__dirname, './v1/login.js'));

let app = express();

mongoose.connect('mongodb://localhost:27017/WishWashTest');

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
    secret: 'vmel#l4%gmg;spw',
    expires: new Date(Date.now() + (60 * 60 * 30 * 1000)),
    path: '/'
}));

//messages api
app.get('/v1/filter/messages/location/:location', messageApi.getAllMessagesWithFilter);

///user api
app.post('/v1/user', userApi.createUser);
app.put('/v1/user', userApi.editUser);
app.get('/v1/user/id/:id', userApi.getUserById);
app.get('/v1/user/username/:username', userApi.getUserByUsername)

//washMessage api
app.post('/v1/washMessage/', washApi.createWashMessage);
app.delete('/v1/washMessage/:id', washApi.deleteWashMessage);
app.get('/v1/washMessage/:id', washApi.getWashMessageById);

//wishMessage api
app.post('/v1/wishMessage/', wishApi.createWishMessage);
app.delete('/v1/wishMessage/:id', wishApi.deleteWishMessage);
app.get('/v1/wishMessage/:id', wishApi.getWishMessageById);

//login api
app.post('/v1/session/', loginApi.addSession);

app.get('*', function(req, res) {
    res.render('base', {
        title: 'WishWash'
    });
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});