import {
  OriginalIncidentStatus,
  MappedIncidentStatus,
} from '../models/incoming/IncidentStatus';

export default function mapToIncidentStatus(
  incidentList: OriginalIncidentStatus[]
): MappedIncidentStatus[] {
  let tableModel: MappedIncidentStatus[] = incidentList.map(
    (item: OriginalIncidentStatus) => {
      let model: MappedIncidentStatus = {
        status_id: item.ticketstatus_id,
        value: item.ticketstatus,
        label: item.ticketstatus,
      };
      return model;
    }
  );
  return tableModel;
}
