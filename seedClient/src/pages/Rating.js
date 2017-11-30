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
            rating: { userId: this.props.userId, ratingValue: "0", locationId: this.props.placeId }
        };

    }
    submitHandler = e => {
        e.preventDefault();
        let rating = this.state.rating;
        placeData.createRating(rating, this.props.updateTable);
        this.setState({
            rating: { userId: this.props.userId, ratingValue: "0", locationId: this.props.placeId }
        });
    }

    onClickHandler = e => {
        
        let value = e.target.value;
        console.log(this.state.rating);
        this.setState(prevState => (
            {
                rating: { ...prevState.rating, ratingValue: value },
            }
        ));
    }

    //<input name={this.props.placeId} className="form-control" type="number" onChange={this.onChangeHandler} value={this.state.rating.ratingValue} min="1" max="5" required />
    // <span><input type="radio" name="rating" id="str5" value="5"/><label for="str5"></label></span>
    render() {
        return (
            <div>
              
                <form key={this.props.placeId} className="form-inline" onSubmit={this.submitHandler}>
                    <label><input className="form-inline" name="radio" type="radio" value="1" onClick={this.onClickHandler} required />1</label>
                    <label><input className="form-inline" name="radio" type="radio" value="2" onClick={this.onClickHandler} required />2</label>
                    <label><input className="form-inline" name="radio" type="radio" value="3" onClick={this.onClickHandler} required />3</label>
                    <label><input className="form-inline" name="radio" type="radio" value="4" onClick={this.onClickHandler} required />4</label>
                    <label><input className="form-inline" name="radio" type="radio" value="5" onClick={this.onClickHandler} required />5</label>
                    <input type="submit" className="btn btn-default" id="btn" value="Save the rating" />
                </form>
            </div>
        )

    }

}