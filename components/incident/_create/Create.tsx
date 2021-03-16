import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Loader from '../../drawer/Loader';

const Inc_Create = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <>
      {loading ? <Loader /> : <></>}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Incident Create</Text>
      </View>
    </>
  );
};

export default Inc_Create;
