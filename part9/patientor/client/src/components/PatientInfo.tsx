import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patients from "../services/patients";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id !== undefined) {
      patients.getById(id).then(p => setPatient(p));
    }
  }, [id])

  return (
  <div>
    <h2>{patient?.name}</h2>
    <div>gender: {patient?.gender}</div>
    <div>ssn: {patient?.ssn}</div>
    <div>occupation: {patient?.occupation}</div>
  </div>);
};

export default PatientInfo;
