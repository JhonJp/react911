import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Loader from '../../drawer/Loader';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamhvbmpwIiwiYSI6ImNqanA2aWZvMTAzMTMza3A0d2prcHM4Z2wifQ.CisG5CTxthlyrUgRIzeZEQ'
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const IncVMaps = ({ navigation, route }) => {
  console.log('DATA------------------',route.params.incident)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {loading ? <Loader /> : <></>}
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
      </View>
    </>
  );
};

export default IncVMaps;
