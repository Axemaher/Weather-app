import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Footer = props => {
    return (
        <footer>
            <p className="uv">UV index: 5</p>
            <p>02.14 Updated <FontAwesomeIcon className="faReload" icon="sync-alt" /></p>
        </footer>
    )
}
export default Footer;