import React, { Component } from 'react';
import { imageUrlHandler } from './imageUrlHandler'

class NowImageInfo extends Component {
    state = {
        temp: "",
        temp_min: "",
        temp_max: "",
        weatherDesc: "",
        imageUrl: ""
    }
    componentDidMount() {
        const { temp } = this.props.nowData.main;
        const { description } = this.props.nowData.weather[0];
        this.setState({
            temp: (temp - 273.15).toFixed(),
            weatherDesc: description,
            imageUrl: imageUrlHandler(this.props.dayTime, this.props.nowData.weather[0].id)
        })
        this.todayMinMaxTemp();

    }
    todayMinMaxTemp = () => {
        let today = new Date();
        today = today.getDay();
        const todayTemperatures = this.props.fiveDaysData.list.filter(data => {
            let day = new Date(data.dt * 1000);
            day = day.getDay();
            if (day === today) {
                return data
            }
        })
        const minTemperatures = todayTemperatures.map(data => data.main.temp_min);
        const maxTemperatures = todayTemperatures.map(data => data.main.temp_max);
        this.setState({
            temp_min: (Math.min(...minTemperatures) - 273.15).toFixed(),
            temp_max: (Math.max(...maxTemperatures) - 273.15).toFixed()
        })
    }
    render() {
        const { temp, temp_min, temp_max, weatherDesc } = this.state;
        return (
            <section className="image">
                <img src={this.state.imageUrl} alt="desc" />
                <div className="temp">
                    <p className="actual-temp">
                        {temp}<sup>o</sup>C
                        </p>
                    <p className="temp-min-max">
                        <span>{isFinite(temp_min) ? temp_min : "-"}<sup>o</sup>C</span>
                        <span>{isFinite(temp_max) ? temp_max : "-"}<sup>o</sup>C</span>
                    </p>
                </div>
                <p className="feels">Temp. odczuwalna {temp}<sup>o</sup>C</p>
                <p className="weather-desc">{weatherDesc}</p>
            </section>
        );
    }
}

export default NowImageInfo;