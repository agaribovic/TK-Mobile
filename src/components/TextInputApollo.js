import React, { Component } from 'react'
import { TextInput, View,StyleSheet } from 'react-native'

export default class TextInputApollo extends Component {
  render() {    
    return (
        <View>
        <TextInput 
        style={this.props.style}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        returnKeyType={this.props.returnKeyType}
        keyboardType={this.props.keyboardType}
        autoCapitalize={this.props.autoCapitalize}
        autoCorrect={this.props.autoCorrect}
        onSubmitEditing={this.props.onSubmitEditing}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        ></TextInput>
        </View>
    )
  }
}


