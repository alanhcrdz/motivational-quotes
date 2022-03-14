import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../screens/DrawerContent";
import AppRoutes from "./stack.routes";
import AuthRoutes from "./tabs.routes";

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={AppRoutes} />
    </Drawer.Navigator>
  );
}

export default DrawerRoutes;
