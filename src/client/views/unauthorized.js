/**
 * Created by brad on 3/31/2017.
 */
/*import React from 'react';

 import { Card, CardHeader, } from 'material-ui/Card';

 class UnauthorizedPage extends React.Component {
 constructor(props) {
 super(props);
 }

 render() {
 return (
 <Card className="center-card">
 <CardHeader
 className = "center-card-header"
 title="Uh oh!"
 subtitle="You aren't authorized to be here."
 actAsExpander={false}
 showExpandableButton={false}
 style={{
 padding: '16px',
 }}
 textStyle={{
 paddingRight: '0',
 }} />
 </Card>
 );
 }
 }

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
                <Link to="/">Take me to login...Reload the page after clicking "sign out"</Link>
            </div>
        );
    }
}