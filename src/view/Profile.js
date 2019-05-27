import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import  Button  from '../components/button'
import config from '../../config';
import { getInfo } from '../service';
export default class Profile extends Component {
  
  render()
   {
    return (
      <View style={styles.container}>
        <Text>{config.currentUser.name}</Text>
        <Button style={styles.buttonStyle}onPress={ () => {
          AsyncStorage.removeItem('@Token:key')
          .then(() => {this.props.screenProps.logout()
          config.currentUser={}})}} ><Text style={styles.textStyle}>Log out </Text></Button>
      </View>
    )
  }
}
const styles = {
  container:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C72CC'

  },
  textStyle: {
    textAlign: "center",
    color: "#0a59a9",
  },
  buttonStyle: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 12,
    width:200
   }
}