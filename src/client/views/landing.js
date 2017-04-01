/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton'

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.user
        };

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    onSuccess(googleUser) {
        let profile = googleUser.getBasicProfile();
        let idToken = googleUser.getAuthResponse().id_token;

        $.ajax({
            url: "/v1/session/",
            data: {
                idToken: idToken,
                email: profile.getEmail()
            },
            type: "POST",
            success: function() {
                console.log("Session created successfully");
                let user = {};
                user["last_name"] = profile.getFamilyName();
                user["first_name"] = profile.getName();
                user["imageUrl"] = profile.getImageUrl();
                user["primary_email"] = profile.getEmail();
                this.props.route.user.logIn(user);
            }.bind(this),
            error: function(err) {
                alert(err);
            }
        });
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
        console.log("sup");
        return (
            <div>
                <div id="my-signin2"></div>
                <RaisedButton label='Sign Out' onTouchTap={this.signOut.bind(this)}></RaisedButton>
            </div>
        );
    }
}