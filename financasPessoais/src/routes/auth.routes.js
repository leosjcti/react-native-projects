import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/Signin'
import SignUp from '../pages/SignUp'

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  const loading = false;
  const signed = false;

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerStyle:{
            backgroundColor: '#3b3dbf',
            borderButtomWidth: 1,
            borderButtomColor: '#00b94a'
          },
          headerTintColor: '#FFF',
          headerTitle: 'Voltar',
          headerBackTitleVisible: false
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;

