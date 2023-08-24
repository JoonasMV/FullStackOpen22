import {
  Button,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryWithoutId, Patient, newBaseEntry } from "../../types";
import patients from "../../services/patients";
import { AxiosError } from "axios";

const EntryForm = ({
  patient,
  setPatient,
  diagnoses,
}: {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnoses: Diagnosis[];
}) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [diagnosisAnchor, setdiagnosisAnchor] = useState<null | HTMLElement>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [entryType, setEntryType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [patientDiagnoses, setPatientDiagnoses] = useState<Diagnosis[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const open = Boolean(anchorEl);
  const openDiagnosis = Boolean(diagnosisAnchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDiagnosisMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setdiagnosisAnchor(event.currentTarget);
  };

  const handleClose = (type?: string) => {
    setAnchorEl(null);
    if (type !== undefined) setEntryType(type);
  };

  const handleDiagnosisMenuClose = (diagnosis?: Diagnosis) => {
    setdiagnosisAnchor(null);
    if (diagnosis !== undefined)
      setPatientDiagnoses((patientDiagnoses) =>
        patientDiagnoses.concat(diagnosis)
      );
  };

  const clearFields = () => {
    setEntryType("");
    setDescription("");
    setDate("");
    setSpecialist("");
    setPatientDiagnoses([]);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployer("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setHealthCheckRating(0);
  };

  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes = patientDiagnoses.map((d) => d.code);
    const newEntry: newBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    try {
      switch (entryType) {
        case "Hospital": {
          const newHospitalEntry: EntryWithoutId = {
            ...newEntry,
            type: entryType,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          const entryWithId = await patients.addEntry(
            patient.id,
            newHospitalEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }

        case "OccupationalHealthcare": {
          const newOccupationalEntry =
            sickLeaveStartDate !== "" && sickLeaveEndDate !== ""
              ? {
                  ...newEntry,
                  type: entryType,
                  employerName: employer,
                  sickLeave: {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  },
                }
              : {
                  ...newEntry,
                  type: entryType,
                  employerName: employer,
                };
          const entryWithId = await patients.addEntry(
            patient.id,
            newOccupationalEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }

        case "HealthCheck": {
          if (healthCheckRating === null) {
            break;
          }
          const newHealthCheckEntry = {
            ...newEntry,
            type: entryType,
            healthCheckRating,
          };
          const entryWithId = await patients.addEntry(
            patient.id,
            newHealthCheckEntry
          );
          setPatient(
            (patient = {
              ...patient,
              entries: patient.entries.concat(entryWithId),
            })
          );
          break;
        }
      }
      clearFields();
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data;
      }
      console.log(errorMessage);
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const getFormDetails = (type: string): JSX.Element => {
    switch (type) {
      case "Hospital":
        return (
          <>
            <TextField
              label="Date"
              variant="standard"
              onChange={(e) => setDischargeDate(e.target.value)}
              value={dischargeDate}
            />
            <TextField
              label="Criteria"
              variant="standard"
              onChange={(e) => setDischargeCriteria(e.target.value)}
              value={dischargeCriteria}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer name"
              variant="standard"
              onChange={(e) => setEmployer(e.target.value)}
              value={employer}
            />
            <h2>Sick leave</h2>
            <InputLabel>Sick leave start date</InputLabel>
            <Input
              type="date"
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
              value={sickLeaveStartDate}
            />
            <InputLabel>Sick leave end date</InputLabel>
            <Input
              type="date"
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
              value={sickLeaveEndDate}
            />
          </>
        );
      case "HealthCheck":
        return (
          <>
            <InputLabel>Health rating</InputLabel>
            <Select
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              value={healthCheckRating}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </>
        );

      case "Basic":
        return <></>;
    }
    return <></>;
  };

  return (
    <div style={{ border: "2px solid black", padding: "4px", margin: "4px" }}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {!formVisibility ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFormVisibility(true)}
        >
          New entry
        </Button>
      ) : (
        <form onSubmit={submitEntry}>
          <h2>New entry</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Description"
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <br />
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <TextField
              label="Specialist"
              variant="standard"
              onChange={(e) => setSpecialist(e.target.value)}
              value={specialist}
            />
            <div style={{ fontSize: "20px" }}>
              <strong>Diagnosis codes</strong>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "4px",
              }}
            >
              {patientDiagnoses.map((d) => (
                <div
                  style={{
                    marginRight: "4px",
                    fontSize: "bigger",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setPatientDiagnoses(patientDiagnoses.filter((i) => i !== d))
                  }
                >
                  {d.code},
                </div>
              ))}
            </div>
            <Menu
              anchorEl={diagnosisAnchor}
              open={openDiagnosis}
              onClose={() => handleDiagnosisMenuClose()}
            >
              {diagnoses.map((d) => {
                return (
                  <MenuItem
                    key={d.code}
                    onClick={() => handleDiagnosisMenuClose(d)}
                  >
                    <div>{d.code}</div>
                  </MenuItem>
                );
              })}
            </Menu>
            <Button
              onClick={handleDiagnosisMenu}
              variant="contained"
              color="secondary"
              style={{ width: "fit-content" }}
            >
              Add diagnosis
            </Button>
            {getFormDetails(entryType)}
          </div>

          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose("HealthCheck")}>
              Health check
            </MenuItem>
            <MenuItem onClick={() => handleClose("OccupationalHealthcare")}>
              Occupational
            </MenuItem>
            <MenuItem onClick={() => handleClose("Hospital")}>
              Hospital
            </MenuItem>
          </Menu>
          <div
            style={{ display: "flex", marginTop: "4px", marginBottom: "4px" }}
          >
            <Button variant="contained" color="primary" onClick={handleClick}>
              Entry type
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setFormVisibility(false)}
            >
              Cancel
            </Button>
            {entryType ? (
              <Button
                type="submit"
                style={{ marginLeft: "auto" }}
                variant="contained"
                color="inherit"
              >
                Add
              </Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  alignItems: "center",
                }}
              >
                Choose entry type
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default EntryForm;
