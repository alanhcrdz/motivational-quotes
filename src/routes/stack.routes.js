import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import AuthRoutes from './tabs.routes';
import DetailsScreen from '../screens/DetailsScreen';
import ShowImage from '../screens/ShowImage';
import { Entypo } from '@expo/vector-icons';
// import Favorites from '../screens/Favorites';
import Daily from '../screens/Daily';
import Random from '../screens/Random';
import WebScreen from '../screens/WebScreen';



const StackRoutes = createStackNavigator();
const  AppRoutes = () => {
    return (
        
        <StackRoutes.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
        <StackRoutes.Screen name="Home" component={AuthRoutes} options={{ title: 'Home'}} />
        <StackRoutes.Screen name="Details" component={DetailsScreen} options={{title: 'Quotes'}} />
        <StackRoutes.Screen name="ShowImage" component={ShowImage} options={{headerShown: false}} />
        <StackRoutes.Screen name="Daily" component={Daily} options={{headerShown: false}} />
        <StackRoutes.Screen name="Random" component={Random} options={{headerShown: false}} />
        <StackRoutes.Screen name="WebScreen" component={WebScreen} options={{headerShown: false}} />
        {/* <StackRoutes.Screen name="Favorites" component={Favorites} options={{title: 'Favorites'}} /> */}
        </StackRoutes.Navigator>
    )
}

const styles = StyleSheet.create({
    drawer: {
        padding: 10,
    }
});

export default AppRoutes;
