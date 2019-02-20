import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Now extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: "",
            temp: "",
            pressure: "",
            humidity: "",
            temp_min: "",
            temp_max: "",
            loaded: false
        }
    }

    componentDidUpdate() {
        if (!this.props.loaded) {
            return
        } else if (!this.state.loaded) {
            const { temp, pressure, humidity, temp_max, temp_min } = this.props.todayData.main
            this.setState({
                temp,
                pressure,
                humidity,
                temp_max,
                temp_min,
                loaded: true
            })
            this.dateTime()
        }
    }
    componentWillReceiveProps() {
        this.setState({ loaded: false })
    }
    dateTime = () => {
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];
        const date = new Date();
        const day = days[date.getDay()];
        const dayNumber = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const time = `
        ${date.getHours() < 10 ? `0${date.getHours}` : `${date.getHours()}`}
        :${date.getMinutes() < 10 ? `0${date.getMinutes}` : `${date.getMinutes()}`}`;

        this.setState({
            date: `${day} ${month} ${dayNumber < 10 ? `0${dayNumber}` : dayNumber}, ${year}`,
            time
        })
    }

    render() {
        const { date, time, temp, pressure, humidity, temp_max, temp_min } = this.state;
        return (
            <div className="today">
                <div className="info">
                    <p className="date">{date}</p>
                    <p className="time">{time}</p>
                    <p className="moisture-pressure">
                        <span><FontAwesomeIcon className="faIcon" icon="tint" />{humidity}%</span>
                        <span><FontAwesomeIcon className="faIcon" icon="compress-arrows-alt" />{pressure}hPa</span>
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
                        <span className="actual-temp">{(temp - 273.15).toFixed()}<sup>o</sup>C</span>
                        <p className="temp-min-max">
                            <span>{(temp_min - 273.15).toFixed()}<sup>o</sup>C</span>
                            <span>{(temp_max - 273.15).toFixed()}<sup>o</sup>C</span>
                        </p>
                    </div>
                    <p className="feels">Feels like {(temp - 273.15).toFixed()}<sup>o</sup>C</p>
                    <p className="weather-desc">Cloudy</p>
                </div>
            </div>
        );
    }
}

export default Now;