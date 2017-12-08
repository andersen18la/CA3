import React from 'react';
import { Image, Header, StyleSheet, Text, View, ScrollView, Button, Alert, RefreshControl } from 'react-native';
import Location from './Location';
const URL = require('../package.json').serverURL;
const imageURL = require('../package.json').imageURL;
export default class Places extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            refreshing: false,
        };
    }

    static navigationOptions = {
        tabBarLabel: 'Places',
    };

    componentWillMount() {
        fetch(URL + "api/location/all")
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                var arr = responseJson;
                this.setState({ data: responseJson });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        fetch(URL + "api/location/all")
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                var arr = responseJson;
                this.setState({ data: responseJson, refreshing: false });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {


        return (

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                {this.state.data.map(location => {
                    return <Location key={location.id} location={location} />
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { textAlign: 'center', fontSize: 10 },
    row: { height: 70 },
});