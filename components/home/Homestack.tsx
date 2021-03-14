import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
// import Inc_Create from '../incident/_update/Update';
// import Inc_Update from '../incident/_update/Update';
import IncVMaps from '../incident/_view_map/View';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

const Homestack = ({ navigation }) => {
  const opt = {
    headerBackImage: () => (
      // eslint-disable-next-line react-native/no-inline-styles
      <Icons name="home" size={30} style={{ color: '#fff' }} />
    ),
    headerTitle: 'Homepage',
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
    headerStyle: { backgroundColor: '#d44b59' },
    headerTintColor: 'white',
  };
  const [headerOpt, setHeaderOpt] = useState(opt);

  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={headerOpt} />
        <Stack.Screen
          name="Incident"
          component={IncVMaps}
          options={headerOpt}
        />
      </Stack.Navigator>
    </>
  );
};

export default Homestack;
