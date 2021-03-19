import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
// import { BackHandler } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { verifyLoginData } from '../functions/SessionVerify';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
// import Inc_Create from '../incident/_update/Update';
// import Inc_Update from '../incident/_update/Update';
import IncVMaps from '../incident/TabStack';
import Signin from '../signin/Signin';
// import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

const Homestack = ({ navigation }) => {
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    // BackHandler.removeEventListener('hardwareBackPress', () => true);
    checkIn();
  });

  const checkIn = async () => {
    let check = await verifyLoginData();
    if (check === true) {
      setInitialRoute('Home');
    } else {
      setInitialRoute('Signin');
    }
  };

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerBackImage: () => (
              // eslint-disable-next-line react-native/no-inline-styles
              <Icons name="bars" size={25} style={{ color: 'black' }} />
            ),
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            ),
          }}
          // options={{ headerShown: false }}
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
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Homestack;
