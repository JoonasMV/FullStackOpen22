import { DiaryEntry } from "../types";

const DiaryLog = ({ diaries }: { diaries: DiaryEntry[]}) => {
  return (
    <>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <div>Visibility: {d.visibility}</div>
            <div>Weather: {d.weather}</div>
          </div>
        );
      })}
    </>
  );
};

export default DiaryLog;
