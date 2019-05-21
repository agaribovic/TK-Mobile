import axios from 'axios';
import { AsyncStorage } from 'react-native'

export const TOKEN = '@Token:key'

export const authorize = ({username, password }) => {
  var data = {
    username: username,
    password: password,
    client: 'TK'
  }
  let axiosConfig = { 
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  axios.post('http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/auth/login', data, axiosConfig)
    .then(res => {
      AsyncStorage.setItem(TOKEN, res.data.token);
      return true;
    })
    .catch(err => {
      console.warn(err);
      return false;
    })
}

//PEople api

export const getUsers = async () => {
  const value = await AsyncStorage.getItem(TOKEN);

  let axiosConfig = {
    headers :{
      'Authorization' : `Bearer ${value}`
    }
  };

  let users = axios.get('http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/people', axiosConfig);

  return users.data;
}