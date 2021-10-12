import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './stack.routes';
import DrawerRoutes from './drawer.routes';

function Routes() {
    return (
        <NavigationContainer>
            <DrawerRoutes />
        </NavigationContainer>
    )
}

export default Routes;
