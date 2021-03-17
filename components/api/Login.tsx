import axios, { AxiosResponse } from 'axios';
import { Status } from '../models/Status';
import Response from '../models/Response';
const login = async (data) => {
  let response: AxiosResponse;
  try {
    let url = 'https://bayan911.com/sbmademo/api/mobilev2/login.php';
    response = await axios.post(url, data);
    return new Response(
      Status.SUCCESS,
      'Successfully posted data',
      response.data
    );
  } catch (e) {
    console.log('ERROR :: ', e);
    return new Response(Status.ERROR, 'Error data', e);
  }
};

export default login;
