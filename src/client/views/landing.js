/**
 * Created by brad on 3/28/2017.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';

export class Landing extends React.Component {
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