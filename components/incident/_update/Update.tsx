import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextInput, Card, Paragraph } from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../drawer/Loader';
import IncidentObj from '../../models/incoming/Incident';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

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
    marginVertical: 3,
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

const Inc_Update = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const item: IncidentObj = route.params.incident;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
            <View>
              <TextInput
                label="Email"
                placeholder="Your username or email"
                style={styles.sectionInputs}
                mode="outlined"
                onChangeText={(text) => console.log(text)}
              />
            </View>
            <View>
              <DropDownPicker
                items={[
                  {
                    label: 'UK',
                    value: 'uk',
                    icon: () => <Icons name="flag" size={18} color="#900" />,
                  },
                  {
                    label: 'France',
                    value: 'france',
                    icon: () => <Icons name="flag" size={18} color="#900" />,
                  },
                ]}
                multiple={false}
                containerStyle={{ height: 40 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) => console.log(item)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Inc_Update;
