import 'react-native-gesture-handler';
import React from 'react';
// import { HeaderBackButton } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
// import Icons from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
// import Inc_Create from '../incident/_update/Update';
// import Inc_Update from '../incident/_update/Update';
import IncVMaps from '../incident/TabStack';
import Signin from '../signin/Signin';
// import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

const Homestack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{
          //   headerBackImage: () => (
          //     // eslint-disable-next-line react-native/no-inline-styles
          //     <Icons name="home" size={25} style={{ color: '#fff' }} />
          //   ),
          //   headerLeft: (props) => (
          //     <HeaderBackButton
          //       {...props}
          //       onPress={() => {
          //         navigation.openDrawer();
          //       }}
          //     />
          //   ),
          //   headerStyle: { backgroundColor: '#ff5454' },
          //   headerTintColor: 'white',
          // }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Incident"
          component={IncVMaps}
          // options={{
          //   headerStyle: { backgroundColor: '#ff5454' },
          //   headerTintColor: 'white',
          // }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Homestack;
