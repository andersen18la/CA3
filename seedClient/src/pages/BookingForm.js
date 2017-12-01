import React, { Component } from 'react';
import bookingFacade from '../facades/bookingFacade'



export default class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {
                userId: this.props.userId,
                houseId: this.props.houseId,
                startDate: "",
                endDate: "someweek"
            },
            hasUserJustBooked: false,
            err: ""
        }
    }

    onChangeHandler = e => {
        let value = e.target.value;
        this.setState(prevState => (
            {
                booking: { ...prevState.booking, startDate: value }
            }
        ));
    }

    onSubmitHandler = e => {
        e.preventDefault();
        let booking = this.state.booking;
        bookingFacade.addBooking(booking, (err, data) => {
            if (err) {
                return this.setState({ err: err.errorMessage });
            }
            this.setState({
                hasUserJustBooked: true,
                err: ""
            })
        });

    }

    hasUserBooked = () => {
        if (this.state.hasUserJustBooked === false) {
            return (
                <div id="bookingform">
                    <form onSubmit={this.onSubmitHandler}>
                        week:<br /> <input name="startDate" className="form-control" type="week" onChange={this.onChangeHandler} value={this.state.startDate} required /><br />
                        <input className="btn btn-success" type="submit" value="book the house!" />
                    </form>
                </div>
            )
        } else {
            return (
                <div id="bookingform">
                    <p>Have fun!</p>
                </div>
            )
        }
    }

    render() {
        console.log(this.state)
        return (
            <div id="bookingform">
                {!this.state.hasUserJustBooked && (
                    <form onSubmit={this.onSubmitHandler}>
                        week:<br /> <input name="startDate" className="form-control" type="week" onChange={this.onChangeHandler} value={this.state.startDate} required /><br />
                        <input className="btn btn-success" type="submit" value="book the house!" />
                    </form>
                )}
                {this.state.hasUserJustBooked && (
                    <p>Have fund</p>
                )}
                {this.state.err && (
                    <div className="alert alert-danger errmsg" role="alert">
                        {this.state.err}
                    </div>
                )}
            </div>
        )
    }

}
