'use strict';

import React, { Component } from "react";
import {Platform, StyleSheet, Text, View, Button, Alert, SafeAreaView, TouchableOpacity, TouchableHighlight, Dimensions, ActivityIndicator, AsyncStorage, Modal } from 'react-native';
var height = Dimensions.get('window').height;

class LoginModal extends Component {

  constructor(props) {
    super(props);
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
