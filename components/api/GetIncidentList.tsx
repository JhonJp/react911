import axios, { AxiosResponse } from 'axios';
import { Status } from '../models/Status';
import Response from '../models/Response';
const getIncidentList = async () => {
  let response: AxiosResponse;
  try {
    let d = {
      data: {
        contact_type: 'Giusi Lo(Fire Responder)',
      },
    };
    let url = 'https://bayan911.com/sbmademo/api/mobilev2/incident/get.php';
    response = await axios.get(url, d);
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

export default getIncidentList;
