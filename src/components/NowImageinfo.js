import React, { Component } from 'react';

class NowImageInfo extends Component {
    state = {
        temp: "",
        temp_min: "",
        temp_max: "",
        weatherDesc: "",
        imageURL: ""
    }
    componentDidMount() {
        const { temp } = this.props.nowData.main;
        const { description } = this.props.nowData.weather[0];
        this.setState({
            temp: (temp - 273.15).toFixed(),
            weatherDesc: description,
            imageURL: this.imageHandler()
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
    imageHandler = () => {
        return require(`../icons/${this.folder()}/${this.imgNameHandler()}.png`)
    }
    folder = () => {
        let nowTime = new Date();
        nowTime = nowTime.getHours();
        let sunset = new Date(this.props.nowData.sys.sunset * 1000);
        let sunrise = new Date(this.props.nowData.sys.sunrise * 1000);
        sunset = sunset.getHours();
        sunrise = sunrise.getHours();
        if (nowTime >= sunrise && nowTime <= sunset) {
            return "day";
        } else {
            return "night";
        }
    }
    imgNameHandler = () => {
        const weatherId = this.props.nowData.weather[0].id;
        if (weatherId >= 200 && weatherId <= 211) { return "thunderstorm"; }
        else if (weatherId >= 212 && weatherId <= 232) { return "heavy_thunderstorm"; }
        else if (weatherId >= 500 && weatherId <= 504) { return "rain"; }
        else if (weatherId >= 511 && weatherId <= 531) { return "heavy_rain"; }
        else if (weatherId >= 600 && weatherId <= 615) { return "snow"; }
        else if (weatherId >= 616 && weatherId <= 622) { return "heavy_snow"; }
        else if (weatherId === 701) { return "mist"; }
        else if (weatherId === 800) { return "clear_sky"; }
        else if (weatherId === 801 || weatherId === 802) { return "scattered_clouds"; }
        else if (weatherId === 803 || weatherId === 804) { return "broken_clouds"; }
    }


    render() {
        const { temp, temp_min, temp_max, weatherDesc } = this.state;
        return (
            <div className="image">
                <img src={this.state.imageURL} alt="desc" />
                <div className="temp">
                    <p className="actual-temp">
                        {temp}<sup>o</sup>C
                        </p>
                    <p className="temp-min-max">
                        <span>{temp_min}<sup>o</sup>C</span>
                        <span>{temp_max}<sup>o</sup>C</span>
                    </p>
                </div>
                <p className="feels">Temp. odczuwalna {temp}<sup>o</sup>C</p>
                <p className="weather-desc">{weatherDesc}</p>
            </div>
        );
    }
}

export default NowImageInfo;