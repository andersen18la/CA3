import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import placeData from '../facades/placeFacade';
import houseFacade from '../facades/houseFacade';

const locationurl = "/location/";


export class MapTest2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            data: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedLocation: {},
            houses: []
        };
    }

    componentWillMount() {
        houseFacade.getData((e, houses) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", houses });
        });
    }

    onHouseClickHandler = () => {

    }

    onMarkerClickHandler = (markerProps, marker) => {
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
        console.log(this.state)
        return (
            <div id="hvadfanden">
                <Map id="thisIsMap" google={this.props.google}
                    style={{ left: '17%', top: 90, width: '65%', height: '65%' }}
                    zoom={7}
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

                    {this.state.houses.map(house => (
                        <Marker icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

                        }} key={house.id}
                            loc={house.geo}
                            id={house.id}

                            position={this.splitGeo(house)}
                            onClick={this.onHouseClickHandler}
                        />
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <p>{this.state.selectedLocation.title}</p>
                            <a href={locationurl + this.state.selectedLocation.id}><h3>Location info</h3></a>
                        </div>
                    </InfoWindow>

                </Map>
            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4'
})(MapTest2);