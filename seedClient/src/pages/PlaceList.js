import React from "react";
import Rating from './Rating';
export default function PlaceList(props) {
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
                {props.places.map(place => {
                    return (
                        <tr key={place.id}>
                            <td>{place.id}</td>
                            <td>{place.city}</td>
                            <td>{place.street}</td>
                            <td>{place.zip}</td>
                            <td>{place.description}</td>
                            <td><img src={"https://jdbh.dk/images/" + place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
                            <td>{place.rating}</td>
                            <td>
                                <Rating placeId={place.id} userId={props.userId} updateTable={props.updateTable} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
