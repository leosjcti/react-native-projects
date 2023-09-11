import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from '../pages/Home';
import Cart from '../pages/Cart';

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerTitle: 'Meu Carrinho'
                }}
            />
        </Stack.Navigator>
    )
}