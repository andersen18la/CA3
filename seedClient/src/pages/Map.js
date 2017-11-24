import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';
import geocoder from 'geocoder'



const AnyReactComponent = ({ text }) => (


    <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 30, width: 60, top: -20, left: -30,
    }}>
        {text}
    </div>

);

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "null", lat: 0.0, lng: 0.0 }
        this.getCoords = this.getCoords.bind(this);
        this.goToPlace = this.goToPlace.bind(this);
    }
    static defaultProps = {
        center: { lat: 55.41904033, lng: 10.33593535 },
        zoom: 6
    };

    getCoords() {



        try {

            geocoder.geocode(document.getElementById("cityname").value + ", DK", function (err, data) {
                console.log(data);
                try{
                document.getElementById("lat").value = data.results[0].geometry.location.lat;
                document.getElementById("lng").value = data.results[0].geometry.location.lng;
                alert("it worked! now click go to 'go location' to make the pinpoint appear");
                } catch(e){
                    alert("location doesn't exist, try again");
                }
            })
        } catch (e) {
            alert("error");
        }
    }
    goToPlace() {
        this.setState({ city: document.getElementById("cityname").value, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value });
    }


    render() {



        return (
            <div style={{ width: '100%', height: '500px' }}>
                <h3>Hello, please enter a city, street or zip that exists in Denmark in order to pinpoint your destination</h3>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}



                >
                    <AnyReactComponent
                        lat={this.state.lat}
                        lng={this.state.lng}
                        text={this.state.city}
                    />
                </GoogleMapReact>
                {this.state.coords}
                <input id="cityname" type="text" />
                <input id="btn" type="button" onClick={this.getCoords} value="register location" />
                <input id="lat" type="hidden" value="55.41904033" />
                <input id="lng" type="hidden" value="55.41904033" />
                <input id="btn2" type="button" onClick={this.goToPlace} value="go to location" />
                <p>coordinates: city: {this.state.city}, lat:{this.state.lat}, lng:{this.state.lng}</p>
            </div>
        );
    }
}
