/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
            url: "/v1/user/email/" + profile.getEmail(),
            type: "GET",
            success: function(data) {
                console.log("Profile loaded successfully");
                console.log(idToken);
                console.log(profile.getEmail());
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

                        this.props.route.user.logIn(user);
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
                console.log(localStorage.getItem('email'));
                browserHistory.push("/register");
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
        return (
            <div>
            <Card>
              <CardHeader title="Think Big Picture" avatar="https://s-media-cache-ak0.pinimg.com/736x/27/6b/92/276b9282169e378ee334b5184b0bb182.jpg" />
              <CardMedia overlay={<CardTitle title="Teamwork, Community, Family" />}>
              <img src="http://gender.stanford.edu/sites/default/files/uploads/2010/04/Teamwork-iStock_000008295703Medium.jpg" style={{height:'80%',width:'60%'}} />
              </CardMedia>
              <CardText><p style={{fontSize:'300%', fontFamily:'Corben'}}>
                <b>WishWash</b> believes that connections build the foundation for
                succesful communities. With more and more things going on in our lives,
                it is becoming increasingly important to develop our network.
                Our goal is to build those connections through a shared commonality
                of college laundry.</p>
              </CardText>
            </Card>
                <div id="my-signin2"></div>
                <RaisedButton label='Sign Out' onTouchTap={this.signOut.bind(this)}></RaisedButton>
            </div>
        );
    }
}
