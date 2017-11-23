import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';
import geocoder from 'geocoder'



const AnyReactComponent = ({ text }) => (
    <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 40, width: 60, top: -20, left: -30,
    }}>
        {text}
    </div>

);

export default class Map extends Component {

    static defaultProps = {
        center: { lat: 55.41904033, lng: 10.33593535 },
        zoom: 11
    };

    getCoords(){
        geocoder.geocode("" + document.getElementById("cityname").value +", DK", function(err, data){
            console.log(data.results[0].geometry.location);
            alert(data.results[0].geometry.location.lat + ", " + data.results[0].geometry.location.lng);
        })
    }


    render() {
        return (

            <div style={{ width: '100%', height: '500px' }}>


                <button onClick={this.askCity}>here</button>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}



                >
                    <AnyReactComponent
                        lat={55.41904033}
                        lng={10.33593535}
                        text={'denmark test'}
                    />
                </GoogleMapReact>
                <input id="cityname" type="text"/>
<input id="btn" type="button" onClick={this.getCoords} value="search for miami coordinates" />
            </div>
        );
    }
}
