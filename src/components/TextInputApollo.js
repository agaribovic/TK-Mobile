import React, { Component } from 'react'
import { TextInput, View,StyleSheet } from 'react-native'

export default class TextInputApollo extends Component {
  render() {    
    return (
        <View>
        <TextInput style={styles.txtinput}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        returnKeyType={this.props.returnKeyType}
        keyboardType={this.props.keyboardType}
        autoCapitalize={this.props.autoCapitalize}
        autoCorrect={this.props.autoCorrect}
        onSubmitEditing={this.props.onSubmitEditing}
        secureTextEntry={this.props.secureTextEntry}
        ></TextInput></View>
    )
  }
}
const styles=StyleSheet.create({
    txtinput:{
        height:40,
        backgroundColor:'rgba(255,255,255,0.7)',
        marginBottom:20,
        color:'#fff',
        paddingHorizontal:10,
        marginLeft:20,
        marginRight:20,
        borderRadius:12
    }
})

