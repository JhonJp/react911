import IncidentObj from '../models/incoming/Incident';

export default function mapToIncident(
  incidentList: IncidentObj[]
): IncidentObj[] {
  let tableModel: IncidentObj[] = incidentList.map((item) => {
    let model: IncidentObj = {
      ticketid: item.ticketid,
      incident_type: item.incident_type,
      description: item.description,
      addresss: item.addresss,
      contact_id: item.contact_id,
      contact_name: item.contact_name,
      contact_no: item.contact_no,
      status: item.status,
      statuscolor: item.statuscolor,
      coordinates: item.coordinates,
      createdtime: item.createdtime,
    };
    return model;
  });
  return tableModel;
}
