/**
 * Created by brad on 3/31/2017.
 */
/*'use strict';

 import React from 'react';
 import md5 from "react-native-md5";
 import { Link } from 'react-router';

 class Game extends React.Component {
 constructor(props) {
 super(props);
 }

 render() {
 return <span>
 <span>{this.props.game.type} </span>
 <span>{this.props.game.start_date} </span>
 <span>Still Going</span>
 </span>;
 }
 }

 export class Profile extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 games: {}
 }
 }

 componentWillMount() {
 let readCookie = function(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
 var c = ca[i];
 while (c.charAt(0)==' ') c = c.substring(1,c.length);
 if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
 };

 let myUsername = readCookie("username");
 if (myUsername === null) {
 $("#loginSignupSignout").html("<h4><a href=\"/login\">Login</a></h4>\n<h4><a href=\"/signup\">Signup</a></h4>");
 } else {
 let url = '/v1/user/' + myUsername;
 $.ajax({
 url: url,
 type: 'GET',
 success: function (data) {
 $("#first_name").html(data.first_name);
 $("#last_name").html(data.last_name);
 $("#primary_email").html(data.primary_email);
 $("#username").html(data.username);
 let emailHash = md5.hex_md5(data.primary_email).trim().toLowerCase();
 $("#gravitar").html("<img class=\"img-circle center-block\" src=\"https://www.gravatar.com/avatar/" + emailHash + "?s=80\">");
 if (readCookie("username") === data.username) {
 $("#loginSignupSignout").html("<h4><a href=\"/logout\">Logout</a></h4>\n<h4><a href=\"/edit\">Edit</a></h4>");
 let gameUrl = '/v1/getGame/' + data.username;
 $.ajax({
 url: gameUrl,
 type: 'GET',
 success: function (games) {
 this.setState({games: games});
 }.bind(this)
 })
 }
 }.bind(this),
 error: function () {
 alert("Profile did not load correctly");
 }
 })
 }
 }

 render() {
 let games = null;
 if (!_.isEmpty(this.state.games)) {
 games = [];
 let count = 0;
 _.each(this.state.games, function(game) {
 games.push(<Game key={count} game={game}/>);
 count++;
 });
 }

 return (
 <div>
 /*
/*
<meta charSet="UTF-8" />
<title>Profile</title>
<div className="jumbotron container-fluid">
    <div className="text-center">
    My Cool Profile Page
</div>
</div>
<div className="container">
    <div className="row">
    <div className="col-xs-6">
    <div id="gravitar" />
    */
    {/*<img class="img-circle center-block" src="https://s.gravatar.com/avatar/ca22f76ac504513211236b8264689406?s=80">*/}
    /*
<div className="text-center">
    <h1 id="username" />
    <h3>Can beat Solitaire with no hands</h3>
    <div id="loginSignupSignout">
    */
        {/*<h4><a href="/login.html">Login</a></h4>*/}
        {/*<h4><a href="/signup.html">Signup</a></h4>*/}
        /*
    </div>
</div>
</div>
<div className="col-xs-6">
    <table className="table center-block">
    <thead>
    <tr><th>Label</th>
    <th>User Info</th>
</tr></thead>
<tbody>
<tr>
<td>first_name</td>
<td id="first_name" />
    </tr>
    <tr>
    <td>last_name</td>
    <td id="last_name" />
    </tr>
    <tr>
    <td>city</td>
    <td>Mission Viejo</td>
</tr>
<tr>
<td>primary_email</td>
<td id="primary_email" />
    </tr>
    <tr>
    <td>looking fly percent</td>
<td>100%</td>
</tr>
</tbody>
</table>
</div>
</div>
<br />
<div className="row">
    <div className="col-xs-6 col-xs-offset-3">
        <table className="table center-block">
            <thead>
            <tr><th>Label</th>
                <th>Personal Metrics</th>
            </tr></thead>
            <tbody>
            <tr>
                <td>Games Played</td>
                <td>22</td>
            </tr>
            <tr>
                <td>Win Ratio</td>
                <td>13W to 9L</td>
            </tr>
            <tr>
                <td>Fastest Win</td>
                <td>9s</td>
            </tr>
            <tr>
                <td>High Score</td>
                <td>623</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div className="col-xs-6 col-xs-offset-3">
    <table className="table center-block">
        <thead>
        <th>Type</th>
        <th>Date</th>
        <th>Duration</th>
        <th><Link to="/start">Start</Link></th>
        <th><Link to="/start">Review</Link></th>
        </thead>
    </table>
    {games}
</div>
</div>
</div>
);
}
}
*/

'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        $.ajax({
            url: "/v1/user/username/hey",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/filter/messages/location/branscomb",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/washMessage/1234",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/user/username/1234",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/wishMessage/1234",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/user/id/58dfed25057dd41df484d0d7",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/user/username/zromi",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/wishMessage/58dfffc3881c1b0fdcd88be3",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        $.ajax({
            url: "/v1/user/email/zrom@vanderbilt.edu",
            type: "GET",
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err.responseText);
            }
        });
        */
    }

    render() {
        return (
            <div>
                <h1>We are excited you're here </h1>
            </div>
        );
    }
}