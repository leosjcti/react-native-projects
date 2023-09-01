import React from 'react';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackRoutes from './stackRoutes';
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato';
import CustomDrawer from '../components/customDrawer';

//import Feather from 'react-native-vector-icons/Feather';

//const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (

    <Drawer.Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        headerShown: false,

        drawerStyle:{
          backgroundColor: '#FFF'
        },

        drawerActiveBackgroundColor: '#00dae4',
        drawerActiveTintColor:'#FFF',

        drawerInactiveBackgroundColor: '#f1f1f1',
        drawerInactiveTintColor:'#000'
      }}
    >
      <Drawer.Screen
        name='HomeStack'
        component={StackRoutes}
      />

      <Drawer.Screen
        name='Sobre'
        component={Sobre}
      />

      <Drawer.Screen
        name='Contato'
        component={Contato}
      />
    </Drawer.Navigator>





    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarHideOnKeyboard: true,
    //     tabBarShowLabel: false,
    //     tabBarActiveTintColor: '#FFF',

    //     tabBarStyle:{
    //       backgroundColor: '#202225',
    //       borderTopWidth: 0
    //     }

    //   }}
    // >
    //   <Tab.Screen
    //     name="HomeStack"
    //     component={StackRoutes}
    //     options={{
    //       tabBarIcon: ({ color, size }) => {
    //         return <Feather name="home" color={color} size={size} />
    //       },
    //     }}
    //   />

    //   <Tab.Screen 
    //     name="Sobre" 
    //     component={Sobre} 
    //     options={{
    //       tabBarIcon: ({ color, size }) => {
    //         return <Feather name="file-text" color={color} size={size} />
    //       }
    //     }}
    //   />

    //   <Tab.Screen
    //     name="Contato"
    //     component={Contato}
    //     options={{
    //       //headerShown: false,
    //       tabBarIcon: ({ color, size }) => {
    //         return <Feather name="phone-call" color={color} size={size} />
    //       }
    //     }}
    //   />
    // </Tab.Navigator>
  )
}