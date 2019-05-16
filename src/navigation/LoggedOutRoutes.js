import React, { Component } from 'react'
import {createStackNavigator} from 'react-navigation'
import Login from '../view/Login'
const LoggedOutRoutes = createStackNavigator({
  Login:{
      screen:Login
  }
})

export default LoggedOutRoutes
