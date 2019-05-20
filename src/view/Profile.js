import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import  Button  from '../components/button'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button onPress={ () => {
          AsyncStorage.removeItem('@Token:key')
          .then(() => this.props.screenProps.logout())}} width={200}>Logout</Button>
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