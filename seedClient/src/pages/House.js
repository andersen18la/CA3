import React, { Component } from 'react';
import BookingForm from './BookingForm';

export default class House extends Component {
    constructor(props) {
        super(props);
    }



    showStars = () => {
        let rating = this.props.house.rating;
        console.log("house rating" + rating);
        if (rating) {
            if (rating === 0) {
                return "People have rated this place 0..."
            }
            if (rating === 1 && rating < 2) {
                return "⭐"
            }
            if (rating === 2 && rating < 3) {
                return "⭐⭐"
            }
            if (rating === 3 && rating < 4) {
                return "⭐⭐⭐"
            }
            if (rating === 4 && rating < 5) {
                return "⭐⭐⭐⭐"
            }
            if (rating === 5) {
                return "⭐⭐⭐⭐⭐"
            }
        }
        return "Not rated yet... :(";
    }

    tryToUpdate = () => {
        this.forceUpdate()
    }



    render() {
        return (
            <div>
                <h1 className="text-center">{this.props.house.title}</h1>
                <h2>Rating:{this.showStars()}</h2>
                <hr />
                <div id={"houseImage"}>
                    <img src={this.props.imageurl} alt={this.props.house.imageUri} className="img-thumbnail" />
                </div>
                <hr />
                <hr />
                <h3 className="text-center">Description</h3>
                <p className="text-center">{this.props.house.description}</p>
                <hr />
                <h3 className="text-center">Address</h3>
                <p className="text-center">{this.props.house.street}</p>
                <p className="text-center">{this.props.house.city}</p>
                <p className="text-center">{this.props.house.zip}</p>
                {this.props.isloggedIn && <BookingForm houseId={this.props.house.id} userId={this.props.userId} updateLocationState={this.props.updateLocationState} />}
            </div>
        )
    }
}