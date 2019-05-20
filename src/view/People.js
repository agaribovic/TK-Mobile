import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class People extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View>
        <Text> People </Text>
      </View>
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