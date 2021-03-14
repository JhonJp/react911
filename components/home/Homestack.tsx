import 'react-native-gesture-handler';
import React from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';

const Stack = createStackNavigator();

const Homestack = () => {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerBackImage: () => <Icons name="home" size={30} />,
              headerTitle: 'Homepage',
              headerLeft: (props) => (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    // Do something
                  }}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Homestack;
