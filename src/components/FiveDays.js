import React, { Component } from 'react';
import { imageUrlHandler } from './imageUrlHandler'


class FiveDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({
            dailyData: this.dailyDataHandler()
        })
    }
    dailyDataHandler = () => {
        const weekDaysNames = ['NIE', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB'];
        let dailyData = []
        let days = 6;
        let data = null;
        let today = new Date();
        for (let i = 0; i < days; i++) {
            data = this.props.fiveDaysData.list.filter(data => {
                let day = new Date(data.dt * 1000);
                if (day.getDay() === today.getDay()) {
                    return data
                }
            })
            console.log(data[0].weather[0].id)
            dailyData.push(
                {
                    data,
                    temperatures: {
                        temp_min: (Math.min(...data.map(data => data.main.temp_min)) - 273.15).toFixed(),
                        temp_max: (Math.max(...data.map(data => data.main.temp_max)) - 273.15).toFixed()
                    },
                    imageUrl: imageUrlHandler(this.props.dayTime, data[0].weather[0].id),
                    weekDay: weekDaysNames[today.getDay()]
                }
            )
            today.setDate(today.getDate() + 1);
        }
        return dailyData.splice(1)
    }
    render() {
        console.log(this.state.dailyData)

        return (
            <div className="five-days">
                {this.state.dailyData.map((data, index) => (
                    <div key={index} className="day">
                        <p>{data.weekDay}</p>
                        <img src={data.imageUrl} alt="desc" />
                        <p>{data.temperatures.temp_min}<sup>o</sup>C / {data.temperatures.temp_max}<sup>o</sup>C</p>
                    </div>
                ))}
                {/* <div className="day">
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
                </div> */}
            </div>

        );
    }
}

export default FiveDays;