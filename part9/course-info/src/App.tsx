import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts, courseName } from "./data/courseInfo";

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      {courseParts.map((part) => (
        <Content
          key={part.name}
          course={part}
        />
      ))}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
