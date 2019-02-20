import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class SearchModal extends Component {
    state = {
        city: "",
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        localStorage.setItem('location', this.state.city);

        this.props.dataFetch(this.state.city)
        this.props.handleSearchModal(false)
    }
    render() {
        return (
            <div className="modal" >
                <section className='modal-main'>
                    <form onSubmit={this.handleSubmit}>
                        <input className="search-term" type="text" name="city" placeholder="City or post code to search" autoFocus="autofocus" onChange={this.handleChange} />
                        <button className="search-btn" type="submit"><FontAwesomeIcon icon="search" /></button>
                    </form>
                </section>
            </div>
        )
    }
}
export default SearchModal;