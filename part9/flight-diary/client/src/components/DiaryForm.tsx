import { useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types";
import { NewDiaryEntry } from "../types";
import diaryService from "../services/diaryService";
import { AxiosError } from "axios";

const DiaryForm = ({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const currentDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const [date, setDate] = useState(currentDate());

  const submitNewDiaryEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    try {
      const addedDiary = await diaryService.addNewDiary(newDiary);
      setDiaries((diaries) => [...diaries, addedDiary as DiaryEntry]);
      setWeather("");
      setVisibility("");
      setDate(currentDate());
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <>
      <form onSubmit={submitNewDiaryEntry}>
        <div>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : null}
          <label>
            date
            <input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </label>
        </div>
        <div style={{ display: "flex" }}>
          Visibility
          {Object.values(Visibility).map((v) => {
            return (
              <div key={v}>
                <input
                  type="radio"
                  value={v}
                  id={v}
                  name="visibility"
                  onChange={(e) => setVisibility(e.currentTarget.value)}
                  checked={v === visibility}
                />
                <label>{v}</label>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex" }}>
          Weather
          {Object.values(Weather).map((w) => {
            return (
              <div key={w}>
                <input
                  type="radio"
                  value={w}
                  id={w}
                  name="weather"
                  onChange={(e) => setWeather(e.currentTarget.value)}
                  checked={w === weather}
                />
                <label>{w}</label>
              </div>
            );
          })}
        </div>
        <div>
          <label>
            comment
            <input
              type="text"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryForm;
