import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <>
      <Overlay
        isVisible={true}
        // eslint-disable-next-line react-native/no-inline-styles
        overlayStyle={{
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'rgba(0,0,0,0.01)',
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </Overlay>
    </>
  );
};

export default Loader;
