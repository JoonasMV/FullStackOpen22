const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({ course }) => {
    return (
      <>
        <h1>{course}</h1>
      </>
    );
  };

  const Content = () => {
    return (
      <>
        <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} />
      </>
    );
  };

  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Total = ({parts}) => {
    let total = parts.reduce((p, n) => p + n.exercises, 0)
    return <>Number of exercises {total}</>;
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
