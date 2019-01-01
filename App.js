/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1Ijoiem9sb24iLCJhIjoiY2pxY3ZucGFlM20zbTQ4bjIwaWl1eGw5NCJ9.z9-BvSlFUuNxVVqwuz11Sw');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      latitude: 22.3827448,
      longitude: 114.139249
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  onUserLocationUpdate(location) {
    console.log(location)
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  }

  centerMap () {
    if (this.state.latitude) {
      this._map.setCamera({
        centerCoordinate: [this.state.longitude, this.state.latitude],
      });
    }
  }

  renderAnnotations (title) {
    return (
      <Mapbox.PointAnnotation key='pointAnnotation' id='pointAnnotation' coordinate={[this.state.longitude, this.state.latitude]}>
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title={title} />
      </Mapbox.PointAnnotation>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          ref={(c) => this._map = c}
          styleURL={Mapbox.StyleURL.Dark}
          zoomLevel={15}
          showUserLocation={true}
          centerCoordinate={[this.state.longitude, this.state.latitude]}
          onUserLocationUpdate={this.onUserLocationUpdate.bind(this)}
          style={styles.map}>
          <SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={this.centerMap.bind(this)}>
              <Text style={styles.buttonText}>Center Map</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Mapbox.MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: width
  },
  map: {
    flex: 1,
    height: height,
    width: width
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  button: {
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 'auto',
    marginHorizontal: 'auto',
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Bold',
    fontWeight: 'bold',
  }
});
