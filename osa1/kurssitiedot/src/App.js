import React from "react"

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

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>
            {props.course.name}
        </h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {

    let parts = []
    props.parts.forEach(element => {
        let row = <Part name={element.name} exercises={element.exercises} key={element.name.toString()} />
        parts.push(row)
    })
    
    return (
        <div>
            {parts}
        </div>
    )
}

const Total = (props) => {
    let sum = 0
    props.parts.forEach(element => {
        sum += element.exercises
    });

    return (
        <p>
            {sum}
        </p>
    )
}

export default App