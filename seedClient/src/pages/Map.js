import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';
import geocoder from 'geocoder'
import Places from './Places'
import placeData from '../facades/placeFacade'
const URL = require("../../package.json").serverURL;



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
        this.state = { city: "null", lat: 0.0, lng: 0.0}
        this.getCoords = this.getCoords.bind(this);
        this.goToPlace = this.goToPlace.bind(this);
        this.alerthis = this.alerthis.bind(this);
        this.testing = this.testing.bind(this);
        this.dataStuff = this.dataStuff.bind(this);
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

    dataStuff = () => {
        
        fetch(URL + "api/location/all").then(res => {
                return res.json();
            }).then(data => {
                var fill = "";
                
                for(var i = 0; i < data.length; i++){
                    if(i == data.length -1){
                        fill+=data[i].city
                    } else {
                    fill+=data[i].city + ",";
                    }
                    document.getElementById("cities").innerHTML =fill;
                }
            })
    }
    splitTest(){
        var arr = document.getElementById("cities").innerHTML.split(",");
        var mapped = arr.map(function(element){ return <AnyReactComponent lat="0.0" lng="0.0" text={arr[0].city}/> })
        document.getElementById("yo").innerHTML = mapped;
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
                    <div id="yo"></div>
                  
                </GoogleMapReact>
                {this.state.coords}
                <button onClick={this.testing}>go to destination</button>
                <input id="cityname" type="text" /><span id="msg"></span>
                <input id="lat" type="hidden" value="55.41904033" />
                <input id="lng" type="hidden" value="10.33593535" />
                <p>coordinates: city: {this.state.city}, lat:{this.state.lat}, lng:{this.state.lng}</p>
                <button onClick={this.dataStuff}>here</button>
                <button onClick={this.splitTest}>after</button>
                <p id="cities"></p>

            </div>
        );
    }
}