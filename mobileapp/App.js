import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Places from './screens/Places';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';

const RootNavigator = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Places: {
    screen: Places,
    navigationOptions: {
      tabBarLabel: 'Places',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  AddPlace: {
    screen: AddPlace,
    navigationOptions: {
      tabBarLabel: 'Add Place',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  }
}, {
    tabBarPosition: 'bottom',
  })

export default RootNavigator;

