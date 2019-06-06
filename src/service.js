import axios from "axios";
import { AsyncStorage } from "react-native";
import config from "../config";
export const TOKEN = "@Token:key";
const HOST_ADDRESS = "192.168.60.24";

export const authorize = ({ username, password, login, saveInfo }) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  };
  var data = {
    username: "zakir@gmail.com",
    password: "Apollo123!",
    from: "TK"
  };
  // console.log(data)
  var data2 = {
    username: "tony@school.com",
    password: "$ch00l",
    client: "TK"
  };

  axios
    .post(
      "http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/auth/login",
      data2,
      axiosConfig
    )
    .then(res => {
      AsyncStorage.setItem(TOKEN, res.data.token);
      AsyncStorage.getItem(TOKEN).then(res => {
       
        getInfo(res)

      });
      login();
      // saveInfo()
    })
    .catch(err => {
      console.warn(err);
      return false;
    });
};
export const getInfo =  data => {

  axios
    .post("http://" + HOST_ADDRESS + ":5000/auth/unpack", {token: data})
    .then(res => {
      config.currentUser = res.data.currentUser;
      // console.log(config.currentUser)
      return true;
    })
    .catch(err => {
      console.warn(err);
      return false;
    });
};
export const getUsers = async () => {
  let users = axios.get(
    //  "http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/people",
    "http://" + HOST_ADDRESS + ":3000/api/people"
  );
  return users;
};
export const updateUsers = async (id, person) => {
  const value = await AsyncStorage.getItem(TOKEN);
  // axios.put("http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/people/"+id, person, axiosConfig)
  return axios.put("http://" + HOST_ADDRESS + ":3000/api/people/" + id, person); //axiosConfig)
};
export const getTasks = async ({ id, month, year }) => {
  const value = await AsyncStorage.getItem(TOKEN);
  let axiosConfig = {
    headers: {
      Authorization: `Bearer ${value}`
    }
  };
  let xyear=2017
  let xmonth=12
  let xid='5ca9bb881e5f1166c483ba80'
  console.log('getting data with ',xyear,xmonth,xid)
  let items = axios.get(
    `http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:3000/api/month/${xid}/${xyear}/${xmonth}`,
    axiosConfig
  );
  // console.log("DATA FATCHED: ", items);
  return items;
};
