import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patients from "../services/patients";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id !== undefined) {
      patients.getById(id).then((p) => setPatient(p));
    }
  }, [id]);

  if (patient === undefined) return <div>Invalid id</div>;

  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>gender: {patient?.gender}</div>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>

      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <>
          <div>
            {entry.date} <i>{entry.description}</i>
          </div>
          {entry.diagnosisCodes?.map((code) => (
            <li>{code}</li>
          ))}
        </>
      ))}
    </div>
  );
};

export default PatientInfo;
