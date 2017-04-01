/**
 * Created by brad on 3/31/2017.
 */
/**
 * Created by brad on 3/31/2017.
 */
/*use strict';

 import React from 'react';
 import { browserHistory } from 'react-router';

 export class Signup extends React.Component {
 constructor(props) {
 super(props);
 this.state = {username: '', first_name: '', last_name: '', password: '', city: '', primary_email: ''};

 this.handleChange = this.handleChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange(name, e) {
 let change = {};
 change[name] = e.target.value;
 this.setState(change);
 }

 handleSubmit(event) {
 let username = this.state.username;
 let first_name = this.state.first_name;
 let last_name = this.state.last_name;
 let password = this.state.password;
 let city = this.state.city;
 let primary_email = this.state.primary_email;
 event.preventDefault();
 let checkUsername = function(username) {
 if (!(username.length < 17 && username.length > 5)) {
 alert("Not a valid username.  Make it between 6 and 16 characters");
 return false;
 }

 if (/[^a-zA-Z0-9]/.test(username)) {
 alert("Not a valid username.  Make everything alphanumeric");
 return false;
 }

 return true;
 };

 let checkPassword = function(password) {
 if (password.length < 9) {
 alert("Not a valid password.  Make it longer than 8 characters");
 return false;
 }

 if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-])[0-9a-zA-Z!@#$%^&*_-]{8,}$/.test(password))) {
 alert("Not a valid password.  Need at least one lowercase, one uppercase, one digit, and one symbol");
 return false;
 }

 return true;
 };

 let checkEmail = function(email) {
 //source : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return regex.test(email);
 };

 let signupAjax = function(username, password, email, first_name, last_name, city) {
 event.preventDefault();
 $.ajax({
 url: '/v1/user',
 type: 'POST',
 'Content-Type': "application/json",
 data: {
 'username': username,
 'password': password,
 'primary_email': email,
 'first_name': first_name,
 'last_name': last_name,
 'city': city
 },
 success: function() {
 document.cookie = "username=" + username;
 $.ajax({
 url: '/v1/session',
 type: 'POST',
 'Content-Type': 'application/json',
 data: {
 'username': username,
 'password': password
 },
 success: function() {
 document.cookie = "username=" + username;
 //window.location.replace("/start.html");
 browserHistory.push("/start");
 },
 error: function() {
 alert("OOPS!  Looks like your post didn't go through right.  Try again.");
 //window.location.replace("/login.html");
 browserHistory.push("/login");
 }
 });
 },
 error: function() {
 alert("OOPS!  Looks like your post didn't go through right.  Try again with valid input.");
 browserHistory.push("/signup");
 }
 })
 };

 let validateSignupandSend = function(username, password, email, first_name, last_name, city) {
 if (!checkUsername(username)) {
 return false;
 }

 if (!checkPassword(password)) {
 return false;
 }

 if (!checkEmail(email)) {
 return false;
 }

 signupAjax(username, password, email, first_name, last_name, city);
 };

 validateSignupandSend(username, password, primary_email, first_name, last_name, city)
 }

 render() {
 return (
 <div>
 <meta charSet="UTF-8" />
 <title>Signup</title>
 <div className="jumbotron container-fluid">
 <div className="text-center">
 My Cool Signup Page
 </div>
 </div>
 <div className="container">
 <div className="text-left">
 <h2>You Should Definitely Sign Up</h2>
 </div>
 <form className="form-group center-block" onSubmit={this.handleSubmit}>
 <table className="table center-block">
 <thead>
 <tr><th>Label</th>
 <th>Input</th>
 </tr></thead>
 <tbody>
 <tr>
 <td>username</td>
 <td>
 <input type="text" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} className="form-control" name="username" id="username" placeholder="ILikeSam8080" />
 </td>
 </tr>
 <tr>
 <td>first_name</td>
 <td>
 <input type="text" value={this.state.first_name} onChange={this.handleChange.bind(this, 'first_name')} className="form-control" name="first_name" id="first_name" placeholder="John" />
 </td>
 </tr>
 <tr>
 <td>last_name</td>
 <td>
 <input type="text" value={this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} className="form-control" name="last_name" id="last_name" placeholder="Doe" />
 </td>
 </tr>
 <tr>
 <td>password</td>
 <td>
 <input type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} className="form-control" name="password" id="password" placeholder="password" />
 </td>
 </tr>
 <tr>
 <td>city</td>
 <td>
 <input type="text" value={this.state.city} onChange={this.handleChange.bind(this, 'city')} className="form-control" name="city" id="city" placeholder="Atlantis" />
 </td>
 </tr>
 <tr>
 <td>primary_email</td>
 <td>
 <input type="email" value={this.state.primary_email} onChange={this.handleChange.bind(this, 'primary_email')} className="form-control" name="primary_email" id="primary_email" placeholder="JohnDoe@me.com" />
 </td>
 </tr>
 </tbody>
 </table>
 <button type="submit" className="btn btn-primary">Submit</button>
 </form>
 </div>
 </div>
 );
 }
 }*/
'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>We are excited you're here </h1>
            </div>
        );
    }
}