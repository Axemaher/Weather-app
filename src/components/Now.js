import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Now extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="today">
                <div className="info">
                    <p className="date">Friday June 18, 2017</p>
                    <p className="time">02:14</p>
                    <p className="moisture-pressure">
                        <span><FontAwesomeIcon className="faIcon" icon="tint" />81%</span>
                        <span><FontAwesomeIcon className="faIcon" icon="compress-arrows-alt" />1013hPa</span>
                    </p>
                    <p className="day-time">Duration of day: 9,5h</p>
                    <p className="sunrise-sunset">
                        <span>Sunrise: 00:00:00</span>
                        <span>Sunset: 00:00:00</span>
                    </p>
                </div>
                <div className="image">
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <div className="temp">
                        <span className="actual-temp">5<sup>o</sup>C</span>
                        <p className="temp-min-max">
                            <span>4<sup>o</sup>C</span>
                            <span>6<sup>o</sup>C</span>
                        </p>
                    </div>
                    <p className="feels">Feels like 5<sup>o</sup>C</p>
                    <p className="weather-desc">Cloudy</p>
                </div>
            </div>
        );
    }
}

export default Now;