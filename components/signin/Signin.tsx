import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DefaultTheme, Text, TextInput, Button } from 'react-native-paper';
import logo from '../../assets/img/logo.png';

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
    backgroundColor: '#d44b59',
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

const Signin = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
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
                onPress={() => props.navigation.push('Drawer')}
              >
                Sign In
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Signin;
