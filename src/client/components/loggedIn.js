/**
 * Created by brad on 4/4/2017.
 */
'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {FlatButton} from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export class LoggedIn extends React.Component {
    constructor(props) {
        super(props);

        this.pageChange = this.pageChange.bind(this);
        this.signout = this.signout.bind(this);
    }

    pageChange(page, event) {
        if (page === "profile") {
            browserHistory.push("/profile/" + this.props.user.data.username);
        } else {
            browserHistory.push("/" + page);
        }
    }

    signout(event) {
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            this.props.user.loggedIn = false;
            console.log('User signed out.');
            browserHistory.push("/");
        }.bind(this));
    }

    render() {
        return (
            <div>
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem primaryText="My Profile" onTouchTap={this.pageChange.bind(this, "profile")}/>
                    <MenuItem primaryText="Message Board" onTouchTap={this.pageChange.bind(this, "messageBoard")}/>
                    <MenuItem primaryText="Create Message" onTouchTap={this.pageChange.bind(this, "createMessage")}/>
                    <MenuItem primaryText="Sign out" onTouchTap={this.signout}/>
                </IconMenu>
            </div>
        );
    }
}