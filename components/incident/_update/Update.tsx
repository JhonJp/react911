import React, { useState, useEffect } from 'react';
// eslint-disable-next-line prettier/prettier
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  TextInput,
  Card,
  Paragraph,
  Button,
  RadioButton,
} from 'react-native-paper';
import { Status } from '../../models/Status';
import { LoginResponse } from '../../models/incoming/Login';
import { FileUpload } from '../../models/outgoing/Fileupload';
// import RNPickerSelect from 'react-native-picker-select';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../drawer/Loader';
import IncidentObj from '../../models/incoming/Incident';
import moment from 'moment';
import Response from '../../models/Response';
import getstatus from '../../api/GetStatus';
import mapToIncidentStatus from '../../mappers/IncidentStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateIncident from '../../api/IncidentUpdate';
import DialogCustom from '../../drawer/Dialog';
import * as ImagePicker from '../../picker';
import uploadImage from '../../api/UploadImage';

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
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  images: {
    width: 190,
    height: 180,
    borderColor: '#808080',
    borderWidth: 1,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  imgAddbutton: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 3,
    borderRadius: 0,
    width: '25%',
    textAlign: 'center',
    alignSelf: 'baseline',
    backgroundColor: '#687e97',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
});

const Inc_Update = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const item: IncidentObj = route.params.incident;
  const [statuses, setStatus] = useState([]);
  const [selectedstat, setSelectedStatus] = useState('Open');
  const [Itemremarks, setRemarks] = useState('');
  const [dial, setDialog] = useState(false);
  const [imageMax, setMaxImg] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    populate();
  }, [images]);

  const populate = async () => {
    let response: Response<[]> = await getstatus();
    if (response.code !== Status.ERROR) {
      let mappedStat = mapToIncidentStatus(response.data);
      setStatus(mappedStat);
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_userdata');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const closeDialog = () => {
    setDialog(false);
    navigation.navigate('Home');
  };

  const closeImgDialog = () => {
    setMaxImg(false);
  };

  const renderFileData = () => {
    let ret = [];
    try {
      if (images.length !== 0) {
        images.map((img: FileUpload) => {
          ret.push(
            <Image
              key={img.fileName}
              source={{ uri: img.uri }}
              style={styles.images}
            />
          );
        });
      } else {
        ret.push(
          <Image
            key={'ashakjhfeww'}
            source={require('../../../assets/img/imgPlaceholder.png')}
            style={styles.images}
          />
        );
      }
    } catch (err) {
      console.log('IMAGE ERR===========', err);
    }
    return ret;
  };

  const submitUpdate = async () => {
    setLoading(true);
    let userdata: LoginResponse = await getData();
    let d = {
      data: {
        contact_id: userdata.contactid,
        status: selectedstat,
        remarks: Itemremarks,
        ticket_id: item.ticketid,
      },
    };
    const send = await updateIncident(JSON.stringify(d));
    if (send.code !== Status.ERROR) {
      setLoading(false);
      setDialog(true);
      //sendImage();
    }
  };

  const sendImage = async () => {
    let userdata: LoginResponse = await getData();
    let FormData = require('form-data');
    let fs = require('react-native-fs');
    let photo = [];

    images.map((img: FileUpload) => {
      photo.push({
        filepath: fs.DocumentDirectoryPath + img.uri,
        filetype: img.type,
        filename: img.fileName,
        name: img.fileName,
      });
    });
    let d = new FormData();
    d.append('attachment[]', photo);
    d.append('responder_name', userdata.firstname + ' ' + userdata.lastname);
    d.append('incident_type', item.incident_type);
    d.append('ticket_id', item.ticketid);
    const send = await uploadImage(d);
    if (send.code !== Status.ERROR) {
      setLoading(false);
      setDialog(true);
      console.log(send.data);
    }
  };

  const camerLaunch = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setResponse(response);
      }
    );
  };

  const galleryLaunch = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (images.length !== 3) {
          let img = images;
          img.push({
            fileName: response.fileName,
            fileSize: response.fileSize,
            height: response.height,
            type: response.type,
            uri: response.uri,
            width: response.width,
          });
          setImages(img);
          renderFileData();
        } else {
          setMaxImg(true);
        }
      }
    );
  };

  return (
    <>
      {loading ? <Loader /> : <></>}
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{ marginBottom: '10%' }}>
            <DialogCustom
              visible={dial}
              hideModal={() => closeDialog()}
              title={'Ticket Update'}
              message={
                'Your ticket has been updated successfully, thank you very much.'
              }
            />
            <DialogCustom
              visible={imageMax}
              hideModal={() => closeImgDialog()}
              title={'Max Image'}
              message={'Image attachment has been reached.'}
            />
            <View>
              <Card>
                <Badge
                  value={
                    <Text style={{ margin: 8, color: 'white' }}>
                      {item.status}
                    </Text>
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
            <View style={[styles.innerText, { marginTop: 10 }]}>
              <Text style={[styles.innerText, { paddingLeft: 10 }]}>
                &nbsp; Select status update
              </Text>
              <View
                style={{
                  borderColor: '#9d9d9d',
                  borderWidth: 1,
                  marginHorizontal: 10,
                  borderRadius: 4,
                }}
              >
                <RadioButton.Group
                  onValueChange={(value) => setSelectedStatus(value)}
                  value={selectedstat}
                >
                  {statuses.map((s) => {
                    return (
                      <RadioButton.Item
                        key={s.status_id}
                        label={s.label}
                        value={s.label}
                      />
                    );
                  })}
                </RadioButton.Group>
              </View>
            </View>
            <View>
              <TextInput
                label="Remarks"
                placeholder="Please indicate your remarks"
                style={styles.sectionInputs}
                mode="outlined"
                multiline={true}
                numberOfLines={7}
                defaultValue={Itemremarks}
                onChangeText={(text) => setRemarks(text)}
              />
            </View>
            {/* <View style={styles.ImageSections}>
              <View style={styles.ImageSections}>
                {renderFileData()}
                <Button
                  icon="camera"
                  mode="contained"
                  style={styles.imgAddbutton}
                  onPress={() => galleryLaunch()}
                >
                  Add
                </Button>
              </View>
            </View> */}
            <View>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => submitUpdate()}
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
