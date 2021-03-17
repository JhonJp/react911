import axios, { AxiosResponse } from 'axios';
import { Status } from '../models/Status';
import Response from '../models/Response';
const status = async () => {
  let response: AxiosResponse;
  try {
    let url = 'https://bayan911.com/sbmademo/api/mobilev2/status.php';
    response = await axios.post(url);
    return new Response(
      Status.SUCCESS,
      'Successfully retrieved data',
      response.data
    );
  } catch (e) {
    console.log('ERROR :: ', e);
    return new Response(Status.ERROR, 'Error retrieving data', e);
  }
};

export default status;
