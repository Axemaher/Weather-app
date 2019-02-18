import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <header>
                <p className="city">New York<FontAwesomeIcon className="faIcon" icon="search" /></p>
                <p className="wind"><FontAwesomeIcon className="faIcon" icon="wind" />4.3mph SE</p>
            </header>
        );
    }
}

export default Header;