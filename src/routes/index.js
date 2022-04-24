import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./stack.routes";
import DrawerRoutes from "./drawer.routes";
import AuthRoutes from "./tabs.routes";

function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

export default Routes;
