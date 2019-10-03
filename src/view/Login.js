import React, { Component } from 'react'
import { Text, View ,Header,KeyboardAvoidingView,StyleSheet,Image} from 'react-native'
import LoginForm from '../components/LoginForm'

export default class Login extends Component {
  
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              styles={styles.logo}
              source={require("../../assets/tklogo.png")}
            />
            <Text />
          </View>
          <View style={styles.formContainer}>
            <LoginForm login={this.props.screenProps.login}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0C72CC'
  },
  logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center'
  },
  logo:{
    width:50,
    height:50
  },
  title:{
    color:'#fff',
    marginTop:10,
    width:100,
    textAlign:'center',
    opacity:0.9
  }
})
