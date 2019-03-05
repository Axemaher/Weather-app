import React, { Component } from 'react';
import Header from './Header';
import NowInfo from './NowInfo'
import NowImageInfo from './NowImageinfo';
import FiveDays from './FiveDays';
import Footer from './Footer';
import Loading from './Loading';
import Error from './Error';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faWind, faTint, faCompressArrowsAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faWind, faTint, faCompressArrowsAlt, faSyncAlt)

const API = '03f6506a1cbdec03bb25ac7d19331518';

class App extends Component {
  state = {
    location: localStorage.getItem('location') || "Warszawa",
    loaded: false,
    error: false,
    nowData: null,
    fiveDaysData: null,
    dayTime: "",
    backgroundUrl: ""
  }
  componentDidMount() {
    this.dataFetch(this.state.location);
  }
  dataFetch = value => {
    this.setState({ loaded: false });
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=pl&appid=${API}`)
      .then(resp => {
        if (!resp.ok) {
          this.setState({ error: true });
          return;
        } else {
          return resp.json();
        }
      })
      .then(resp => {
        if (this.state.error) {
          return;
        } else {
          this.setState({
            nowData: resp,
            location: value
          });
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&lang=pl&appid=${API}`)
            .then(resp => {
              if (!resp.ok) {
                this.setState({ error: true });
              } else {
                return resp.json();
              }
            })
            .then(resp => {
              this.setState({
                fiveDaysData: resp
              });
              console.log(resp)
            })
            .then(() => {
              this.dayTime()
              this.setState({ backgroundUrl: this.backgroundUrlHandler(), loaded: true })
              localStorage.setItem('location', this.state.location);
            })
        }
      });

  }

  reload = () => {
    if (this.state.error) {
      this.setState({
        location: localStorage.getItem('location'),
        error: false
      })
    }
    this.dataFetch(this.state.location);
  }
  dayTime = () => {
    let dayTime = "";
    let nowTime = new Date();
    nowTime = nowTime.getHours();
    let sunset = new Date(this.state.nowData.sys.sunset * 1000);
    let sunrise = new Date(this.state.nowData.sys.sunrise * 1000);
    sunset = sunset.getHours();
    sunrise = sunrise.getHours();
    if (nowTime >= sunrise && nowTime <= sunset) {
      dayTime = "day";
    } else {
      dayTime = "night";
    }
    this.setState({ dayTime });
  }
  backgroundNameHandler = () => {
    const weatherId = this.state.nowData.weather[0].id;
    console.log(weatherId)
    if (weatherId >= 200 && weatherId <= 232) { return "bg_thunderstorm.gif"; }
    else if (weatherId >= 300 && weatherId <= 531) { return "bg_rain.gif"; }
    else if (weatherId >= 600 && weatherId <= 622) { return "bg_snow.gif"; }
    else if (weatherId >= 801 && weatherId <= 804) { return "bg_clouds.gif"; }
    else if (weatherId === 800) { return "bg_clear_sky.jpg"; }
    else { return "bg_clear_sky.jpg" }
  }
  backgroundUrlHandler = () => {
    return require(`../icons/${this.state.dayTime}/${this.backgroundNameHandler()}`)
  }
  render() {
    const { location, nowData, loaded, fiveDaysData, dayTime, error } = this.state;
    return (
      <div className="container">
        <div className="main" style={{ backgroundImage: `url(${this.state.backgroundUrl})` }}>
          <div className="background">
            {this.state.loaded ?
              < >
                <Header
                  dataFetch={this.dataFetch}
                  location={location}
                  nowData={nowData}
                  loaded={loaded} />
                <div className="now">
                  <NowInfo
                    nowData={nowData}
                  />
                  <NowImageInfo
                    nowData={nowData}
                    fiveDaysData={fiveDaysData}
                    updating={this.updating}
                    dayTime={dayTime}
                  />
                </div>
                <FiveDays
                  fiveDaysData={fiveDaysData}
                  dayTime={dayTime}
                />
                <Footer
                  reload={this.reload}
                />
              </>
              : !error ?
                <Loading />
                : <Error reload={this.reload}
                />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
