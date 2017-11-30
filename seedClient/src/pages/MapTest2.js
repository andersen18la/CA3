import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import placeFacade from '../facades/placeFacade'

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
        return (
            <div id="hvadfanden">
                <Map google={this.props.google}
                    style={{ width: '75%', height: '65%', position: 'absolute' }}
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