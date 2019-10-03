import React from 'react'
import { createSwitchNavigator} from 'react-navigation'
import LoggedOutRoutes from '../navigation/LoggedOutRoutes'
import LoggedInRoutes from '../navigation/LoggedInRoutes'

export const getRootNavigator = (loggedIn=null )=>createSwitchNavigator({
    LoggedInRoutes:{
        screen:LoggedInRoutes
    },
    LoggedOutRoutes:{
        screen:LoggedOutRoutes
    }
},
{
    initialRouteName:loggedIn ? "LoggedInRoutes":"LoggedOutRoutes"
})