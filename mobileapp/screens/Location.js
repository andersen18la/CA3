import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
const imageURL = require('../package.json').imageURL

export default class Location extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const location = this.props.location;
        const uri = "https://jdbh.dk/images/" + location.imageUri;
        console.log("bommelum" + uri);
        return (
            <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: uri }}
                />
                <Text>{location.title}</Text>
                <Text>{location.description}</Text>
                <Text>{location.street}</Text>
                <Text>{location.city}</Text>
                <Text>{location.zip}</Text>
                <Text>{location.rating}</Text>
            </View>
        )
    }
}
