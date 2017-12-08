import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Alert, Text, TextInput, Button, Image } from 'react-native';
import { ImagePicker, Location } from 'expo';
const URL = require('../package.json').serverURL;

export default class AddPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            city: "",
            street: "",
            zip: "",
            description: "",
            geo: "",
            image: null,
            status: "",
            uploading: false
        }
    }
    componentWillMount() {
        this._getLocation();
    }

    _getLocation = async () => {
        let geoFromPhone = await Location.getCurrentPositionAsync({});
        let geo = geoFromPhone.coords.latitude + "," + geoFromPhone.coords.longitude;
        this.setState({
            geo
        })
        this._getAddress();
    }

    _getAddress = async () => {
        let geo = this.state.geo;
        let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + geo);
        // only proceed once promise is resolved
        let data = await response.json();
        let address = data.results[0].address_components;
        let city = address[2].long_name;
        let zip = address[address.length - 1].long_name;
        let street = address[1].long_name + " " + address[0].long_name;
        this.setState({
            city, zip, street
        })
    }

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        this.setState({ image: pickerResult });
    }

    addLocation = () => {
        let data = new FormData();
        let location = this.state;
        data.append("title", location.title);
        data.append("city", location.city);
        data.append("description", location.description);
        data.append("street", location.street);
        data.append("zip", location.zip);
        data.append("geo", location.geo);
        data.append("user", 'APP User');

        let uriParts = this.state.image.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let fileName = this.state.image.uri.split('/').pop();
        data.append('file', {
            uri: this.state.image.uri,
            name: `photo.${fileName}`,
            type: `image/${fileType}`,
        });
        fetch(URL + "api/location/add",
            {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                Alert.alert("Upload success");

            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>Add your current location!</Text>
                <Text>city: {this.state.city}</Text>
                <Text>street: {this.state.street}</Text>
                <Text>zip: {this.state.zip}</Text>
                <Text>title</Text><TextInput style={styles.input}
                    onChangeText={element => this.setState({ title: element })}
                />
                <Text>description</Text><TextInput style={styles.input}
                    onChangeText={element => this.setState({ description: element })}
                />

                <Text>{this.state.status}</Text>
                <Text>
                    {"\n"}
                </Text>
                <Button title='Select Image' onPress={this._pickImage} />
                {this.state.image && <Image source={this.state.image} style={{ width: 260, height: 140 }} />}
                {this.state.image && <Button title='add your current location' onPress={this.addLocation} />}
            </View>

        )
    }


}
const styles = StyleSheet.create({
    input: { width: 175, backgroundColor: 'lightblue' }
});
