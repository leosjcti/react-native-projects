import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#F0F4FF' barStyle='dark-content' />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}


