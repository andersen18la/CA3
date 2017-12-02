import React, { Component } from "react";
import Rating from './Rating';
const imageURL = require("../../package.json").imageURL;
export default class PlaceList extends Component {

    hasUserRated = (userId, ratings, placeId) => {
        let filterResult = ratings.filter(rating => {
            return userId === rating.userId;
        });
        if (filterResult.length > 0) {
            return "you have already rated";
        }
        return <Rating placeId={placeId} userId={this.props.userId} updateTable={this.props.updateTable} />

    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CITY</th>
                        <th>STREET</th>
                        <th>ZIP</th>
                        <th>DESCRIPTION</th>
                        <th>IMAGE-URI</th>
                        <th>RATING</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.places.map(place => {
                        return (
                            <tr key={place.id}>
                                <td>{place.id}</td>
                                <td>{place.city}</td>
                                <td>{place.street}</td>
                                <td>{place.zip}</td>
                                <td>{place.description}</td>
                                <td><img src={imageURL + place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
                                <td>{place.rating}</td>
                                <td>
                                    {this.hasUserRated(this.props.userId, place.ratings, place.id)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}