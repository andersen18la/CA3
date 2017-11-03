import React from 'react';
import { StyleSheet, Text, View,Button,Alert } from 'react-native';
import all from "./facades/fetchfacade";

export default class App extends React.Component {
getAll() {
Alert.alert( all.getAll);
}
  render() {
    return (
      <View style={styles.container}>
      <Button onPress={this.getAll} title="getinfo"/>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
