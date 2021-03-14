import * as React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  headerBg: {
    marginVertical: -5,
    backgroundColor: '#d44b59',
    borderRadius: 0,
  },
});

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Card>
        <Card.Cover
          source={{}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.headerBg}
        />
      </Card>
      <DrawerItem label="..." onPress={() => console.log('test')} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;