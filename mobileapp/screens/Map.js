import React from 'react';
import MapView from 'react-native-maps';
const url = require('../package.json').serverURL;
import { Text, Image, Button, View, WebView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      houses: []
    }
  };

  componentWillMount() {
    fetch(url + "api/location/all")
      .then(res => res.json())
      .then(data => {
        this.setState({
          locations: data
        });
      })
    this.getHouses();
  }

  getHouses = () => {
    fetch(url + "api/house/all")
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        })
      })
  }

  splitGeo = (location) => {
    let geo = location.geo;
    if (geo) {
      let geoArr = geo.split(',');
      return { latitude: parseFloat(geoArr[0]), longitude: parseFloat(geoArr[1]) };
    }
    return { latitude: 50, longitude: 50 }
  }

  render() {
    return (

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 56.26392,
          longitude: 10.501785,
          latitudeDelta: 3.0922,
          longitudeDelta: 4.0421

        }}
      >
        {this.state.locations.map(location => (
          <MapView.Marker
            coordinate={this.splitGeo(location)}
            key={location.id}

            pinColor='#FC0000'>

            <MapView.Callout>
              <View><Text> Title: {location.title}</Text>
                <Image source={{ uri: "https://jdbh.dk/images/" + location.imageUri }} style={{ height: 100, width: 200 }} />

                <Text> description : {location.description} </Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ))}
        {this.state.houses.map(house => (
          <MapView.Marker key={house.id}
            coordinate={this.splitGeo(house)}
            title={house.title}
            description={house.description}
            pinColor='#0019FC'
          />
        ))}
      </MapView>
    );
  }

}