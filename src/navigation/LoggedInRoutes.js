import React from 'react'
import {createBottomTabNavigator } from 'react-navigation'
import Profile from '../view/Profile'
import People from '../view/People'
const LoggedInRoutes= createBottomTabNavigator({
  People:
  {
      screen:People,
      
  },
  Profile:
  {
      screen:Profile
  }
})

export default LoggedInRoutes
