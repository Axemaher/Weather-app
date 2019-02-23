import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends React.Component {
    state = {
        time: ""
    }

    componentDidMount() {
        let time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        this.setState({
            time: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        })
    }
    render() {
        return (
            <footer>
                <p className="uv"></p>
                <p>{this.state.time} Odświeżono <FontAwesomeIcon className="faReload" icon="sync-alt" onClick={this.props.reload} /></p>
            </footer >
        )
    }
}

export default Footer;