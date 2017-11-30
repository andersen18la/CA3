import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import placeFacade from '../facades/placeFacade';

const center = [56, 10.5];
const zoom = 7;
const apikey = "AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4";

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

class Marker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={greatPlaceStyle}>
                {this.props.text}
            </div>
        );
    }
}

export default class MapTest3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            data: [],
        }
    }

    componentWillMount() {
        placeFacade.getData((e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data });
        });
    }

    splitGetLat = location => {
        let geo = location.geo;
        let geoArr = geo.split(',');
        return geoArr[0];
    }

    splitGetlng = location => {
        let geo = location.geo;
        let geoArr = geo.split(',');
        return geoArr[1];
    }

    render() {
        return (
            <div style={{ width: '100%', height: '500px' }}>
                <GoogleMap
                    bootstrapURLKeys={{
                        key: apikey,
                        language: 'dk'
                    }}
                    defaultCenter={center}
                    zoom={zoom}
                >
                    {this.state.data.map(location => (
                        <Marker key={location.id} lat={this.splitGetLat(location)} lng={this.splitGetlng(location)} text={location.id} />
                    ))}                    
                </GoogleMap>
            </div>
        );
    }

}