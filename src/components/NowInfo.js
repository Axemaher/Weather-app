import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class NowInfo extends React.Component {
    state = {
        date: "",
        time: "",
        humidity: "",
        pressure: "",
        sunrise: "",
        sunset: "",
        dayDuration: ""
    }
    componentDidMount() {
        const { humidity, pressure } = this.props.nowData.main;
        const { sunrise, sunset } = this.props.nowData.sys;
        this.setState({
            date: this.date(),
            time: this.time(),
            humidity,
            pressure,
            sunrise: this.sunriseSunsetTime(sunrise),
            sunset: this.sunriseSunsetTime(sunset),
            dayDuration: this.dayDuration()
        })
    }
    date = () => {
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];
        const date = new Date();
        const day = days[date.getDay()];
        const dayNumber = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}, ${dayNumber < 10 ? `0${dayNumber}` : dayNumber} ${month} ${year}`;

    }
    time = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? `0${hours}` : `${hours}`}: ${minutes < 10 ? `0${minutes}` : `${minutes}`} `
    }
    sunriseSunsetTime = time => {
        time = new Date(time * 1000);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        return `${hours < 10 ? `0${hours}` : hours}: ${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds} `;
    }
    dayDuration = () => {
        const { sunset, sunrise } = this.props.nowData.sys
        const duration = sunset - sunrise;
        console.log(duration)
        const time = new Date(duration * 1000);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return `${hours < 10 ? `0${hours}h` : `${hours}h`}: ${minutes < 10 ? `0${minutes}min` : `${minutes}min`} `;
    }
    render() {
        const { date, time, humidity, pressure, sunrise, sunset, dayDuration } = this.state;
        return (
            <div className="info">
                <p className="date">{date}</p>
                <p className="time">{time}</p>
                <p className="moisture-pressure">
                    <span><FontAwesomeIcon className="faIcon" icon="tint" />{humidity}%</span>
                    <span><FontAwesomeIcon className="faIcon" icon="compress-arrows-alt" />{pressure}hPa</span>
                </p>
                <p className="day-time">Czas trwania dnia: {dayDuration}</p>
                <p className="sunrise-sunset">
                    <span>Wsch. sł: {sunrise}</span>
                    <span>Zach. sł: {sunset}</span>
                </p>
            </div>
        )
    }
}

export default NowInfo;