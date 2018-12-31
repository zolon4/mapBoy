/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1Ijoiem9sb24iLCJhIjoiY2pxY3ZucGFlM20zbTQ4bjIwaWl1eGw5NCJ9.z9-BvSlFUuNxVVqwuz11Sw');

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
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  }

  centerMap () {
    if (this.state.latitude) {
      this.map.setCamera({
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
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          showUserLocation={true}
          centerCoordinate={[this.state.longitude, this.state.latitude]}
          onUpdateUserLocation={this.onUserLocationUpdate.bind(this)}
          style={styles.container}>
          {this.renderAnnotations("LOOK")}
        </Mapbox.MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
