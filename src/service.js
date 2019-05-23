import axios from "axios";
import { AsyncStorage } from "react-native";
import config from "../config";
export const TOKEN = "@Token:key";
const HOST_ADDRESS="192.168.30.89"
export const authorize = ({ username, password, login }) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  };
  var data = {
    username: 'zakir@gmail.com',
    password: 'Apollo123!',
    from: "TK"
  };
  // console.log(data)
  var data2 = {
    username: "tony@school.com",
    password: "$ch00l",
    client: "TK"
  };
//OCISTIT STATE, UPDATE PRORADI, POMJERIT TIPKE, UPLOAD SLIKE 
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
  //  axios.post("http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/auth/login", data2, axiosConfig)
  axios.post("http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/auth/login", data2, axiosConfig)
    .then(res => {

      AsyncStorage.setItem(TOKEN, res.data.token);
      login()
      return true;
    })
    .catch(err => {
      console.warn(err);

      return false;
    });
};
// export const getInfo = async (data)=>{
//   axios.post("192.168.30.89:5000/auth/unpack", data)
//     .then(res => {
//       config.currentUser=res.currentUser
//       return true;
//     })
//     .catch(err => {
//       console.warn(err);
//       return false;
//     });
// }
export const getUsers = async () => {

  let users = axios.get(
    // "http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/people",
    "http://"+HOST_ADDRESS+":3000/api/people",

    // "http://localhost:3000/api/people",
  );
  return users;
};




export const updateUsers = async (id,person) => {
  console.log("TCL: updateUsers -> person", person)
  console.log("TCL: updateUsers -> id", id)
  const value = await AsyncStorage.getItem(TOKEN);
  let axiosConfig = {
    headers: {
      Authorization: `Bearer ${value}`
    }
  };
  // axios.put("http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/people/"+id, person, axiosConfig)
  return axios.put("http://"+HOST_ADDRESS+":3000/api/people/"+id, person )//axiosConfig)
  
  // .then(res => {
     
  //     return true;
  //   })
  //   .catch(err => {
  //     console.warn(err);
  //     return false;
  //   });
};
