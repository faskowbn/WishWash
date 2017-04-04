/**
 * Created by brad on 4/4/2017.
 */
/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {FlatButton} from 'material-ui/FlatButton'

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    onSuccess(googleUser) {
        let profile = googleUser.getBasicProfile();
        let idToken = googleUser.getAuthResponse().id_token;
        $.ajax({
            url: "/v1/user/email/" + profile.getEmail(),
            type: "GET",
            success: function(data) {
                console.log("Profile loaded successfully");
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
                        user["first_name"] = data.user.first_name;
                        user["last_name"] = data.user.last_name;
                        user["username"] = data.user.username;
                        user["primary_email"] = data.user.primary_email;
                        user["phone"] = data.user.phone;
                        user["gender"] = data.user.gender;
                        user["genderOfWasherPreferences"] = data.user.genderOfWasherPreferences;
                        user["location"] = data.user.location;
                        user["imageUrl"] = data.user.imagedUrl;
                        user["created"] = data.user.created;
                        user["loadsWished"] = data.user.loadsWished;
                        user["loadsWashed"] = data.user.loadsWashed;
                        user["averageWashRating"] = data.user.averageWashRating;
                        user["bio"] = data.user.bio;
                        user["admin"] = data.user.admin;

                        this.props.user.logIn(user);
                        // Go to user profile
                        browserHistory.push("/profile/" + data.user.username);
                    }.bind(this),
                    error: function(err) {
                        alert(err.responseText);
                    }
                });
            }.bind(this),
            error: function(err) {
                console.log("Profile not found ... redirecting to registration");
                localStorage.setItem('email', profile.getEmail());
                browserHistory.push("/register");
            }
        });
    }
    onFailure(error) {
        console.log("hey");
        console.log(error);
    }

    renderButton() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 50,
            'height': 50,
            'theme': 'dark',
            'onsuccess': this.onSuccess,
            'onfailure': this.onFailure
        });
    }

    componentDidMount() {
        window.addEventListener('google-loaded',this.renderButton);
    }

    render() {
        return (
            <div>
                <div id="my-signin2"></div>
            </div>
        );
    }
}
