/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.user
        };
    }

    render() {
        return (
            <div>
                <Card>
                  <CardHeader title="Think Big Picture" avatar="https://s-media-cache-ak0.pinimg.com/736x/27/6b/92/276b9282169e378ee334b5184b0bb182.jpg" />
                  <CardMedia overlay={<CardTitle title="Teamwork, Community, Family" />}>
                  <img src="http://gender.stanford.edu/sites/default/files/uploads/2010/04/Teamwork-iStock_000008295703Medium.jpg" style={{height:'80%',width:'60%'}} />
                  </CardMedia>
                  <CardText><p style={{fontSize:'300%', fontFamily:'Corben'}}>
                    <b>WishWash</b> believes that connections build the foundation for
                    succesful communities. With more and more things going on in our lives,
                    it is becoming increasingly important to develop our network.
                    Our goal is to build those connections through a shared commonality
                    of college laundry.</p>
                  </CardText>
                </Card>
            </div>
        );
    }
}
