import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Posts from '../pages/Posts';
import Users from '../pages/Users';
import Auth from '../pages/Auth';

import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
  

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFF',

        tabBarStyle:{
          backgroundColor: '#202225',
          borderTopWidth: 0
        }

      }}
    >

      <Tab.Screen 
        name="Auth" 
        component={Auth} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="log-in" color={color} size={size} />
          }
        }}
      />

      <Tab.Screen 
        name="Posts" 
        component={Posts} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="file-text" color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          //headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="users" color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}