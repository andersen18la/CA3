import React, { Component } from 'react';
import placeData from '../facades/placeFacade';

//props: 
/**
 * userId
 * placeId
 * updateTable
 */


export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: { userId: this.props.userId, ratingValue: "0", placeId: this.props.placeId }
        };

    }
    submitHandler = e => {
        e.preventDefault();
        let rating = this.state.rating;        
        placeData.createRating(rating, this.props.updateTable);
        this.setState({
            rating: { userId: this.props.userId, ratingValue: "0", placeId: this.props.placeId }
        });
    }

    onChangeHandler = e => {
        e.preventDefault();
        let target = e.target;
        let value = target.value;
        console.log(value)

        this.setState(prevState => (
            {
                rating: { ...prevState.rating, ratingValue: value },
            }
        ));
    }

    render() {

        return (
            <form key={this.props.placeId} className="form-inline" onSubmit={this.submitHandler}>
                <input name={this.props.placeId} className="form-control" type="number" onChange={this.onChangeHandler} value={this.state.rating.ratingValue} min="1" max="5" required />
                <input type="submit" className="btn btn-default" id="btn" value="Save the rating" />
            </form>
        )

    }

}