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
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class Unauthorized extends React.Component {
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