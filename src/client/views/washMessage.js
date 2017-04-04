/**
 * Created by brad on 3/31/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';
import {Message} from '../components/message';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
//import 'typeface-Roboto';
/*
TODO location
TODO timeRange
TODO loadCount
TODO comments

Questions for brad:
How to differentiate the wisher and washer messages?

*/
/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
 const bStyle={
   margin: 12,
 };

/*
TODO
wisher messages should have the following:
status,
washer
created:
timeRange--Date
loadCount
workAmount [option between wash, wash&dry, wash&dry&fold]
comments
Wash, Dry, Fold (checked already)
"Choose Dropoff Location"
-- actually, though, we don't need lcoation bc it can be imported from profile
*/

let message = {
  washer: "zrom",
  availableLocations: null,
  timeRangeLow: Date.now(),
  timeRangeHigh: Date.now(),
  comments: "",
  suggestedPrice: null,
  status: "Open"
}

const pStyle={
  fontSize: 16,
  color: '#333',
  //fontFamily: 'Roboto, sans-serif',
  lineHeight: 0.3,
}

const dorms=[
  'Branscomb',
  'Kissam',
  'Towers',
  'Commons'
]

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */


export class WashMessage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
                  timeRangeL: null,
                  timeRangeH: null,
                  availableLocations: [],
                  comments: "",
                  suggestedPrice: null};
    this.handleDateLChange = this.handleDateLChange.bind(this);
    this.handleDateHChange = this.handleDateHChange.bind(this);
    this.handleDormChange = this.handleDormChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    }


  handleDateLChange(event,date){
    this.setDateL(date);
    this.setState({timeRangeL: date});
  }
  handleDateHChange(event,date){
    this.setDateH(date);
    this.setState({timeRangeH: date});
  }

  menuItems(values){
    return dorms.map( (dorm)=> (
      <MenuItem
        key={dorm}
        insetChildren={true}
        checked={values && values.includes(dorm)}
        value={dorm}
        primaryText={dorm}
        />
    ));
  }

  handleTouchTap(event){
    console.log({message})
    $.ajax({
      url: '/v1/washMessage',
      type: 'POST',
      data: {
        washer: message.washer,
        availableLocations: message.availableLocations,
        timeRangeLow: message.timeRangeLow,
        timeRangeHigh: message.timeRangeHigh,
        comments: message.comments,
        suggestedPrice: message.suggestedPrice
      },
      success: function(newMessage) {
        console.log(newMessage);
        //<Link ...> link to
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
  handleDormChange(event,index,values){
    var newArr = this.state.availableLocations.slice();
    newArr.push(values);
    this.setState({availableLocations: newArr});
    this.setLocations(newArr);

  }
  handleCChange(event,msg){
    this.setComments(msg);
    this.setState({comments: msg});
  }
  handlePChange(event,price){
    this.setPrice(price);
    this.setState({suggestedPrice: price});
  }


  setLocations(mLocations){
    message.availableLocations=mLocations;
  }
  setDateL(mDateL){
    message.timeRangeLow = mDateL;
  }
  setDateH(mDateH){
    message.timeRangeHigh = mDateH;
  }
  setComments(mComment){
    message.comments = mComment;
  }
  setPrice(mPrice){
    message.suggestedPrice = mPrice;
  }


  render() {
    console.log({message})
    return (
      <div>
        <p style={pStyle}> Date Range For Pickup </p>
        <DatePicker
          hintText="Desired Date For Pickup (Lo)"
          value={this.state.timeRangeL}
          onChange={this.handleDateLChange}
          />
          <br />
        <DatePicker
          hintText="Desired Date for Pickup(Hi)"
          value={this.state.timeRangeH}
          onChange={this.handleDateHChange}
          />
          <br />

      <div>
        <p style={pStyle}> Available Locations </p>
        <SelectField multiple={true}
            hintText="Select a Dorm"
            value={this.state.availableLocations}
            onChange={this.handleDormChange}>
          {this.menuItems(this.state.availableLocations)}
        </SelectField>
      </div>
      <div>
        <TextField
          floatingLabelText="Suggested Price Per Load (in Dollars)"
          id="tField-Price"
          onChange={this.handlePChange}/> <br />

      </div>

      <div>
          <TextField
              floatingLabelText="Additional Comments"
              id="tField-comment"
              onChange={this.handleCChange} /> <br/>
        </div>
          <RaisedButton
          label="Post Message"
          primary={true} style={bStyle}
          onClick={this.handleTouchTap}/>
    </div>
    );
  }
}
