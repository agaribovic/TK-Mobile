import React, { Component } from 'react'
import { TextInput,StatusBar,Text,TouchableOpacity ,View,StyleSheet } from 'react-native'
import TextInputApollo  from './TextInputApollo'
import Button from './button'
import {authorize} from '../service'

export default class LoginForm extends Component {
  state = {
    username:'',
    password: ''
  }
  
  onLoginHandler = (login) => {
    // OVAKO TREBA
    // authorize({
    //   username: this.state.username,
    //   password: this.state.password,
    //   login: login
    // });
    // OVO JE MOCK
    authorize({
      username: "zakir@gmail.com",
      password: "Apollo123!",
      login: login
    });
  }
  
  render() {
    return (
      <View style={StyleSheet.container}>
       <StatusBar
       barStyle="light-content"/>
        <TextInputApollo
        style={styles.txtinput}
        placeholder='username or email'
        placeholderTextColor="rgba(255,255,255,0.9)"
        returnKeyType="next"
        keyboardType='email-address'
        autoCapitalize="none"
        onChangeText={(value) => this.setState({username: value})}
        autoCorrect={false}
        onSubmitEditing={()=> this.passwordInput.focus()}
        />
        <TextInputApollo
        style={styles.txtinput}
        placeholder='password'
        returnKeyType="go"
        placeholderTextColor="rgba(255,255,255,0.9)"
        secureTextEntry={true}
        onChangeText={(value) => this.setState({password: value})}
        ref={(input)=> this.passwordInput=input}
        />

        <TouchableOpacity>
            <Button style={styles.buttonStyle} onPress={()=>{this.onLoginHandler(this.props.login)}}><Text style={styles.textStyle} >Log in</Text></Button>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.forgotMe}>Forgot password?</Text>
        </TouchableOpacity>
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
        marginBottom:20,
        marginLeft:50,
        marginRight:50,
        borderRadius:12
    },
    buttonText:{
        textAlign:'center',
        color:'#0a59a9',
    },
    textStyle: {
      textAlign: "center",
      color: "#0a59a9"
    },
    buttonStyle: {
      backgroundColor: "#ffffff",
      paddingVertical: 15,
      marginBottom: 20,
      marginLeft: 50,
      marginRight: 50,
      borderRadius: 12
     },
    forgotMe:{
      textAlign:'center',
      color:'rgba(255,255,255,0.9)',
      marginBottom:30,
    },
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