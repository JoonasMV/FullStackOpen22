import React from "react"

const Course = (props) => {
  //console.log(props.course.name)
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Header = (props) => {
  //console.log(props)
    return (
        <h1>
            {props.name}
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
  const all = [] 
  props.parts.forEach(element => {
    all.push(element.exercises)
  })
  //console.log(all)

  const initialValue = 0
    const total = all.reduce(
      (s, p) => s + p, initialValue
      )

    return (
        <p>
            <strong>Total of {total} exercises</strong>
        </p>
    )
}

export default App