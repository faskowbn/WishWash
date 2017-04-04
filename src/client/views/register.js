/**
 * Created by brad on 3/31/2017.
 */
/**
 * Created by brad on 3/31/2017.
 */

'use strict'
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import {browserHistory} from 'react-router';

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            phone_number: '',
            dorm_choice: 0,
            gender_choice: 0,
            gender_preference: 0,
            bio: '',
            open: false,
            agreement: false
        }

        //  this.handleChange = this.handleChange.bind(this);
        this.inputFirstName = this.inputFirstName.bind(this);
        this.inputLastName = this.inputLastName.bind(this);
        this.inputUsername = this.inputUsername.bind(this);
        this.inputPhoneNumber = this.inputPhoneNumber.bind(this);
        this.inputBio = this.inputBio.bind(this);
        this.chooseDorm = this.chooseDorm.bind(this);
        this.chooseGender = this.chooseGender.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setAgreement = this.setAgreement.bind(this);
        this.chooseGenderPreference = this.chooseGenderPreference.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false})
    }

    inputFirstName(event) {
        this.setState({first_name: event.target.value});
    }

    inputLastName(event) {
        this.setState({last_name: event.target.value});
    }

    inputUsername(event){
        this.setState({username: event.target.value});
    }

    inputPhoneNumber(event){
        this.setState({phone_number: event.target.value});
    }

    inputBio(event){
        this.setState({bio: event.target.value});
    }

    chooseDorm(event, index, value) {
        this.setState({dorm_choice: value});
    }

    chooseGender(event, index, value) {
        this.setState({gender_choice: value});
    }

    chooseGenderPreference(event, index, value) {
        this.setState({gender_preference: value});
    }

    setAgreement(event, index, value){
        let tmp = !(this.state.agreement);
        this.setState({agreement: tmp});
    }

    handleSubmit(event) {

        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let username = this.state.username;
        let phone_number = this.state.phone_number;
        let dorm_choice = this.state.dorm_choice;
        let gender_choice = this.state.gender_choice;
        let bio = this.state.bio;
        let agreement = this.state.agreement;
        let gender_preference = this.state.gender_preference;

        event.preventDefault();

        if(first_name === ''){
            alert("What is your name?????");
            return false;
        }

        if(last_name === ''){
            alert("Hi Mr. or Ms. ___?");
            return false;
        }

        if (!(username.length < 17 && username.length > 5)) {
            alert("Not a valid username.  Make it between 6 and 16 characters");
            return false;
        }

        if(!phone_number.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g)){
            alert("#swerve\n(Valid Input - 1234567889 or 123-456-7890 or 123.456.7890)");
            return false;
        }

        if(dorm_choice === 0){
            alert("I won't stalk you, promise\nPlease enter what dorm you do laundry in");
            return false;
        }

        if(gender_choice === 0){
            alert("What do you identify with? #genderisaconstruct");
            return false;
        }

        if(gender_preference === 0) {
            alert("Please pick washer gender prefernece (or lack thereof)");
            return false;
        }

        if(!agreement){
            alert("AGREE TO THE TERMS AND CONDITIONS");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/v1/user",
            data: {'first_name': first_name, 'last_name': last_name,
                'username':username, 'phone':phone_number, 'gender':gender_choice,
                'genderOfWasher':gender_preference, 'location':dorm_choice,
                'primary_email': localStorage.getItem('email')},
            success: function(id) {
                localStorage.removeItem('email');
                this.props.route.user.logIn(id);
                console.log(id);
                browserHistory.push('/profile/' + username);
            }.bind(this),
            error: function(err) {
                alert("Registration failed. Try again! Here was the error: " + err.responseText);
            }
        })
    }

    render() {

        let header = (<div>
            <h1>WishWash Registration</h1>
            <h2>Sign Up Below!</h2>
        </div>);

        const style = {
            left: '50%',
            transform: 'translateX(-50%)',
            float: 'left',
            clear: 'left',
        };

        return (
            <div>
                <Card style={{width:'50%'}}>
                    <paper style={{textAlign:'center'}}>
                        {header}
                        <TextField style={style} hintText="Cornelius" floatingLabelText="First Name" value={this.state.first_name} onChange={this.inputFirstName}
                                   id="first_name" label="first name" /><br />
                        <TextField style={style} hintText="Vanderbilt" floatingLabelText="Last Name" value={this.state.last_name} onChange={this.inputLastName}
                                   id="last_name" label="last name" /><br />
                        <TextField style={style} hintText="ZepposDaKing999" floatingLabelText="Enter Username" value={this.state.username} onChange={this.inputUsername}
                                   id="username" label="username" /><br />
                        <TextField style={style} hintText="Gimmie dem digits" floatingLabelText="Phone Number" value={this.state.phone_number} onChange={this.inputPhoneNumber}
                                   id="phone_number" label="phone number" /><br />
                        <br />

                        <DropDownMenu style={style} value={this.state.dorm_choice} onChange={this.chooseDorm}>
                            <MenuItem value={0}   primaryText="What dorm do you do laundry in?" />
                            <MenuItem value={1} primaryText="Branscomb" />
                            <MenuItem value={2} primaryText="Commons" />
                            <MenuItem value={3} primaryText="Towers" />
                            <MenuItem value={4} primaryText="Kissam" />
                            <MenuItem value={5} primaryText="Blakemore" />
                        </DropDownMenu>
                        <br />
                        <br />

                        {/*this.state.gender_choice = data that contains what user chose
                         value = attribute, not variable*/}
                        <DropDownMenu style={style} value={this.state.gender_choice} onChange={this.chooseGender}>
                            <MenuItem value={0} primaryText="What gender do you identify as?" />
                            <MenuItem value={1} primaryText="Male" />
                            <MenuItem value={2} primaryText="Female" />
                            <MenuItem value={3} primaryText="Non-Binary" />
                            <MenuItem value={4} primaryText="Other" />
                        </DropDownMenu><br /><br />

                        <DropDownMenu style={style} value={this.state.gender_preference} onChange={this.chooseGenderPreference}>
                            <MenuItem value={0} primaryText="Preference for gender that does your laundry?" />
                            <MenuItem value={1} primaryText="Male" />
                            <MenuItem value={2} primaryText="Female" />
                            <MenuItem value={3} primaryText="No Preference" />
                        </DropDownMenu><br />

                        <TextField style={style} hintText="I love WishWash" floatingLabelText="Tell us about yourself!" value={this.state.bio} onChange={this.inputBio}
                                   id="bio" label="bio"/><br />
                        <br />

                        <Checkbox label="I have read and agreed to the WishWash Terms and Conditions" onCheck={this.setAgreement} /><br />

                        <RaisedButton label="Terms and Conditions" onTouchTap={this.handleOpen} />
                        <Dialog title="WishWash Terms and Conditions" open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
                            <br /><span style={{color: '#ff0000'}}>Terms of Service</span><br /><br />
                            WishWash ("we", "us", "our", "WishWash") present the following terms and conditions, which govern your use of the WishWash site (Website).
                            The Website is offered subject to your acceptance, without modification, of all of the terms and conditions contained within, along with all
                            other operating rules, policies and procedures that may be published from time to time on this Website by us (collectively, the Agreement).
                            Please read this Agreement carefully before accessing or using the Website. By accessing or using any part of the Website, you agree that you
                            are bound by the terms and conditions of this Agreement. If you do not agree to all the terms and conditions of this Agreement, then you may not
                            access the Website or use any services.<br /><br />
                            <span style={{color:'#ff4d4d'}}>Limitation of Liability</span><br /><br />
                            You expressly understand and agree that in no event will WishWash be liable with respect to any subject matter of this agreement under any contract,
                            negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement
                            or substitute products or services; (iii) interruption of use or loss or corruption of data; (iv) any statements or conduct of any third party on the
                            service; or (v) any unauthorized access to or alterations of your Content. We shall have no liability for any failure or delay due to matters
                            beyond our reasonable control.
                        </Dialog>
                        <br /><br />

                        <RaisedButton className="raised-button" style={{align: 'center'}} label="Submit" onTouchTap={this.handleSubmit.bind(this)} />
                    </paper>
                </Card>
            </div>
        );
    }
}


/*use strict';
 <input type='Checkbox'>I have read and agreed to the <a href="http//:google.com">Wish Wash terms of condition</a></input>
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
/*'use strict';
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
 <h2>This is a test</h2>
 </div>
 );
 }
 }*/