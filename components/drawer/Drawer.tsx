import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Homestack from '../home/Homestack';
import Home from '../home/Home';
import DrawerContent from './Content';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Stack" component={Homestack} />
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const DrawerPage = () => {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
export default DrawerPage;
