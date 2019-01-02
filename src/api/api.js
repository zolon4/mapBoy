import { Fetch } from 'react-native';

const Api = {
  updateUserLocation: function(latitude, longitude, token, callback){
    console.log('updating location')
    fetch('http://localhost:3000/api/v1/me/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        token: token
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson)
    })
  },

}

export default Api;
