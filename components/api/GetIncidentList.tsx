import axios, { AxiosResponse } from 'axios';
import { Status } from '../models/Status';
import Response from '../models/Response';
const getIncidentList = async () => {
  let response: AxiosResponse;
  try {
    let d = {
      data: {
        contact_type: 'Fire Responder',
      },
    };
    let url = 'https://bayan911.com/sbmademo/api/mobilev2/incident/get.php';
    response = await axios.post(url, JSON.stringify(d));
    return new Response(
      Status.SUCCESS,
      'Success retrieving data',
      response.data
    );
  } catch (e) {
    console.log('ERROR :: ', e);
    return new Response(Status.ERROR, 'Error retrieving data', e);
  }
};

export default getIncidentList;
