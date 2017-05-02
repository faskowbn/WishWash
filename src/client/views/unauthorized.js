/**
 * Created by brad on 3/31/2017.
 */

 /*******************************************************************/

//export default UnauthorizedPage;*/

'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';

export class Unauthorized extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        browserHistory.push('/');
    }

    render() {
        let style = {
            "textAlign": "center"
        };

        return (
            <div>
                <h1 style={style}>Hey, we are excited you are here. </h1>
                <h1 style={style}>Unfortunately, this service is only for </h1>
                <h1 style={style}>students with a vanderbilt.edu email address. </h1>
                <h1 style={style}>If you have a vandy address, try to log in again </h1>
                <h1 style={style}>with your vandy account </h1>
                <Link to="/" style={style}>Take me to login</Link>
            </div>
        );
    }
}