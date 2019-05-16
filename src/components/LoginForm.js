import React, { Component } from 'react'
import { TextInput,StatusBar,Text,TouchableOpacity ,View,StyleSheet } from 'react-native'

export default class LoginForm extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
       {/* <StatusBar
       barStyle="light-content"/> */}
        <TextInput
        placeholder='username or email'
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={()=> this.passwordInput.focus()}
        />
        <TextInput
        placeholder='password'
        style={styles.input}
        returnKeyType="go"
        placeholderTextColor="rgba(255,255,255,0.7)"
        secureTextEntry={true}
        ref={(input)=> this.passwordInput=input}
        />

        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    container:{
        padding:20
    },
    input:{
        height:40,
        backgroundColor:'rgba(255,255,255,0.7)',
        marginBottom:20,
        color:'#fff',
        paddingHorizontal:10,
        marginLeft:20,
        marginRight:20,
        borderRadius:12
    },
    buttonContainer:{
        backgroundColor:'#ffffff',
        paddingVertical:15,
        marginBottom:20,  marginLeft:50,
        marginRight:50,
        borderRadius:12
    },
    buttonText:{
        textAlign:'center',
        color:'#0a59a9',
    }
})
