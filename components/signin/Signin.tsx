import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  BackHandler,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import { Status } from '../models/Status';
import logo from '../../assets/img/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Response from '../models/Response';
import login from '../api/Login';
import Loader from '../drawer/Loader';
import Dialog from '../drawer/Dialog';

const logoImg = Image.resolveAssetSource(logo).uri;
const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
  },
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  body: {
    flex: 1,
    paddingVertical: '30%',
  },
  outer: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  sectionInputs: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 8,
    backgroundColor: '#ff5454',
  },
  highlight: {
    fontWeight: '700',
  },
  baseText: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 30,
  },
  innerText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState(null);
  const [visible, setVisible] = useState(false);
  const [exitApp, setExit] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_userdata', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // AsyncStorage.clear();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_userdata');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const loginSubmit = async () => {
    if (username.length !== 0 && password.length !== 0) {
      let d = {
        data: {
          username: username,
          password: password,
        },
      };
      setLoading(true);
      const response: Response<any> = await login(d);
      if (response.code !== Status.ERROR) {
        if (response.data === 0) {
          showDialog();
        } else {
          storeData(response.data);
          setLoading(false);
          navigation.navigate('Drawer');
        }
      } else {
        showDialog();
      }
    } else {
      showDialog();
    }
  };

  const hideModal = () => setVisible(false);
  const showDialog = () => setVisible(true);
  const exitTrueApp = () => {
    setExit(true);
  };
  const exitFalseApp = () => setExit(false);

  useEffect(() => {
    checkIn();
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      exitTrueApp();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  const checkIn = async () => {
    setUserdata(await getData());
    if (userdata != null) {
      setLoading(false);
      navigation.navigate('Drawer');
    } else {
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      {userdata == null ? (
        <>
          {loading ? <Loader /> : <></>}
          <Dialog
            visible={visible}
            hideModal={hideModal}
            title={'Warning'}
            message={'You entered an invalid input, please try again.'}
          />
          <Dialog
            visible={exitApp}
            hideModal={exitFalseApp}
            title={'Close Application'}
            message={
              'You may close or dismiss the application now, thank you very much.'
            }
          />
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Image style={styles.tinyLogo} source={{ uri: logoImg }} />
                  <Text style={styles.baseText}>
                    Bayan
                    <Text style={styles.innerText}> 911</Text>
                  </Text>
                </View>
                <View>
                  <TextInput
                    label="Email"
                    value={username}
                    placeholder="Your username or email"
                    style={styles.sectionInputs}
                    mode="outlined"
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View>
                  <TextInput
                    label="Password"
                    placeholder="Your password here"
                    value={password}
                    style={styles.sectionInputs}
                    mode="outlined"
                    secureTextEntry={true}
                    theme={theme}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => loginSubmit()}
                  >
                    Sign In
                  </Button>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Signin;
