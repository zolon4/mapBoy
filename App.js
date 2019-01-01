/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Modal
} from 'react-native';
import LoginModal from './src/components/Login/LoginModal'
import Mapbox from '@mapbox/react-native-mapbox-gl';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
Mapbox.setAccessToken('pk.eyJ1Ijoiem9sb24iLCJhIjoiY2pxY3ZucGFlM20zbTQ4bjIwaWl1eGw5NCJ9.z9-BvSlFUuNxVVqwuz11Sw');



type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      latitude: 22.3827448,
      longitude: 114.139249,
      modalVisible: false,
      user: undefined
    }
    this.centerMap = this.centerMap.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setUserLocation = this.setUserLocation.bind(this)
    this.setUser = this.setUser.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.setUserLocation()
    this._retrieveData('user')
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  _storeData = async(key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      console.log(error)
    }
  }

  _retrieveData = async(key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        this.setState({user: JSON.parse(value)})
      }
     } catch (error) {
       console.log(error)
     }
  }

  _removeData = async(key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  onUserLocationUpdate(location) {
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  }

  centerMap () {
    if (this.state.latitude) {
      this._map.setCamera({
        centerCoordinate: [this.state.longitude, this.state.latitude],
      });
    }
  }

  setUser(user) {
    this._storeData("user", JSON.stringify(user))
    this.setState({ user: user, modalVisible: false })
  }


  logOut() {
    this._removeData("user")
    this.setState({user: undefined})
    Alert.alert("You've been logged out")
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
            <LoginModal visible={this.state.modalVisible} setModalVisible={this.setModalVisible} setUser={this.setUser} />
            <TouchableOpacity style={styles.button} onPress={this.centerMap}>
              <Text style={styles.buttonText}>Center Map</Text>
            </TouchableOpacity>
            { !this.state.user && (
              <TouchableOpacity
                style={styles.logInButton}
                onPress={() => { this.setModalVisible(true);}}
                >
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            )}

            { this.state.user && (
              <TouchableOpacity
                style={styles.logOutButton}
                onPress={this.logOut}
                >
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            )}
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
  button: {
    alignSelf:'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 'auto',
    marginHorizontal: 'auto',
    borderRadius: 15
  },
  logInButton: {
    alignSelf:'center',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 10,
    marginTop: 3,
    paddingHorizontal: 15,
    width: 'auto',
    marginHorizontal: 'auto',
    borderRadius: 15
  },
  logOutButton: {
    alignSelf:'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
    marginTop: 3,
    paddingHorizontal: 15,
    width: 'auto',
    marginHorizontal: 'auto',
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'NunitoSans-Black',
  },
  buttonTextSmall: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'NunitoSans-Black',
  },
});
