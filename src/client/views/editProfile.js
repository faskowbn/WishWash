/**
 * Created by brad on 3/31/2017.
 */
/*'use strict';

 import React from 'react';
 import { browserHistory } from 'react-router';

 export class Edit extends React.Component {
 constructor(props) {
 super(props);
 this.state = {first_name: '', last_name: '', password: '', primary_email: ''};

 this.handleChange = this.handleChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange(name, e) {
 let change = {};
 change[name] = e.target.value;
 this.setState(change);
 }

 //todo write handle submit and change html to call appropriate functions
 handleSubmit(event) {
 let first_name = this.state.first_name;
 let last_name = this.state.last_name;
 let password = this.state.password;
 let primary_email = this.state.primary_email;
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

 let submitEdit = function(password, email, first_name, last_name) {
 event.preventDefault();
 let username = readCookie("username");
 if (username !== null) {
 $.ajax({
 url: '/v1/edit_user',
 type: 'PUT',
 'Content-Type': "application/json",
 data: {
 'password': password,
 'primary_email': email,
 'first_name': first_name,
 'last_name': last_name,
 'username': username
 },
 success: function() {
 browserHistory.push("/profile?username=" + readCookie('username'));
 },
 error: function() {
 alert("OOPS!  Looks like your PUT didn't go through right.  Try again with valid input.");
 }
 });
 } else {
 alert("Login!");
 }
 };
 submitEdit(password,primary_email,first_name,last_name);
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

 let myName = readCookie("username");
 let url = '/v1/user/' + myName;
 if (readCookie("username") !== null) {
 $.ajax({
 url: url,
 type: 'GET',
 success: function (data) {
 console.log(data);
 $("#edit_first_name").val(data.first_name);
 $("#edit_last_name").val(data.last_name);
 $("#edit_primary_email").val(data.primary_email);
 $("#edit_username").val(data.username);
 }, error: function () {
 alert("Edit didn't work");
 }
 })
 }
 }

 render() {
 return (
 <div>
 <meta charSet="UTF-8" />
 <title>Edit</title>
 <div className="jumbotron container-fluid">
 <div className="text-center">
 My Cool Edit Page
 </div>
 </div>
 <form className="form-group center-block" onSubmit={this.handleSubmit}>
 <h1 id="edit_username" />
 first_name
 <input type="text" value={this.state.first_name} onChange={this.handleChange.bind(this, 'first_name')} className="form-control" name="first_name" id="edit_first_name" placeholder="John" />
 last_name
 <input type="text" value={this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} className="form-control" name="last_name" id="edit_last_name" placeholder="Doe" />
 password
 <input type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} className="form-control" name="password" id="edit_password" placeholder="password" />
 primary_email
 <input type="email" value={this.state.primary_email} onChange={this.handleChange.bind(this, 'primary_email')} className="form-control" name="primary_email" id="edit_primary_email" placeholder="JohnDoe@me.com" />
 <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Submit</button>
 </form>
 </div>
 );
 }
 }*/

'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class EditProfile extends React.Component {
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