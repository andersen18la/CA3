import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import houseFacade from '../facades/houseFacade';
import HouseList from './HouseList';

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
            selectedHouse: {},
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

    onHouseClickHandler = (markerProps, marker) => {
        console.log("bob");
    }

    onMarkerClickHandler = (markerProps, marker) => {
        let selectedLocation = markerProps.loc;
        let activeMarker = marker;
        this.setState({
            activeMarker, selectedLocation, showingInfoWindow: true, selectedHouse: {}
        });
    }

    splitGeo = (location) => {
        let geo = location.geo;
        let geoArr = geo.split(',');
        return { lat: geoArr[0], lng: geoArr[1] };
    }

    render() {
        console.log(this.state);
        var houeArray = [];
        if(typeof this.props.houseList !== "undefined" && this.props.houseList.length !== 0){
            houeArray = this.props.houseList;
        } else {
            houeArray = this.state.houses;
        }//this.props.houselist = works only if house has been added, else use this.state.houses
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

                    {houeArray.map(house => (
                        <Marker icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

                        }} key={house.id}
                            loc={house}
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