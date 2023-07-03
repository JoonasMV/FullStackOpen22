import { CoursePart } from "./types";

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <i>{course.description}</i>
        </div>
      );

    case "background":
      return (
        <>
          <div>
            <i>{course.description}</i>
          </div>
          <div>{course.backgroundMaterial}</div>
        </>
      );

    case "group":
      return <div>project exercises {course.groupProjectCount}</div>;

    default:
      throw new Error("Unhandled part kind: " + course);
      break;
  }
};

export default Part;
