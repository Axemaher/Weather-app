import React, { Component } from 'react';

class FiveDays extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="five-days">
                <div className="day">
                    <p>FRI</p>
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <p>4*C/6*C</p>
                </div>
                <div className="day">
                    <p>FRI</p>
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <p>4*C/6*C</p>
                </div>
                <div className="day">
                    <p>FRI</p>
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <p>4*C/6*C</p>
                </div>
                <div className="day">
                    <p>FRI</p>
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <p>4*C/6*C</p>
                </div>
                <div className="day">
                    <p>FRI</p>
                    <img src="http://bernews.com/weather/wp-content/uploads/2013/02/clouds-sun-rain-day.png" alt="desc" />
                    <p>4*C/6*C</p>
                </div>
            </div>

        );
    }
}

export default FiveDays;