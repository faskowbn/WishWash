/**
 * Created by phillyg yo whassuc on 3/31/2017.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleExpandable = () => (

  <Card>
      <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
      />
      <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
      </CardActions>
      <CardText expandable={true}>
            lmao yoooooo whassup bazinga
      </CardText>
  </Card>
);

export default CardExampleExpandable;


/*
 import React from 'react';

 let Message = React.createClass({

 render() {
 let fulfilledStatus = this.props.order.fulFilled ?
 (<div className="fulfilled">
 Fulfilled
 <div className="yes-check"></div>
 </div>) :
 (<div className="unfulfilled">
 Unfulfilled
 <div className="no-cross"></div>
 </div>);

 return (
 <div className="order">
 <div className="order-for">
 { this.props.order.receiverFirstName }
 </div>
 <div className="date-for">
 For { this.prettyDate(this.props.order.dateRequired) }
 </div>
 <div className="card-type">
 { this.props.order.cardType }, { this.props.order.subCardType }
 </div>
 { fulfilledStatus }
 </div>
 );
 },

 prettyDate: function(dateStr) {
 let date = new Date(dateStr);
 return date.toDateString();
 }
 });

 export default Message;
 */
