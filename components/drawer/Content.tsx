import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Card } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/img/header2.png';
const logoImg = Image.resolveAssetSource(logo).uri;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  headerBg: {
    marginVertical: -5,
    marginHorizontal: -10,
    backgroundColor: '#ff5454',
    borderRadius: 0,
  },
});

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Card>
        <Card.Cover
          source={{ uri: logoImg }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.headerBg}
        />
      </Card>
      <DrawerItem
        label="Homepage"
        icon={() => <Icons color={'black'} size={20} name="home" />}
        onPress={() => props.navigation.closeDrawer()}
      />
      {/* <DrawerItem
        label="Incident"
        icon={() => <Icons color={'black'} size={20} name="first-aid" />}
        onPress={() => props.navigation.navigate('Incident')}
      />
      <DrawerItem
        label="Terms &amp; Conditions"
        icon={() => <Icons color={'black'} size={20} name="file-signature" />}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="FAQs"
        icon={() => <Icons color={'black'} size={20} name="question-circle" />}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Profile"
        icon={() => <Icons color={'black'} size={20} name="user-cog" />}
        onPress={() => props.navigation.closeDrawer()}
      /> */}
      <DrawerItem
        label="Sign Out"
        icon={() => <Icons color={'black'} size={20} name="sign-out-alt" />}
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
