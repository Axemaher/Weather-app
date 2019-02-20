import React, { Component } from 'react';
import Header from './Header';
import Now from './Now';
import FiveDays from './FiveDays';
import Footer from './Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faWind, faTint, faCompressArrowsAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faWind, faTint, faCompressArrowsAlt, faSyncAlt)

const API = '03f6506a1cbdec03bb25ac7d19331518';

class App extends Component {
  state = {
    location: localStorage.getItem('location'),
    loaded: false,
    todayData: null,
    fiveDaysData: null
  }
  componentDidMount() {
    this.dataFetch(this.state.location)
  }
  dataFetch = value => {
    this.setState({ location: value, loaded: false });
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API}`)
      .then(resp => {
        if (!resp.ok) {
          console.log("error")
          return
        }
        return resp
      })
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          todayData: resp,
          loaded: true
        });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.todayData.id}&appid=${API}`)
          .then(resp => resp.json())
          .then(resp => {
            this.setState({
              fiveDaysData: resp
            });
          })
      });
  }
  reload = () => {
    this.dataFetch(this.state.location)
  }
  render() {
    return (
      <div className="container">
        <div className="main">
          <Header
            dataFetch={this.dataFetch}
            location={this.state.location}
            todayData={this.state.todayData}
            loaded={this.state.loaded} />
          <Now
            todayData={this.state.todayData}
            loaded={this.state.loaded} />
          <FiveDays />
          <Footer
            reload={this.reload}
            todayData={this.state.todayData}
            loaded={this.state.loaded} />
        </div>
      </div>
    );
  }
}

export default App;
