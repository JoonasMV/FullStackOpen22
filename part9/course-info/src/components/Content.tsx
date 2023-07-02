import { coursePart } from "./types";

const Content = (props: coursePart) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
};

export default Content;
