// import React from "react";
// import { createBottomTabNavigator } from "react-navigation";
// import Profile from "../view/Profile";
// import People from "../view/People";
// import Calendar from '../view/Calendar'
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import Profile from "../view/Profile";
import People from "../view/People";
import Calendar from "../view/Calendar";

const StackNavigator = createStackNavigator({
  People: {
    screen: People,
    navigationOptions: {
            tabBarLabel: null,
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-contacts" size={32} color="#0a59a9" />
            )
          }
  },
  Calendar: {
    screen: Calendar,
    
  }
},
{
  headerMode: "none",
  navigationOptions: {
    headerVisible: false
  }
});

const LoggedInRoutes = createBottomTabNavigator({
  People: {
    screen: StackNavigator,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-contacts" size={32} color="#0a59a9" />
      )
    },
    
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
            tabBarLabel: null,
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-person" size={32} color="#0a59a9" />
            )
          }
  },

  
},
{
  headerMode: "none",
  navigationOptions: {
    headerVisible: false
  }
});

export default LoggedInRoutes;

// const LoggedInRoutes = createBottomTabNavigator({
//   People: {
//     screen: People,
//     navigationOptions: {
//       tabBarLabel: null,
//       tabBarIcon: ({ tintColor }) => (
//         <Ionicons name="md-contacts" size={32} color="#0a59a9" />
//       )
//     }
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel: null,
//       tabBarIcon: ({ tintColor }) => (
//         <Ionicons name="md-person" size={32} color="#0a59a9" />
//       )
//     }
    
//   },
//   // Calendar: {
//   //   screen: Calendar,
//   //   navigationOptions: {
//   //     tabBarLabel: null,
//   //     tabBarIcon: ({ tintColor }) => (
//   //       <Ionicons name="md-calendar" size={32} color="#0a59a9" />
//   //     )
//   //   }
//   // }
// },
// // {
// //   headerMode: 'screen',
// //   cardStyle: { backgroundColor: '#0a59a9' },
// // },
// );


// export default LoggedInRoutes;
