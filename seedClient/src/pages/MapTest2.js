import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import placeFacade from '../facades/placeFacade';
import Rating from './Rating';
import auth from '../authorization/auth';

export class MapTest2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            data: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedLocation: {},
        }
    }

    hasUserRated = (userId, ratings, placeId) => {
        alert(ratings);
        if (this.state.showingInfoWindow === true) {
            let filterResult = ratings.filter(rating => {
                return userId === rating.userId;
            });
            if (filterResult.length > 0) {
                return "you have already rated";
            }
            return <Rating placeId={placeId} userId={this.props.userId} updateTable={this.props.updateTable} />
        }
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

    render() {
        console.log(this.state);
        const mapped = this.props.placeList.map(function(place){ return <p>place.id</p> });
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
                        <div>
                            <p>{this.state.selectedLocation.title}</p>
                            <p>{this.state.selectedLocation.description}</p>
                            {mapped}
                        </div>
                    </InfoWindow>

                </Map>
            </div>

        )
    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4'
})(MapTest2);