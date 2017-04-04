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
import {WashMessage} from './washMessage'
import {WishMessage} from './wishMessage'
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
 const pStyle={
   fontSize: 16,
   color: '#333',
   //fontFamily: 'Roboto, sans-serif',
   lineHeight: 0.3,
 }

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




/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */

const types = [
  'wisher',
  'washer'
];

export class CreateMessage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        view:"toChoose"};
    this.handleVChange=this.handleVChange.bind(this);

    }
//im aware this is shitty code
handleVChange(event,val){
  if(val === 0)
  {
  this.setState({view: "wisher"});
} else {
  this.setState({view: "washer"});
}
}

menuItems(){
  return types.map( (type)=>(
    <MenuItem
    key={type}
    insetChildren={true}
    value={type}
    primaryText={type} />
  ));
}

  render() {
    let view = null;
    console.log(this.state.view);
    if (this.state.view === "toChoose") {
        view = (
          <div>
          <SelectField value={this.state.view}
          onChange={this.handleVChange}
          floatingLabelText="Are you a..?">
          {this.menuItems()}
          </SelectField>
          </div>
        );
    } else if (this.state.view === "wisher") {
      view = (
    <div>    <WishMessage/></div>
      );
    } else if (this.state.view === "washer") {
      view = (
      <div>  <WashMessage /></div>
      );
    } else {
        view = (<div><h1>unrecognized view</h1></div>);
    }
    return (
      <div>
     {view}
     </div>
    );
  }
}
