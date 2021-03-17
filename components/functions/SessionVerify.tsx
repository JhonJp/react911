import AsyncStorage from '@react-native-async-storage/async-storage';

export const verifyLoginData = async () => {
  let userdata = await getData();
  if (userdata !== null) {
    return true;
  } else {
    return false;
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
