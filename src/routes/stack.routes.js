import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../constants/colors';
import AuthRoutes from './tabs.routes';
import DetailsScreen from '../screens/DetailsScreen';
import ShowImage from '../screens/ShowImage';

const StackRoutes = createStackNavigator();
const  AppRoutes = () => {
    return (
        <StackRoutes.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerTintColor: colors.white,
            title: 'Talentiii Quotes',
        }}
        >
        <StackRoutes.Screen name="Home" component={AuthRoutes} options={{title: 'Talentiii GetInspired'}} />
        <StackRoutes.Screen name="Details" component={DetailsScreen} options={{title: 'Explore'}} />
        <StackRoutes.Screen name="ShowImage" component={ShowImage} options={{headerShown: false}} />
        </StackRoutes.Navigator>
    )
}

export default AppRoutes;
