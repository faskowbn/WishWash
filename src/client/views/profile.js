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
import {browserHistory} from 'react-router';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        //let user = this.props.routes.user.getUser();

        this.state = {
            user: undefined
        };
        this.handleFieldChange = this.handleFieldChange.bind(this)
        /*
        this.handlePrimaryPhoneChange = this.handlePrimaryPhoneChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleGenderPreferencesChange = this.handleGenderPreferencesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        */
    }

    handleFieldChange(event, index, value, field) {
        let user = this.state.user;
        user[field] = value;
        $.ajax({
            type: 'PUT',
            url: '/v1/user',
            data: {
                first_name: this.state.user.first_name,
                last_name: this.state.user.last_name,
                phone: this.state.user.phone,
                gender: this.state.user.gender,
                genderOfWasherPreferences: this.state.user.genderOfWasherPreferences,
                location: this.state.user.location,
                imageUrl: this.state.user.imageUrl,
                bio: this.state.user.bio
            },
            success: function (data) {
                this.setState({user: user});
            }.bind(this),
            error: function (err) {
                alert("could not edit user information)");
            }
        }.bind(this))
    }

    componentDidMount(){
        $.ajax({
            type: "GET",
            //url: "/v1/user/username/" + user.username,
            url: "/v1/user/username/" + this.props.route.user.data.username,
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

        let view;
        if (this.state.user === undefined)  {
            return (<div>
                <h1>Loading profile...</h1>
                </div>);
        } else {
            //render should have an if statement to check if profile is you
            let name = this.state.user.user.first_name + " " + this.state.user.user.last_name;
            let profilePicture = this.state.user.user.imageUrl;
            let username = "Username:\n" + this.state.user.user.username;
            let email1 = "Primary Email:\n" + this.state.user.user.primary_email;
            let phone1 = this.state.user.user.phone;
            let gender = "Gender:\n" + this.state.user.user.gender;
            let genderPreferences = "Prefered Washer Genders:\n" + this.state.user.user.genderOfWasherPreferences;
            let location = "Residence Hall:\n" + this.state.user.user.location;
            let dateUserCreated = "Your account was created on\n" + this.state.user.user.created;
            let loadsWished = "Total granted wishes:\n" + this.state.user.user.loadsWished;
            let loadsWashed = "Total wishes washed:\n" + this.state.user.user.loadsWashed;
            let averageWashRating = this.state.user.user.averageWashRating;
            let bio = this.state.user.user.bio;
            let grayStar = "https://i.imgur.com/wGvUNJ6.png";
            let yellowStar = "https://i.imgur.com/kc8B7i7.png";
            let halfStar = "https://i.imgur.com/T2UYRwF.png";

            const style = {
                display: 'inline-block',
                margin: '16px 32px 16px 0',
            };

            view = (
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

        }

        return (
            <div>
                {view}
            </div>
        );
    }
}

