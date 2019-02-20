import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends React.Component {
    state = {
        time: ""
    }

    componentWillReceiveProps() {
        let time = new Date();
        time = `${time.getHours()}.${time.getMinutes()}`
        this.setState({
            time
        })
    }
    render() {
        return (
            <footer>
                <p className="uv"></p>
                <p>{this.state.time} Updated <FontAwesomeIcon className="faReload" icon="sync-alt" onClick={this.props.reload} /></p>
            </footer >
        )
    }
}

export default Footer;