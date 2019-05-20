import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const TOKEN = '@Token:key'

export const authorize = ({username, password,login}) => {
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    var data = {
        username: username, 
        password: password, 
        from: 'TK'
    }
    console.log(data)
    var data2={
        username: 'tony@school.com',
        password : '$ch00l',
        client: 'TK'
    }
   
//probat oba servera odjednom
    // axios.post("http://localhost:5000/auth/login", data, axiosConfig)
    //   .then(res => {
    //     AsyncStorage.setItem(TOKEN, res.data.token);
    //     login()
    //     return true;
    //   })
    //   .catch(err => {
    //     console.warn(err);
    //     return false;
    //   });
    axios.post('http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/auth/login', data2, axiosConfig)
      .then(res => {
        AsyncStorage.setItem(TOKEN, res.data.token);
        login()
        return true;
      })
      .catch(err => {
        console.warn(err);
        return false;
      });
}