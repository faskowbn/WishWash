/**
 * Created by brad on 3/31/2017.
 */
/*import React from 'react';
 import { Link } from 'react-router';

 import OrderList from './../../components/orderlist';

 let Orders = React.createClass({
 getInitialState: function(){
 let userid = this.getUserid();
 this.getOrders(userid);
 return {
 admin: false,
 userid: userid,
 orders: []
 };
 },
 render() {
 var createNewOrder = this.state.admin ?
 null : (<Link to={'/order/'+this.state.userid} className="new-order-button center-text">Create New Order</Link>);

 return (
 <div className="container app">
 { createNewOrder }
 <OrderList
 orders={this.state.orders}/>
 </div>
 );
 },

 getOrders: function(userid, cb) {
 var self = this;
 $.get('/v1/orders/'+userid,
 function(data) {
 self.setState({
 orders: data.orders
 });
 });
 },

 getUserid: function() {
 let pathParts = window.location.pathname.split('/');
 return pathParts[pathParts.length - 1];
 }
 });

 export default Orders;*/

'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Wish Wash Message Board</h1>
                <h2>Wash Messages</h2>
                <h2>Wish Messages</h2>
            </div>
        );
    }
}
