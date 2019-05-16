import React, { Component } from 'react'
import { TextInput,StatusBar,Text,TouchableOpacity ,View,StyleSheet } from 'react-native'
import  TextInputApollo  from './TextInputApollo'
import Button from './button'
export default class LoginForm extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
       <StatusBar
       barStyle="light-content"/>
        <TextInputApollo
        placeholder='username or email'
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        keyboardType='email-address'
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={()=> this.passwordInput.focus()}
        />
        <TextInputApollo
        placeholder='password'
        returnKeyType="go"
        placeholderTextColor="rgba(255,255,255,0.7)"
        secureTextEntry={true}
        ref={(input)=> this.passwordInput=input}
        />

        <TouchableOpacity>
            {/* <Text style={styles.buttonText}>Log in</Text> */}
            <Button><Text >Log in</Text></Button>
        </TouchableOpacity>
        <Text style={styles.buttonText}>Forgot password?</Text>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    container:{
        padding:20,
        marginBottom:50
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
