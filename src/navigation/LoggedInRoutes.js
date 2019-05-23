import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Profile from "../view/Profile";
import People from "../view/People";
import Calendar from '../view/Calendar'
import { Ionicons } from "@expo/vector-icons";
const LoggedInRoutes = createBottomTabNavigator({
  People: {
    screen: People,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-contacts" size={32} color="#222" />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-person" size={32} color="#222" />
      )
    }
  },
  // Calendar: {
  //   screen: Calendar,
  //   navigationOptions: {
  //     tabBarLabel: null,
  //     tabBarIcon: ({ tintColor }) => (
  //       <Ionicons name="md-calendar" size={32} color="#222" />
  //     )
  //   }
  // }
});

export default LoggedInRoutes;
