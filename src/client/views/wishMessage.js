
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
  wisher: "phillyg",
  primary_phone: "primary_phone is not set",
  workAmount: "service_request is not set",
  loadCount: 1,
  location: "location is not set",
  comments: "",
  suggestedPrice: 0,
  dateMade: Date.now(),
  timeRangeLow: Date.now(),
  timeRangeHigh: Date.now(),
  status: "Open"
}

const pStyle={
  fontSize: 16,
  color: '#333',
  //fontFamily: 'Roboto, sans-serif',
  lineHeight: 0.3,
}


/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */


export class WishMessage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
                  view: "toChoose",
                  timeRangeL: null,
                  timeRangeH: null,
                  work_choice: null,
                  loadCount: null,
                  comments: "",
                  suggestedPrice: null};
    this.handleDateLChange = this.handleDateLChange.bind(this);
    this.handleDateHChange = this.handleDateHChange.bind(this);
    this.handleWorkChange = this.handleWorkChange.bind(this);
    this.handleLoadChange = this.handleLoadChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
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

  handleWorkChange(event, index, value){
    if(value===1){
      this.setServiceReq("wash");
    } else if(value===2){
      this.setServiceReq("wash & dry");
    } else if(value===3){
      this.setServiceReq("wash, dry, and fold");
    }
    this.setState({work_choice:value});
  }
  handleLoadChange(event,index,value){
    this.setLoad(value);
    this.setState({loadCount: value});
  }
  handleCChange(event,msg){
    this.setComments(msg);
    this.setState({comments: msg});
  }
  handleTouchTap(event){
    console.log({message})
    $.ajax({
      url: '/v1/wishMessage',
      type: 'POST',
      data: {
        wisher: message.wisher,
        location: message.location,
        timeRangeLow: message.timeRangeLow,
        timeRangeHigh: message.timeRangeHigh,
        loadCount: message.loadCount,
        workAmount: message.workAmount,
        comments: message.comments
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

  handlePChange(event,price){
    this.setPrice(price);
    this.setState({suggestedPrice: price});
  }

  setOwner(mOwner){
    message.wisher = mOwner;
  }

  setPhone(mPhone){
    message.primary_phone = mPhone;
  }
  setServiceReq(mService){
    message.workAmount = mService;
  }
  setLoad(mLoad){
    message.loadCount=mLoad;
  }
  setComments(mComment){
    message.comments=mComment;
  }

  setDateL(mLDate){
    message.timeRangeLow=mLDate;
  }
  setDateH(mHDate){
    message.timeRangeHigh=mHDate;
  }

  setPrice(mPrice){
    message.suggestedPrice = mPrice;
  }


  setStatus(mStatus){
    message.status=mStatus;
  }



  render() {

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
      <p style={pStyle}> Service Requested</p>
      <SelectField
        value={this.state.work_choice}
        onChange={this.handleWorkChange}
        hintText="Select Service">
        <MenuItem value={1} primaryText="wash"/>
        <MenuItem value={2} primaryText="wash and dry"/>
        <MenuItem value={3} primaryText="wash, dry, and fold"/>
      </SelectField>
      </div>

      <div>
        <p style={pStyle}> Number of Loads </p>
        <SelectField value={this.state.loadCount}
          onChange={this.handleLoadChange}
          hintText="Select Load Amount">
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4+"/>
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
              onChange={this.handleCChange}/> <br/>
        </div>
          <RaisedButton
          label="Post Message"
          primary={true} style={bStyle}
          onClick={this.handleTouchTap}/>
    </div>
    );
  }
}
