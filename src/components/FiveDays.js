import React, { Component } from 'react';

class FiveDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: null,
            weekDays: []
        }
    }
    componentDidMount() {
        this.setState({
            dailyData: this.dailyData()
        })
    }
    // weekDays = () => {

    //     const date = new Date();
    //     const day = days[date.getDay()];
    // }
    dailyData = () => {
        const weekDays = ['NIE', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB'];
        let dailyData = []
        let days = 4;
        let today = new Date();
        today = today.getDay() + 1;
        for (let i = 0; i < days; i++) {
            const data = this.props.fiveDaysData.list.filter(data => {
                let day = new Date(data.dt * 1000);
                if (day.getDay() === today) {
                    return data
                }
            })
            dailyData.push(data)
            today++
        }
        dailyData.forEach(data => {
            let day = new Date(data[0].dt * 1000);
            day = weekDays[day.getDay()];
            console.log(day)
        })
        return dailyData;
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
            </div>

        );
    }
}

export default FiveDays;