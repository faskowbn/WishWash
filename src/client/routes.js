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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    title="Mixr"
                    iconElementLeft={null} />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        </MuiThemeProvider>);
    }
}

class User {
    constructor() {
        // See if user is in localStorage
        const data = localStorage.getItem('user');
        this.data = data ? JSON.parse(data) : {
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
    }

    logIn(data) {
        // Store locally
        this.data = data;
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
        // Go to login page
        browserHistory.push('/login');
    }

    getUser() {
        return this.data;
    }
}

let user = new User();

let Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={Landing} name="landing" user={user}/>
            <Route name="editProfile" path="/profile/edit/:username" component={EditProfile} user={user}/>
            <Route name="profile" path="/profile/:username" component={Profile} user={user}/>
            <Route name="messageBoard" path="/messageBoard" component={MessageBoard} user={user}/>
            <Route name="register" path="/register" component={Register} user={user}/>
            <Route name="unauthorized" path="/unauthorized" component={Unauthorized} user={user}/>
            <Route name="createMessage" path="/createMessage" component={CreateMessage} user={user}/>
        </Route>
    </Router>
);

export default Routes;