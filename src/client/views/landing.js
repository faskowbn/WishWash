/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>I like washing clothes</h1>
            </div>
        );
    }
}