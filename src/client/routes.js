/**
 * Created by brad on 3/28/2017.
 */
import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import { Landing } from './views/landing'
import { Profile } from './views/profile'
import { EditProfile } from './views/editProfile'
import { MessageBoard } from './views/messageBoard'
import { Register } from './views/register'
import { Unauthorized } from './views/unauthorized'
import { CreateMessage } from './views/createMessage'
import { Login } from './components/login'
import { LoggedIn } from './components/loggedIn'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    }
});

class User {
    constructor() {
        // See if user is in localStorage
        const data = localStorage.getItem('user');
        this.data = data !== undefined && data !== "undefined" ? JSON.parse(data) : {
            last_name: "",
            first_name: "",
            username: "",
            phone: "",
            gender: "",
            genderOfWasherPreferences: "",
            imageUrl: "",
            primary_email: "",
            location: "",
            created: "",
            loadsWished: "",
            loadsWashed: "",
            averageWashWating: "",
            bio: "",
            admin: ""
        };
        this.loggedIn = false;
    }

    logIn(data) {
        // Store locally
        this.data = data;
        this.loggedIn = true;
        // Store into localStorage
        localStorage.setItem('user', JSON.stringify(data));
    }

    //TODO: look at how to do this
    logOut() {
        // Remove user info
        this.data = {
            last_name: "",
            first_name: "",
            imageUrl: "",
            primary_email: ""
        };
        // Wipe localStorage
        localStorage.removeItem('user');
        this.loggedIn = false;
        // Go to login page
        browserHistory.push('/');
    }

    getUser() {
        return this.data;
    }
}

let user = new User();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    //https://github.com/google/google-api-javascript-client/issues/281
    //issue fix for log in button not showing up TODO
    render() {
        return (<MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    title="WishWash - Take a Load Off"
                    iconElementLeft={
                        <div>
                            <div id="my-signin2" style={{display: "block"}}></div>
                            {this.props.route.user.loggedIn ?
                            <LoggedIn user={this.props.route.user} /> : <Login user={this.props.route.user} />}
                        </div>}
                    iconElementRight={
                        <div>
                            {this.props.route.user.loggedIn && !this.props.location.pathname.includes(this.props.route.user.getUser().username) ?
                                <Avatar src={this.props.route.user.getUser().imageUrl}/> : null}
                        </div>
                    }
                />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>);
    }
}

function requireAuth(nextState, replaceState) {
    if (!user.loggedIn) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
}

let Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App} user={user}>
            <IndexRoute component={Landing} name="landing" user={user}/>
            <Route name="editProfile" path="/profile/edit/:username" component={EditProfile} user={user} onEnter = { requireAuth }/>
            <Route name="profile" path="/profile/:username" component={Profile} user={user} onEnter = { requireAuth } />
            <Route name="messageBoard" path="/messageBoard" component={MessageBoard} user={user} onEnter = { requireAuth } />
            <Route name="createMessage" path="/createMessage" component={CreateMessage} user={user}  onEnter = { requireAuth } />
            <Route name="register" path="/register" component={Register} user={user} />
            <Route name="unauthorized" path="/unauthorized" component={Unauthorized} user={user} />
        </Route>
    </Router>
);

export default Routes;
