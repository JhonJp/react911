import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { Badge } from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import IncidentObj from '../models/incoming/Incident';
import { incidentList } from '../sample_payload/Incident';
// import getIncidentList from '../api/GetIncidentList';
import { SearchBar } from 'react-native-elements';
import { filterSearch } from '../functions/ObjectFunctions';
import moment from 'moment';
import logo from '../../assets/img/header.png';
const logoImg = Image.resolveAssetSource(logo).uri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 2,
    marginHorizontal: 5,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
  },
  itemContent: {
    height: 100,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  headerBg: {
    marginVertical: 0,
    marginHorizontal: -5,
    backgroundColor: '#ff5454',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  searchcontainer: {
    backgroundColor: '#ffffff00',
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
    borderBottomColor: '#ffffff00',
    borderTopColor: '#ffffff00',
    marginTop: '-15%',
  },
  searchbar: {
    borderWidth: 0, //no effect
    color: '#808080',
  },
});

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    // let result: IncidentObj[] = await getIncidentList();
    let result: IncidentObj[] = incidentList;
    setData(result);
  };

  const filter = (event) => {
    setSearch(event);
    let filters = {
      contact_name: search,
      incident_type: search,
      addresss: search,
    };
    let filteredData: IncidentObj[] = filterSearch(data, filters);
    console.log(filteredData);
    setData(filteredData);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card style={{ backgroundColor: '#ffffff00' }}>
            <Card.Cover
              source={{ uri: logoImg }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.headerBg}
            />
            <SearchBar
              placeholder="Search.."
              onChangeText={(e) => filter(e)}
              value={search}
              searchBarStyle="minimal"
              lightTheme
              style={styles.searchbar}
              inputContainerStyle={{ backgroundColor: 'white' }}
              containerStyle={styles.searchcontainer}
              onCancel={() => populateData()}
              onClear={() => populateData()}
            />
          </Card>
        </View>
        <ScrollView style={styles.container}>
          {data.map((item, index) => {
            return <Item key={index} item={item} navigation={navigation} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Item = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Incident', { incident: item })}
    style={[styles.item]}
  >
    <Card>
      <Badge
        value={<Text style={{ margin: 8, color: 'white' }}>{item.status}</Text>}
        containerStyle={styles.badge}
      />
      <Card.Title title={item.contact_name} />
      <Card.Content style={styles.itemContent}>
        <View>
          <Text>
            <Icons name="calendar-alt" color={item.statuscolor} />
            &nbsp; {moment(item.createdtime).format('MMMM DD, YYYY HH:mm a')}
          </Text>
        </View>
        <Paragraph style={{ marginVertical: 10 }}>
          {item.description.substring(0, 75)}....
        </Paragraph>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default Home;
