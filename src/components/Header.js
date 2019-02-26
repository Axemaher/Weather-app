import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from './SearchModal';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModal: false,
            windSpeed: "",
            windDeg: "",
        }
    }
    componentDidMount() {
        const { speed, deg } = this.props.nowData.wind
        this.setState({
            windSpeed: (speed * 1.609344).toFixed(),
            windDeg: this.windDeg(deg),
        })
    }
    handleSearchModal = value => {
        this.setState({
            searchModal: value
        })
    }

    windDeg = deg => {
        let direction = "";
        if (deg > 348.75 || deg < 11.25) { direction = "N" }
        if (deg > 11.25 && deg < 33.75) { direction = "NNE" }
        if (deg > 33.75 && deg < 56.25) { direction = "NE" }
        if (deg > 56.25 && deg < 78.75) { direction = "ENE" }
        if (deg > 78.75 && deg < 101.25) { direction = "E" }
        if (deg > 101.25 && deg < 123.75) { direction = "ESE" }
        if (deg > 123.75 && deg < 146.25) { direction = "SE" }
        if (deg > 146.25 && deg < 168.75) { direction = "SSE" }
        if (deg > 168.75 && deg < 191.25) { direction = "S" }
        if (deg > 191.25 && deg < 213.75) { direction = "SSW" }
        if (deg > 213.75 && deg < 236.25) { direction = "SW" }
        if (deg > 236.25 && deg < 258.75) { direction = "WSW" }
        if (deg > 258.75 && deg < 281.25) { direction = "W" }
        if (deg > 281.25 && deg < 303.75) { direction = "WNW" }
        if (deg > 303.75 && deg < 326.25) { direction = "NW" }
        if (deg > 326.25 && deg < 348.75) { direction = "NNW" }
        return direction
    }
    render() {
        const { location, dataFetch } = this.props;
        const { windSpeed, windDeg } = this.state;
        return (
            <>
                <header>
                    <p
                        className="city"
                        onClick={() => this.handleSearchModal(true)}>
                        {location}
                        <FontAwesomeIcon className="faIcon" icon="search" />
                    </p>
                    <p
                        className="wind">
                        <FontAwesomeIcon className="faIcon" icon="wind" />{windSpeed}
                        km/h {windDeg}</p>
                </header>
                {this.state.searchModal ?
                    <SearchModal
                        handleSearchModal={this.handleSearchModal}
                        dataFetch={dataFetch}
                    />
                    : null}
            </>
        );
    }
}

export default Header;