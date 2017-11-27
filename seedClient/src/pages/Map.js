import React, { Component } from 'react';
import {GoogleMapReact, Marker} from 'google-map-react';
import ReactDOM from 'react-dom';
import geocoder from 'geocoder'



const AnyReactComponent = ({ text, alerthis }) => (


    <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 30, width: 60, top: -20, left: -30,

    }}>
        {/*<button onClick={alerthis}>click here</button>*/}
        {text}
    </div>

);

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "null", lat: 0.0, lng: 0.0 }
        this.getCoords = this.getCoords.bind(this);
        this.goToPlace = this.goToPlace.bind(this);
        this.alerthis = this.alerthis.bind(this);
        this.testing = this.testing.bind(this);
    }

    static defaultProps = {
        center: { lat: 55.41904033, lng: 10.33593535 },
        zoom: 6
    };
    alerthis() {
        alert("qwewq");
    }
    testing() {
        this.getCoords();
        setTimeout(() => {
            this.goToPlace();
          }, 1000);
    }

    getCoords() {
        try {

            geocoder.geocode(document.getElementById("cityname").value + ", DK", function (err, data) {
                console.log(data);
                try {
                    document.getElementById("lat").value = data.results[0].geometry.location.lat;
                    document.getElementById("lng").value = data.results[0].geometry.location.lng;
                    document.getElementById("msg").style.color = "green";
                    document.getElementById("msg").innerHTML = "success!"
                } catch (e) {
                    document.getElementById("msg").style.color = "red";
                    document.getElementById("msg").innerHTML = "failure...";
                }
            });

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
                        alerthis={this.alerthis}

                    />
                </GoogleMapReact>
                {this.state.coords}
                <button onClick={this.testing}>go to destination</button>
                <input id="cityname" type="text" /><span id="msg"></span>
                <input id="lat" type="hidden" value="55.41904033" />
                <input id="lng" type="hidden" value="10.33593535" />
                <p>coordinates: city: {this.state.city}, lat:{this.state.lat}, lng:{this.state.lng}</p>
            </div>
        );
    }
}
