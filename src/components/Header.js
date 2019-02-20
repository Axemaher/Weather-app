import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from './SearchModal';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            data: null,
            windSpeed: "",
            windDeg: "",
            loaded: false
        }
    }
    handleSearchModal = value => {
        this.setState({
            search: value
        })
    }
    componentDidUpdate() {
        if (!this.props.loaded) {
            return
        } else if (!this.state.loaded) {
            this.setState({
                windSpeed: this.props.todayData.wind.speed,
                windDeg: this.props.todayData.wind.deg,
                loaded: true
            })
        }
    }
    componentWillReceiveProps() {
        this.setState({ loaded: false })
    }
    render() {
        const { windSpeed } = this.state
        return (
            <>
                <header>
                    <p
                        className="city"
                        onClick={() => this.handleSearchModal(true)}>
                        {this.props.location}
                        <FontAwesomeIcon className="faIcon" icon="search" />
                    </p>
                    <p
                        className="wind">
                        <FontAwesomeIcon className="faIcon" icon="wind" />{windSpeed}
                        mph SE</p>
                </header>
                {this.state.search ?
                    <SearchModal
                        handleSearchModal={this.handleSearchModal}
                        dataFetch={this.props.dataFetch}
                    />
                    : ""}
            </>
        );
    }
}

export default Header;