/**
 * Created by Zac Romick on 3/31/2017.
 */

/* Description: This is where the user will access profile information about themselves or others*/

'use strict';

import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';

let user = {
    first_name: "first_name is not set",
    last_name: "last_name is not set",
    username: "username is not set",
    primary_email: "primary_email is not set",
    phone: "What's yo number?",
    gender: "gender of wisher is not set",
    genderOfWasherPreferences: "gender preferences are not set",
    location: "location is not set",
    imageUrl: "google image url not set",
    created: "April 2nd, 2017.",
    loadsWished: 0,
    loadsWashed: 0,
    averageWashRating: -1,
    bio: "Describe yourself - Tell us why you're here!"
    //For seeing other user (visibility): everything is available except genderOfWasher
}

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        //let user = this.props.routes.user.getUser();

        this.state = {
            otherUser: undefined,
            phone: 123456789,
            gender: 4,
            genderPreferences: 3,
            location: 1,
            bio: "",
            user: undefined};
        this.handlePrimaryPhoneChange = this.handlePrimaryPhoneChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleGenderPreferencesChange = this.handleGenderPreferencesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
    }

    handleFieldChange(event, index, value, field) {
        let user = this.state.user;
        user['field'] = value;
        $.ajax({
            type: 'PUT',
            url: '/v1/user',
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                gender: user.gender,
                genderOfWasherPreferences: user.genderOfWasherPreferences,
                location: user.location,
                imageUrl: user.imageUrl,
                bio: user.bio
            },
            success: function (data) {
                this.setState({user: user});
            }.bind(this),
            error: function (err) {
                alert("could not edit user information)");
            }
        }.bind(this))
    }

    handlePrimaryPhoneChange(event, value){
        this.setPrimaryPhone(value);
        this.setState({phone: value});
    }

    handleGenderChange(event, index, value){
        this.setGender(value);
        this.setState({gender: value});
    }

    handleGenderPreferencesChange(event, index, value){
        this.setGenderPreferences(value);
        this.setState({genderPreferences: value});
    }

    handleLocationChange(event, index, value){
        this.setLocation(value);
        this.setState({location: value});
    }

    handleBioChange(event, value){
        this.setBio(value);
        this.setState({bio: value});
    }


    /* setFirstName
     * For users
     */
    setFirstName(newFirst){
        user.first_name = newFirst;
    }

    /* setLastName
     * For users
     */
    setLastName(newLast){
        user.last_name = newLast;
    }

    /* setUsername
     * For internal use only
     */
    setUsername(newUsername){
        user.username = newUsername;
    }

    /* setPrimaryEmail
     * For internal use only
     */
    setPrimaryEmail(newEmail){
        user.email1 = newEmail;
    }

    /* setPrimaryPhone
     * For users
     */
    setPrimaryPhone(newPhone){
        user.phone1 = newPhone;
    }

    /* setGender
     * For users
     */
    setGender(newGender){
        user.gender = newGender;
    }

    /* setGenderPreferences
     * For users
     */
    setGenderPreferences(newPreferences){
        user.genderOfWasherPreferences = newPreferences;
    }

    /* setLocation
     * For users
     */
    setLocation(newLocation){
        user.location = newLocation;
    }

    /* setLoadsWished
     * For internal use only
     */
    setLoadsWished(newWishCount){
        user.loadsWished = newWishCount;
    }

    /* setLoadsWashed
     * For internal use only
     */
    setLoadsWashed(newWashCount){
        user.loadsWashed = newWashCount;
    }

    /* setAWR
     * For internal use only
     */
    setAWR(newRating){
        user.averageWashRating = newRating;
    }

    /* setBio
     * For users
     */
    setBio(newBio){
        user.bio = newBio;
    }

    setState(value){
        let user = this.state.user;
        user['field'] = value;
        //This needs to be fixed as a general set statement
        //Everything else can be deleted (but keep it until this works)
    }

    componentDidMount(){
        $.ajax({
            type: "GET",
            //url: "/v1/user/username/" + user.username,
            url: "/v1/user/username/zrom",
            //url: "/v1/user/username/zro"
            success: function(user) {
                console.log(user);
                this.setState({
                    "bio": user.bio,
                    "location": user.location,
                    "phone": user.phone,
                    "gender": user.gender,
                    "genderPreferences": user.genderPreferences,
                    "user": user
                })
            }.bind(this),
            error: function(err) {
                alert("cannot load user");
                browserHistory.push("/messageBoard")
            }
        })
    }

    render() {
        //render should have an if statement to check if profile is you
        let name = user.first_name + " " + user.last_name;
        let profilePicture = user.imageUrl;
        let username = "Username:\n" + user.username;
        let email1 = "Primary Email:\n" + user.primary_email;
        let phone1 = user.phone;
        let gender = "Gender:\n" + user.gender;
        let genderPreferences = "Prefered Washer Genders:\n" + user.genderOfWasherPreferences;
        let location = "Residence Hall:\n" + user.location;
        let dateUserCreated = "Your account was created on\n" + user.created;
        let loadsWished = "Total granted wishes:\n" + user.loadsWished;
        let loadsWashed = "Total wishes washed:\n" + user.loadsWashed;
        let averageWashRating = user.averageWashRating;
        let bio = user.bio;
        let grayStar = "https://i.imgur.com/wGvUNJ6.png";
        let yellowStar = "https://i.imgur.com/kc8B7i7.png";
        let halfStar = "https://i.imgur.com/T2UYRwF.png";

        /* getStars
         * returns pictures of 0 to 5 stars, else shows nothing.
         * */
        function getStars(averageWashRating){
            let raisedRating = Math.ceil(averageWashRating);
            if (raisedRating == 5){
                return yellowStar;
            }
            else {
                return "";
            }
        }

        const style = {
            display: 'inline-block',
            margin: '16px 32px 16px 0',
        };

        let view = this.state.user === undefined ? (<h1>Loading profile...</h1>) :
            (
                <div>
                    <Card>
                        <CardHeader
                            title={<h1>{name}</h1>}
                            subtitle={<h3>{bio}</h3>} //replace with text field
                            avatar={<Avatar
                                src = {profilePicture}
                                size={200}
                            />}
                        />

                        <MenuItem primaryText={username}/>

                        <MenuItem primaryText={email1}/>

                        <TextField hintText={phone1} style={{margin: 15, color: '#000000'}} floatingLabelText="Phone Number"
                                   onChange={this.handleFieldChange}/>
                        <br />

                        <label style={{margin: 15, color: '#000000', display: 'inline-block'}}>Residence Hall</label><br />
                        <DropDownMenu value={this.state.user.location} onChange={this.handleFieldChange}>
                            <MenuItem value={1} primaryText="Branscomb" />
                            <MenuItem value={2} primaryText="Commons" />
                            <MenuItem value={3} primaryText="Towers" />
                            <MenuItem value={4} primaryText="Kissam" />
                            <MenuItem value={5} primaryText="Blakemore" />
                        </DropDownMenu>
                        <br />
                        <br />

                        <label style={{margin: 15, color:'#000000'}}>Gender</label><br />
                        <DropDownMenu value={this.state.user.gender} onChange={this.handleFieldChange}>
                            <MenuItem value={1} primaryText="Male" />
                            <MenuItem value={2} primaryText="Female" />
                            <MenuItem value={3} primaryText="Non-Binary" />
                            <MenuItem value={4} primaryText="Other" />
                        </DropDownMenu>
                        <br />
                        <br />

                        <label style={{margin: 15, color:'#000000'}}>Gender Preference</label><br />
                        <DropDownMenu value={this.state.user.genderPreferences} onChange={this.handleFieldsChange}>
                            <MenuItem value={1} primaryText="Male" />
                            <MenuItem value={2} primaryText="Female" />
                            <MenuItem value={3} primaryText="No Preference" />
                        </DropDownMenu>
                        <br />
                        <br />

                        <MenuItem primaryText={loadsWished}/>

                        <MenuItem primaryText={loadsWashed}/>

                        <MenuItem primaryText={dateUserCreated}/>

                    </Card>
                </div>
            );

        return (
            <div>
                {view}
            </div>
        );
    }
}

