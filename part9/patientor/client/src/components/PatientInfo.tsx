import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../types";
import patients from "../services/patients";
import diagnosesService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import EntryForm from "./EntryForm";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case (Gender.Female):
      return <FemaleIcon />;
    case (Gender.Male):
      return <MaleIcon />
    case (Gender.Other):
      return <CircleOutlinedIcon />
  }
}


const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id !== undefined) {
      patients.getById(id).then((p) => setPatient(p));
    }
    diagnosesService.getAll().then((d) => setDiagnoses(d));
  }, [id]);
  
  if (patient === undefined) return <div>Invalid id</div>;

  return (
    <div>
      <h2>{patient?.name} {genderIcon(patient.gender)}</h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <EntryForm patient={patient} setPatient={setPatient} diagnoses={diagnoses} />
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}  style={{ border: "2px solid black" }}>
          <EntryDetails entry={entry} />

          {diagnoses?.filter((d) => entry.diagnosisCodes?.includes(d.code))
            .map((item) => (
              <li key={item.code}> {item.code} {item.name} </li>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PatientInfo;
