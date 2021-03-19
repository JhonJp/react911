import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Card, Paragraph, Text, List } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import Loader from '../drawer/Loader';
import Icons from 'react-native-vector-icons/FontAwesome5';
import logo from '../../assets/img/header_white.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../models/incoming/Login';
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
  headerTxt: {
    marginTop: '-30%',
    width: '100%',
    marginLeft: '10%',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});

const CustomDrawerContent = (props) => {
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState({});
  const logout = () => {
    setLoading(true);
    AsyncStorage.clear();
    setTimeout(() => {
      props.navigation.closeDrawer();
      setLoading(false);
      props.navigation.navigate('Signin');
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, [userdata]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_userdata');
      let js: LoginResponse = JSON.parse(jsonValue);
      setUserdata(js);
      return JSON.parse(jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
      <DrawerContentScrollView {...props}>
        <Card>
          <Card.Cover
            source={{ uri: logoImg }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.headerBg}
          />
          <Card.Content style={[styles.headerTxt]}>
            <Paragraph style={{ justifyContent: 'center' }}>
              <View>
                <List.Section>
                  <Text>{userdata.firstname +' '+ userdata.lastname}</Text>
                  <Text>{userdata.contact_type}</Text>
                  <Text>{userdata.mobile} | {userdata.phone}</Text>
                </List.Section>
              </View>
            </Paragraph>
          </Card.Content>
        </Card>
        <List.Section>
          <List.Subheader>Navigation</List.Subheader>
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
            onPress={() => logout()}
          />
        </List.Section>
      </DrawerContentScrollView>
    </>
  );
};

export default CustomDrawerContent;
