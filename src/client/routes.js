/**
 * Created by brad on 3/28/2017.
 */
import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import { Landing } from './views/landing'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    onSuccess(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    onFailure(error) {
        console.log(error);
    }
    renderButton() {
        window.gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSuccess,
            'onfailure': this.onFailure
        });
    }
    signOut() {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    componentDidMount() {
        window.addEventListener('google-loaded',this.renderButton);
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
                <div id="my-signin2"></div>
                <RaisedButton label='Sign Out' onTouchTap={this.signOut.bind(this)}></RaisedButton>
            </div>
        </MuiThemeProvider>);
    }
}

let Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={Landing} name="landing"/>
        </Route>
    </Router>
);

export default Routes;