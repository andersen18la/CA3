import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapTest2 extends Component {
    constructor(props) {
        super(props)
        this.setState = { places: [] }
    }

    componentDidMount() {
        this.setState({
            places: this.props.places
        });
    }

}
