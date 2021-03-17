import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput, Card, Paragraph, Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../drawer/Loader';
import IncidentObj from '../../models/incoming/Incident';
import moment from 'moment';
import Response from '../../models/Response';
import getstatus from '../../api/GetStatus';
import { Status } from '../../models/Status';
import mapToIncidentStatus from '../../mappers/IncidentStatus';

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 8,
    width: '25%',
    alignSelf: 'flex-end',
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
    marginVertical: 3,
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const Inc_Update = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const item: IncidentObj = route.params.incident;
  const [statuses, setStatus] = useState([]);

  useEffect(() => {
    populate();
  }, []);

  const populate = async () => {
    let response: Response<[]> = await getstatus();
    if (response.code !== Status.ERROR) {
      let mappedStat = mapToIncidentStatus(response.data);
      setStatus(mappedStat);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
      <SafeAreaView>
        <View>
          <Card>
            <Badge
              value={
                <Text style={{ margin: 8, color: 'white' }}>{item.status}</Text>
              }
              containerStyle={styles.badge}
            />
            <Card.Title title={item.contact_name} />
            <Card.Content>
              <View>
                <Text style={styles.innerText}>
                  <Icons
                    name="calendar-alt"
                    color={item.statuscolor}
                    size={18}
                  />
                  &nbsp;
                  {moment(item.createdtime).format('MMMM DD, YYYY HH:mm a')}
                </Text>
                <Text style={styles.innerText}>
                  <Icons
                    name="file-medical-alt"
                    color={item.statuscolor}
                    size={18}
                  />
                  &nbsp;
                  {item.incident_type}
                </Text>
                {item.contact_no.length > 0 ? (
                  <Text style={styles.innerText}>
                    <Icons
                      name="phone-square-alt"
                      color={item.statuscolor}
                      size={18}
                    />
                    &nbsp;
                    {item.contact_no}
                  </Text>
                ) : (
                  <></>
                )}
                {item.addresss.length > 0 ? (
                  <Text style={styles.innerText}>
                    <Icons
                      name="house-user"
                      color={item.statuscolor}
                      size={18}
                    />
                    &nbsp;
                    {item.addresss}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <Paragraph style={{ marginVertical: 10 }}>
                {item.description.substring(0, 75)}....
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View style={[styles.innerText, { marginTop: 10 }]}>
              <Text style={[styles.innerText, {paddingLeft: 10 }]}>&nbsp; Select status update</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => console.log(value)}
                items={statuses}
              />
            </View>
            <View>
              <TextInput
                label="Remarls"
                placeholder="Please indicate your remarks"
                style={styles.sectionInputs}
                mode="outlined"
                multiline={true}
                numberOfLines={7}
                onChangeText={(text) => console.log(text)}
              />
            </View>
            <View>
              <Button mode="contained"
                style={styles.button}
                onPress={() => console.log('UPDATE-----------')}
              >
                Update
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Inc_Update;
