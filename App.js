import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {getRootNavigator} from './src/navigation'
export default class App extends React.Component {
  state={
    loggedIn:null
  }
 componentDidMount(){
   this.setState({
     loggedIn:false
   })
 }
  render() {
    const RootNavigator= createAppContainer(getRootNavigator(this.state.loggedIn))
    return (
      <RootNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
