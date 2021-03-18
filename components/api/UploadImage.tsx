import axios, { AxiosResponse } from 'axios';
import { Status } from '../models/Status';
import Response from '../models/Response';

const uploadImage = async (data) => {
  let response: AxiosResponse;
  try {
    let url = 'https://bayan911.com/sbmademo/api/mobilev2/incident/image.php';
    response = await axios({
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data;boundary=----------',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, */*',
      },
    });
    return new Response(
      Status.SUCCESS,
      'Successfully retrieved data',
      response.data
    );
  } catch (e) {
    console.log('ERROR :: ', JSON.stringify(e));
    return new Response(Status.ERROR, 'Error retrieving data', e);
  }
};

export default uploadImage;
