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
    fiveDaysData: null
  }
  componentDidMount() {
    this.dataFetch(this.state.location)
  }
  dataFetch = value => {
    this.setState({ loaded: false });
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=pl&appid=${API}`)
      .then(resp => {
        if (!resp.ok) {
          this.dataFetch(localStorage.getItem('location') || "Warszawa")
          console.log("wrong input data")
          this.setState({ error: true })
          return
        } else {
          return resp.json()
        }
      })
      .then(resp => {
        if (this.state.error) {
          return
        } else {
          console.log("resp")
          this.setState({
            nowData: resp,
            location: value
          });
          console.log(resp)
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&lang=pl&appid=${API}`)
            .then(resp => {
              if (!resp.ok) {
                console.log("wrong input data");
                this.setState({ error: true })
              } else {
                return resp.json()
              }
            })
            .then(resp => {
              this.setState({
                fiveDaysData: resp
              });
              console.log(resp)
            })
            .then(() => {
              this.setState({ loaded: true })
              localStorage.setItem('location', this.state.location);

            })
        }
      });

  }
  reload = () => {
    if (this.state.error) {
      this.setState({
        location: localStorage.getItem('location') || "Warszawa",
        error: false
      })
    }
    this.dataFetch(this.state.location)
  }
  render() {
    const { location, nowData, loaded, fiveDaysData } = this.state;
    return (
      <div className="container">
        <div className="main">
          {this.state.loaded ?
            <>
              <Header
                dataFetch={this.dataFetch}
                location={location}
                nowData={nowData}
                loaded={loaded} />
              <div className="now">
                <NowInfo
                  nowData={this.state.nowData}
                />
                <NowImageInfo
                  nowData={this.state.nowData}
                  fiveDaysData={this.state.fiveDaysData}
                />
              </div>
              <FiveDays />
              <Footer
                reload={this.reload}
                loaded={loaded} />
            </>
            : !this.state.error ? <Loading /> : <Error reload={this.reload} />}
        </div>
      </div>
    );
  }
}

export default App;
