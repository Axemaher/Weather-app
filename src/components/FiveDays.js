import React, { Component } from 'react';
import { imageUrlHandler } from './imageUrlHandler'
import DayModal from './DayModal';


class FiveDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: [],
            clickedDay: "",
            dayModal: false
        }
    }

    componentDidMount() {
        this.setState({
            dailyData: this.dailyDataHandler()
        })
    }
    dailyDataHandler = () => {
        const weekDaysNames = ['NIE', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB'];
        let dailyForecastData = []
        let daysNumber = 6;
        let wihoutToday = null;
        let today = new Date();

        const dayCalculation = value => {
            let day = new Date(value * 1000);
            return day.getDay();
        }

        // deleting data from today
        wihoutToday = this.props.fiveDaysData.list.filter(data => dayCalculation(data.dt) !== today.getDay());

        // ivision data into individual days
        for (let i = 0; i < daysNumber; i++) {
            let dayData = [];
            wihoutToday.forEach(element => {
                if (dayCalculation(element.dt) === today.getDay()) {
                    dayData.push(element)
                }
            });
            today.setDate(today.getDate() + 1);
            if (dayData.length !== 0) {
                dailyForecastData.push(dayData)
            }
        }

        //generating final data to display
        let finalData = []
        dailyForecastData.forEach((element, index) => {
            finalData.push({
                data: element,
                temp_min: (Math.min(...element.map(data => data.main.temp_min)) - 273.15).toFixed(),
                temp_max: (Math.max(...element.map(data => data.main.temp_max)) - 273.15).toFixed(),
                imageUrl: imageUrlHandler(this.props.dayTime, element[0].weather[0].id),
                weekDay: weekDaysNames[dayCalculation(element[0].dt)]
            })
        })
        return finalData;
    }
    handleDayModal = (index = 0, value) => {
        this.setState({
            clickedDay: index,
            dayModal: value
        })
    }
    render() {
        const { clickedDay, dailyData } = this.state;
        return (
            <div className="five-days">
                {this.state.dailyData.map((data, index) => (
                    <div key={index} className="day" onClick={() => this.handleDayModal(index, true)}>
                        <p>{data.weekDay}</p>
                        <img src={data.imageUrl} alt="desc" />
                        <p>{data.temp_min}<sup>o</sup>C / {data.temp_max}<sup>o</sup>C</p>
                    </div>
                ))}
                {this.state.dayModal &&
                    <DayModal
                        handleDayModal={this.handleDayModal}
                        data={dailyData[clickedDay]}
                    />}
            </div>

        );
    }
}

export default FiveDays;