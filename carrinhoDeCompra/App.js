import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar } from 'react-native';
import Routes from './src/routes';
import CartProvider from './src/context/CartContext';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <CartProvider>
        <StatusBar style="auto" />
        <Routes />
      </CartProvider>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
