'use strict';

import React, { Component } from "react";
import {Platform, StyleSheet, Text, View, Button, Alert, SafeAreaView, TouchableOpacity, TouchableHighlight, Dimensions, ActivityIndicator, AsyncStorage, Modal, TextInput, Fetch } from 'react-native';
var height = Dimensions.get('window').height;

class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin() {
    var _this = this
    fetch('http://localhost:3000/api/v1/sessions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then(response => response.json())
    .then(json => _this.props.setUser(json))
  }

  render() {

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        style={styles.modal}
        transparent={true}
        shouldCloseOnOverlayClick={true}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={{fontFamily: 'NunitoSans-Black', fontSize: 20, textAlign: "center"}}>Log In</Text>
            <TouchableOpacity style={styles.button} onPress={() => { this.props.setModalVisible(!this.props.visible); }}>
              <Text style={styles.buttonTextSmall}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={{height: 40 }}
              placeholder='Username'
              autoCapitalize='none'
              onChangeText={(text) => this.setState({username: text}) }
            />
            <TextInput
              style={{height: 40 }}
              placeholder='Password'
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text}) }
            />
            <TouchableOpacity style={styles.button} onPress={this.submitLogin}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

}

var styles = StyleSheet.create({
  modal: {
    flex: 1
  },
  modalContent: {
    fontFamily: 'NunitoSans-Black',
    padding: 20,
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    height: height / 2
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  modalBody: {
    alignSelf: 'stretch',
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
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'NunitoSans-Black',
  },
});

export default LoginModal;
