import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api/diaries";

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addNewDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};

export default { getAllDiaries, addNewDiary };
