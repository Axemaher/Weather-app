import React, { Component } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class DayModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataForChart: []
        }
    }


    componentDidMount() {
        this.setState({
            dataForChart: this.chartDataHandler()
        })
    }
    chartDataHandler = () => {
        let data = [];
        this.props.data.data.forEach(element => {
            data.push({
                name: element.dt_txt.substr(11, 5),
                temp: (element.main.temp - 273.15).toFixed()
            })
        })
        return data
    }






    render() {
        console.log(this.state.dataForChart)
        return (
            <div className="modal" >
                <section className='modal-main'>
                    <LineChart
                        width={500}
                        height={200}
                        data={this.state.dataForChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                    </LineChart>

                    <button onClick={() => this.props.handleDayModal(1, false)}>close</button>
                </section>
            </div>
        )
    }
}

// const data = [
//     {
//       name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//       name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//       name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//       name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//       name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//       name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//       name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
//   ];

