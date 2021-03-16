import IncidentObj from '../models/incoming/Incident';

export const filterSearch = (
  data: IncidentObj[],
  filters: { contact_name: string; addresss: string; incident_type: string }
) => {
  if (filters == null || undefined) return data;
  return data.filter(
    (item: IncidentObj) => item.contact_name.includes(filters.contact_name)
    //   item.addresss.toLowerCase().includes(filters.addresss) ||
    //   item.incident_type.includes(filters.incident_type)
  );
};
