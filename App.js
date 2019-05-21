import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {getRootNavigator} from './src/navigation'
export default class App extends React.Component {
  
  state={
    loggedIn:null
  }
 
  async componentDidMount(){
    const value = await AsyncStorage.getItem('@Token:key')
    if (value) {
      this.setState({
        loggedIn: true 
      })
    } else {
      this.setState({
        loggedIn: false 
      })
    }
  }
  render() {
    const RootNavigator= createAppContainer(getRootNavigator(this.state.loggedIn))
    // if(AsyncStorage.getItem('TOKEN')===undefined)
    return (
        <RootNavigator screenProps={{
          login: () => this.setState({loggedIn: true}),
          logout: () => this.setState({loggedIn: false})}}
          />
    )
  }
}