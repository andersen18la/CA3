import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import placeData from '../facades/placeFacade';

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
<<<<<<< HEAD
=======
            rating: { userId: this.props.userId, ratingValue: "0", locationId: this.props.placeId},
            dummyHouses: [
                {id: 1, city: "Slagelse", geo: "55.403692,11.355257", description : "det er jo et flot hus nr 1"},
                {id: 2, city: "Næstved", geo: "55.224613,11.759207", description : "det er jo et flot hus nr 2"},
                {id: 3, city: "Ribe", geo: "55.326936,8.774665", description : "det er jo et flot hus nr 3"},
                {id: 4, city: "Pedersker", geo: "55.030893,14.992430", description : "det er jo et flot hus nr 4"},
                {id: 5, city: "Holstebro", geo: "56.361534,8.621727", description : "det er jo et flot hus nr 5"},
                {id: 6, city: "Grindsted", geo: "55.758322,8.924949", description : "det er jo et flot hus nr 6"}]
>>>>>>> 46756861c9ba503cda2d46702db2c89716130a80
        };
    }

    componentWillMount() {
        placeData.getData((e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data });
        });
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
                    {this.state.dummyHouses.map(location => (
                        <Marker icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
     
                        }} key={location.id}
                            loc={location.geo}
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