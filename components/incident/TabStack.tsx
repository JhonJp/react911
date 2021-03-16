import React from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewMap from './_view_map/View';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Colors } from 'react-native-paper';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamhvbmpwIiwiYSI6ImNqanA2aWZvMTAzMTMza3A0d2prcHM4Z2wifQ.CisG5CTxthlyrUgRIzeZEQ'
);

const Tab = createBottomTabNavigator();

const IncVMaps = ({ route, navigation }) => {
  console.log('PROPS -----', route.params);
  return (
    <>
      <Tab.Navigator
        initialRouteName="ViewMap"
        tabBarOptions={{
          labelStyle: {
            textTransform: 'none',
            fontSize: 12,
            marginBottom: 4,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="ViewMap"
          component={ViewMap}
          options={{
            tabBarLabel: 'View Incident',
            tabBarIcon: ({ focused }) => (
              <Icons
                name="map-marked"
                color={focused ? Colors.blue800 : Colors.grey400}
                size={20}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Update"
          component={ViewMap}
          options={{
            tabBarLabel: 'Update Incident',
            tabBarIcon: ({ focused }) => (
              <Icons
                name="file-medical-alt"
                size={20}
                color={focused ? Colors.blue800 : Colors.grey400}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default IncVMaps;
