/**
 * Created by brad on 3/31/2017.
 */

/*
import React from 'react';

let NewOrder = React.createClass({
    getInitialState: function(){
        let userid = this.getUserid();
        return {
            userid: userid
        };
    },
    render() {
        let twoWeeks = this.getTwoWeeksString();

        return (
            <div className="container app">
                <p className="new-card-question">
                    Tell us who the card is for:
                </p>
                <br/>
                <input ref="firstName" type="text" name="namefor" placeholder="Grandma" />

                <br/><br/>

                <p className="new-card-question">
                    When is the special day?
                </p>
                <p className="new-card-question-comment">
                    We'll get you send you the card two weeks in advance.
                </p>
                <br/>
                <input ref="date" type="date" name="datefor" min={twoWeeks} />
                <br/><br/>
                <p className="new-card-question">
                    What type of card for this occasion?
                </p>
                <br/>
                <select ref="selectType">
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Mother's Day">Mother's Day</option>
                    <option value="Father's Day">Father's Day</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Congratulations">Congratulations</option>
                    <option value="Baby">Baby</option>
                    <option value="Graduation">Graduation</option>
                </select>

                <br/><br/>

                <p className="new-card-question">
                    If you'd like, we can choose a more specific type of card:
                </p>
                <br/>
                <select ref="selectSubtype">
                    <option value="Funny">Funny</option>
                    <option value="Sincere">Sincere</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                    <option value="Cute">Cute</option>
                    <option value="Animals">Animals</option>
                </select>
                <br/><br/>
                <div className="new-order-button center-text" onClick={this.handleClickNewOrder}>
                    Schedule Order
                </div>
            </div>
        );
    },
    handleClickNewOrder: function() {
        if (this.refs.firstName.value === '') {
            alert('Put in a name!!');
            return;
        }
        if (this.refs.date.value === '') {
            alert('Put in a date!!');
            return;
        }
        var data = {
            userFbId: this.state.userid,
            dateRequired: this.refs.date.value,
            cardType: this.refs.selectType.value,
            subCardType: this.refs.selectSubtype.value,
            receiverFirstName: this.refs.firstName.value
        };
        let self = this;
        $.post('/v1/order', data, function(data, status, jqXHR) {
            if (status === 'success') {
                // redirect
                // this definitely needs to be changed to use react-router
                window.location.href = '/orders/' + self.state.userid;
            } else {
                alert('There was an issue placing your order. Try again.');
            }
        });
    },
    getTwoWeeksString: function() {
        var twoWeeks = new Date();
        twoWeeks.setDate(twoWeeks.getDate() + 14);
        var dd = twoWeeks.getDate();
        var mm = twoWeeks.getMonth()+1; //January is 0!
        var yyyy = twoWeeks.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        return yyyy+'-'+mm+'-'+dd;
    },
    getUserid: function() {
        let pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];
    }
});
export default NewOrder;
    */

'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class CreateMessage extends React.Component {
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