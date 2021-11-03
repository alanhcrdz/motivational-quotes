import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
// import AuthRoutes from './tabs.routes';
import DetailsScreen from '../screens/DetailsScreen';
import ShowImage from '../screens/ShowImage';
import { Feather } from '@expo/vector-icons';
// import Favorites from '../screens/Favorites';
import Daily from '../screens/Daily';
import Random from '../screens/Random';
import WebScreen from '../screens/WebScreen';
import RandomImages from '../screens/RandomImages';
import AuthRoutes from './tabs.routes';
import HomeScreen from '../screens/HomeScreen';
import AboutUs from '../screens/AboutUs';
import UsersScreen from '../screens/UsersScreen';



const StackRoutes = createStackNavigator();
const  AppRoutes = ({navigation }) => {
    return (
        
        <StackRoutes.Navigator
        screenOptions={{
            headerTintColor: colors.primary,
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerRight: () => (
                <Feather 
                style={styles.menu} 
                name="menu" 
                size={27} 
                color="white"
                onPress={() => {navigation.openDrawer()}}
                 />
            )
        }}
        >
        <StackRoutes.Screen 
        name="Inspire" 
        component={HomeScreen} 
        options={{
            title: 'Motivational Quotes',
           
            }} />
        <StackRoutes.Screen name="Details" component={DetailsScreen} options={{
            title: '',
            }} />
            <StackRoutes.Screen name="Users" component={UsersScreen} options={{
            title: '',
            }} />
        <StackRoutes.Screen name="ShowImage" component={ShowImage} options={{
            // headerShown: false,
            title: '',
            
        }} />
       {/*  <StackRoutes.Screen name="Random Images" component={RandomImages} options={{
            title: 'Random Images'
            }}  /> */}
       {/*  <StackRoutes.Screen name="Daily" component={Daily} options={{title: 'Daily Quotes'}} /> */}
        {/* <StackRoutes.Screen name="Random" component={Random} options={{title: 'Random Text'}} /> */}
        <StackRoutes.Screen name="WebScreen" component={WebScreen} options={{headerShown: false}} />
        {/* <StackRoutes.Screen name="Favorites" component={Favorites} options={{title: 'Favorites'}} /> */}
        <StackRoutes.Screen name="About" component={AboutUs} options={{title: 'About Us'}} />
        </StackRoutes.Navigator>
    )
}

const styles = StyleSheet.create({
    drawer: {
        padding: 10,
    },
    menu: {
        padding: 10,
    }
});

export default AppRoutes;
