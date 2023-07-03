import Part from "./Part";
import { CoursePart } from "./types";

const Content = ({ course }: { course: CoursePart }) => {
  return (
    <p>
      <strong>{course.name} {course.exerciseCount}</strong>
      <Part course={course} />
    </p>
  );
};

export default Content;
