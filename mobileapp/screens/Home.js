import React from 'react';
import { Image, StyleSheet, ActivityIndicator, Alert, Button, Text, ScrollView, View, TextInput } from 'react-native';
import { ImagePicker } from 'expo';
const URL = require('../package.json').serverURL;

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            city: "",
            street: "",
            zip: "",
            description: "",
            geo: "",
            image: null,
            status: "",
            uploading: false,
        };
    }

    onChangeHandler = e => {
        let target = e.target;
        let name = target.title;
        let value = target.value;
        this.setState(prevState => (
            {
                location: { ...prevState.location, [name]: value }
            }
        ));
    }

    submitData = (uri) => {
        if (
            this.state.title !== "" &&
            this.state.city !== "" &&
            this.state.street !== "" &&
            this.state.zip !== "" &&
            this.state.description !== "" &&
            this.state.geo !== ""
        ) {
            this.setState({ uploading: true });
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            let fileName = uri.split('/').pop();
            const place = this.state;
            //let file = document.querySelector('input[type="file"]');
            let data = new FormData();
            data.append('file', {
                uri: uri,
                name: `photo.${fileName}`,
                type: `image/${fileType}`,
            });
            data.enctype = "";
            //det her må man kunne gøre mere smart...
            data.append("title", place.title);
            data.append("city", place.city);
            data.append("description", place.description);
            data.append("street", place.street);
            data.append("zip", place.zip);
            data.append("geo", place.geo);
            data.append("user", 'WEB User');
            fetch(URL + "api/location/add",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(data => {
                    Alert.alert("upload success!");
                    this.setState({ status, uploading: false })

                }).catch(error => {
                    console.log(error);
                });
        } else {
            Alert.alert("A field was empty");
        }

    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    doesAddressExistInTheRealWorld = (uri) => {
        //kan være den driller når man deployer...
        //fetch string for addresser og zip: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.place.street + "+zip=" + this.state.place.zip + "country=dk"
        //fetch string for kun byer: ""https://maps.googleapis.com/maps/api/geocode/json?address=''+zip=" + this.state.place.city + "country=dk""
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.street + "+city=" + this.state.city + "+country=dk")
            .then(res => res.json())
            .then(data => {
                console.log("forhelve" + data.results[0])
                if (data.status !== "ZERO_RESULTS") {
                    console.log("vi er herinde" + data);
                    //så laver vi en ægte geolocation...
                    let lat = data.results[0].geometry.location.lat;
                    let lng = data.results[0].geometry.location.lng;
                    let geo = lat + "," + lng;
                    Alert.alert(lat + ", " + lng);
                    this.setState({ geo: geo });
                    this.submitData(uri);
                } else {
                    this.submitData(uri);
                }
            });
    };
    render() {
        let { image } = this.state;
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>title</Text><TextInput style={styles.input}
            title="title"
            onChangeText={element => this.setState({ title: element })}
        />
            <Text>city</Text><TextInput style={styles.input}
                title="city"
                onChangeText={element => this.setState({ city: element })}
            />
            <Text>street</Text><TextInput style={styles.input}
                title="street"
                onChangeText={element => this.setState({ street: element })}
            />
            <Text>zip</Text><TextInput style={styles.input}
                title="zip"
                onChangeText={element => this.setState({ zip: element })}
            />
            <Text>description</Text><TextInput style={styles.input}
                title="description"
                onChangeText={element => this.setState({ description: element })}
            />


            <Text>{this.state.status}</Text>
            <Text>
                {"\n"}
            </Text><View style={{
                borderRadius: 4,
                borderWidth: 2.0,
                borderColor: 'red',
            }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 260, height: 140 }} />}</View>
            {image && <Button title="Add Location" color="#4B0082" onPress={() => {
                this.setState({ uploading: true });
                this.doesAddressExistInTheRealWorld(image);
            }
            } />}
        </View>)
    }
}
const styles = StyleSheet.create({
    input: { width: 175, backgroundColor: 'lightblue' }
});