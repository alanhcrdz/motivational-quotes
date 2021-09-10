import React, { useState } from 'react';
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs'; 
import colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import Favorites from '../screens/Favorites';


const Tab = createBottomTabNavigator();

function AuthRoutes() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopWidth: 0,
            },
            headerShown: false,
            labelPosition: 'below-icon',
            showLabel: true,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.accent,
           
        }}>
            <Tab.Screen 
            name="Explore" component={HomeScreen}
            
            options={{
                
                tabBarIcon:(({ focused }) => (
                    <MaterialIcons
                    name="explore" 
                    size={24}
                    color={focused ? colors.primary : colors.accent} 
                    
                      /> 
                )),
            }}/>
            <Tab.Screen 
            name="Favorites" component={Favorites}
            options={{
                tabBarIcon:(({ focused }) => (
                    <AntDesign
                    name="heart" 
                    size={24}
                    color={focused ? colors.primary : colors.accent} 
                      /> 
                )),
            }}/>
        </Tab.Navigator>
    )
}

export default AuthRoutes;
