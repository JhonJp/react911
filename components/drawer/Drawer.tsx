import * as React from 'react';
// import { HeaderBackButton } from '@react-navigation/stack';
// import Icons from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Homestack from '../home/Homestack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Homestack">
        <Drawer.Screen name="Homestack" component={Homestack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}