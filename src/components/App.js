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
    loaded: false
  }
  // componentDidMount() {
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API}`)
  //     .then(resp => resp.json())
  //     .then(resp => {
  //       console.log(resp);
  //     })
  // }
  render() {
    return (
      <div className="container">
        <div className="main">
          <Header />
          <Now />
          <FiveDays />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;


{/* 03f6506a1cbdec03bb25ac7d19331518 */ }