import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import  Button  from '../components/button'
import PersonCalendar from '../components/calendar'
export default class Calendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PersonCalendar></PersonCalendar>
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
  }
}