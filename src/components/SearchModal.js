import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class SearchModal extends Component {
    state = {
        location: "",
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.dataFetch(this.state.location)
        this.props.handleSearchModal(false)
    }
    render() {
        return (
            <div className="modal" >
                <section className='modal-main'>
                    <form onSubmit={this.handleSubmit}>
                        <input className="search-term" type="text" name="location" placeholder="Miasto lub kod pocztowy" autoFocus="autofocus" onChange={this.handleChange} />
                        <button className="search-btn" type="submit"><FontAwesomeIcon icon="search" /></button>
                    </form>
                </section>
            </div>
        )
    }
}
export default SearchModal;