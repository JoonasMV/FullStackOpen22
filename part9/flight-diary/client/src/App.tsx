import { useEffect, useState } from "react";
import DiaryLog from "./components/DiaryLog";
import DiaryForm from "./components/DiaryForm";
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((response) => {
      setDiaries(response);
    });
  }, []);

  return (
    <>
      <h1>Add new entry</h1>
      <DiaryForm setDiaries={setDiaries} />
      <h2>Diary entries</h2>
      <DiaryLog diaries={diaries}/>
    </>
  );
}

export default App;
