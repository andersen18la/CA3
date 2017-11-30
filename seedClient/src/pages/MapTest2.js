import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import placeFacade from '../facades/placeFacade';
import Rating from './Rating';
import auth from '../authorization/auth';
import placeData from '../facades/placeFacade';

export class MapTest2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            data: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedLocation: {},
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
    onMapClickHandler = (x, y, lat, lng, event) => {
        console.log(x, y, lat, lng, event);
    }

    onMarkerClickHandler = (markerProps, marker) => {
        console.log(markerProps);
        console.log(marker);
        let selectedLocation = markerProps.loc;
        let activeMarker = marker;
        this.setState({
            activeMarker, selectedLocation, showingInfoWindow: true
        });

    }

    splitGeo = (location) => {
        let geo = location.geo;
        let geoArr = geo.split(',');
        return { lat: geoArr[0], lng: geoArr[1] };
    }
    hasUserRated = (userId, ratings, placeId) => {
        console.log(userId + "," + ratings + "," + placeId);
        if (this.state.showingInfoWindow === true) {
            let filterResult = ratings.filter(rating => {
                return userId === rating.userId;
            });
            if (filterResult.length > 0) {
                return "you have already rated";
            }
            return (<div>               <form key={this.props.placeId} className="form-inline" onSubmit={this.thisOne}>
                <label><input className="form-inline" name="radio" type="radio" value="1" onClick={this.thisOne} required />1</label>
                <label><input className="form-inline" name="radio" type="radio" value="2" onClick={this.onClickHandler} required />2</label>
                <label><input className="form-inline" name="radio" type="radio" value="3" onClick={this.onClickHandler} required />3</label>
                <label><input className="form-inline" name="radio" type="radio" value="4" onClick={this.onClickHandler} required />4</label>
                <label><input className="form-inline" name="radio" type="radio" value="5" onClick={this.onClickHandler} required />5</label>
                <input type="submit" className="btn btn-default" id="btn" value="Save the rating" />

            </form></div>);
        }
    }
    render() {
        console.log(this.state);
        return (
            <div id="hvadfanden">
                <Map id="thisIsMap" google={this.props.google}
                    style={{ left: '17%', top: 90, width: '65%', height: '65%' }}
                    zoom={8}
                    initialCenter={{
                        lat: 56,
                        lng: 10.5
                    }}
                    onClick={this.onMapClickHandler}
                >
                    {this.props.placeList.map(location => (
                        <Marker key={location.id}
                            loc={location}
                            id={location.id}
                            position={this.splitGeo(location)}
                            onClick={this.onMarkerClickHandler}
                        />
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <p onClick={this.thisOne}>{this.state.selectedLocation.title}</p>
                        <p>{this.state.selectedLocation.description}</p>
                        <p>correct city? {this.state.selectedLocation.city}</p>
                        {this.hasUserRated(this.props.userId, this.state.selectedLocation.ratings, this.state.selectedLocation.id)}
                        <button onClick={this.helloWorld}>Why Doesn't Hello World Alert Work!?</button>
                    </InfoWindow>

                </Map>
            </div>

        )
    }
    helloWorld(){
        alert('Hello World');
    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4'
})(MapTest2);