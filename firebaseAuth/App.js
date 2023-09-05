import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from './src/firebaseConnection';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  
  return(
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );

}